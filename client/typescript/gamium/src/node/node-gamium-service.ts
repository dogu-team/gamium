import { EventEmitter } from 'events';
import * as flatbuffers from 'flatbuffers';
import { Socket } from 'net';
import { createHello, ErrorCode, GamiumError, GamiumProtocol, GamiumService, PacketTypes, Version } from '../common';
import { delay, stringify, stringifyError } from '../common/internal/functions';
import { Printable } from '../common/internal/logs';
import { SizePrefixedRecvQueue } from './size-prefixed-recv-queue';

const _dummyReq = new GamiumProtocol.RequestT();
const _dummyRes = new GamiumProtocol.ResponseT();
declare type GcGaParamTypes = NonNullable<typeof _dummyReq.param>;
declare type GcGaResultTypes = NonNullable<typeof _dummyRes.result>;

export class NodeGamiumService implements GamiumService {
  private readonly client: Socket;
  private readonly responseEmitter = new ResponseEmitterImpl();
  private readonly recvQueue = new SizePrefixedRecvQueue();

  get connected(): boolean {
    return this.isConnected;
  }
  private isConnected: boolean;
  private seq = 0;
  constructor(
    private readonly host: string,
    private readonly port: number,
    private readonly requestTimeout: number = 60000,
    private readonly closeOnTimeout: boolean = true,
    private readonly printable: Printable = console,
  ) {
    this.client = new Socket();
    this.isConnected = false;

    this.client.on('connect', () => {
      printable.debug?.('GamiumEngineService. client connect');
      this.isConnected = true;
    });

    this.client.on('error', (error: Error) => {
      printable.error(`GamiumEngineService. client error: ${stringify(error)}`);
    });

    this.client.on('timeout', () => {
      printable.error('GamiumEngineService. client timeout');
    });

    this.client.on('close', (isError: boolean) => {
      printable.error('GamiumEngineService. client close');
      this.isConnected = false;
    });

    this.client.on('end', () => {
      printable.debug?.('GamiumEngineService. client end');
      this.isConnected = false;
    });

    this.client.on('data', (data: Buffer) => {
      this.recvQueue.pushBuffer(data);
      if (!this.recvQueue.has()) {
        return;
      }
      const array = this.recvQueue.pop();
      const buf = new flatbuffers.ByteBuffer(array);
      const responseByteBuffer = GamiumProtocol.Response.getRootAsResponse(buf);
      const response = responseByteBuffer.unpack();
      this.responseEmitter.emit(response.seq.toString(), response);
    });
  }

  async connect(tryCount = 30): Promise<GamiumProtocol.HelloResultT> {
    const { printable } = this;
    printable.info(`GamiumEngineService.connect ${this.host}, ${this.port}`);
    if (this.client.connecting) {
      throw new GamiumError(ErrorCode.InternalError, 'already connected');
    }

    for (let i = 0; i < tryCount; i++) {
      const isConnected = await new Promise<boolean>((resolve, reject) => {
        this.client.once('close', (isError: boolean) => {
          resolve(false);
        });
        this.client.connect({ host: this.host, port: this.port }, () => {
          resolve(true);
        });
      });
      if (!isConnected) {
        printable.warn?.(`GamiumEngineService. connect failed. cont: ${i}`);
        await delay(1000);
        continue;
      }

      try {
        const helloRes = await this.request(createHello({ version: Version }), { timeout: 1000 });
        printable.info(`GamiumEngineService. hello success. ${stringify(helloRes)}`);
        return helloRes;
      } catch (err) {
        printable.warn?.(`GamiumEngineService. hello failed. cont: ${i}, error:${stringifyError(err)}`);
      }

      if (!this.client.destroyed) {
        this.client.destroy();
      }
      await delay(1000);
    }
    throw new GamiumError(ErrorCode.Disconnected, 'notconnected');
  }

  disconnect(): void {
    if (this.client.destroyed) {
      return;
    }
    this.client.resetAndDestroy();
  }

  request<P extends GcGaParamTypes, R extends GcGaResultTypes>(
    packet: PacketTypes<P, R>,
    options: { timeout: number } = { timeout: this.requestTimeout },
  ): Promise<R> {
    return new Promise((resolve, reject) => {
      const { printable } = this;
      const befAsyncError = new Error('GamiumEngineService.request');
      if (!this.isConnected) {
        throw new GamiumError(ErrorCode.Disconnected, 'notconnected');
      }

      const seq = this.getSeq();

      // timeout handle
      const timeout = setTimeout(() => {
        printable.error?.(`GamiumEngineService. request timeout: seq: ${seq}, timeout: ${options.timeout}`);
        if (this.closeOnTimeout) {
          this.disconnect();
        }
        reject(new GamiumError(ErrorCode.Timeout, 'request timeout', undefined, { cause: befAsyncError }));
      }, options.timeout);

      // complete handle
      this.onceResponseHandler(packet, seq, timeout, resolve, reject, befAsyncError);

      // request
      const requestObj = new GamiumProtocol.RequestT(seq, packet.paramEnum, packet.param);
      const builder = new flatbuffers.Builder();
      const requestOffset = requestObj.pack(builder);
      builder.finishSizePrefixed(requestOffset);
      this.client.write(builder.asUint8Array());
      printable.verbose?.(`GamiumEngineService. request: ${stringify(requestObj).substring(0, 300)} >> `);
    });
  }

  private onceResponseHandler<Packet extends PacketTypes<P, R>, P extends GcGaParamTypes, R extends GcGaResultTypes>(
    packet: Packet,
    seq: number,
    timeout: NodeJS.Timeout,
    resolve: (value: R | PromiseLike<R>) => void,
    reject: (err: Error) => void,
    befAsyncError: Error,
  ): void {
    const { printable } = this;
    this.responseEmitter.once(seq.toString(), (response: GamiumProtocol.ResponseT) => {
      printable.verbose?.(`GamiumEngineService. response: ${stringify(response).substring(0, 300)} >> `);
      if (response.resultType !== packet.resultEnum) {
        clearTimeout(timeout);
        reject(new GamiumError(ErrorCode.InternalError, `request resultType(${response.resultType}) is not ${packet.resultEnum}`, undefined, befAsyncError));
        return;
      }
      if (response.error == null) {
        clearTimeout(timeout);
        reject(new GamiumError(ErrorCode.InternalError, 'request response error is null', undefined, befAsyncError));
        return;
      }
      if (response.error.code !== ErrorCode.None) {
        clearTimeout(timeout);
        reject(new GamiumError(response.error.code, response.error.reason as string, undefined, befAsyncError));
        return;
      }

      printable.verbose?.(`GamiumEngineService. request: ${seq}, ${packet.paramEnum} done << `);
      const resultObj = response.result as R;
      if (resultObj == null) {
        clearTimeout(timeout);
        reject(new GamiumError(ErrorCode.InternalError, 'request resultObj is null', undefined, befAsyncError));
        return;
      }
      clearTimeout(timeout);
      resolve(resultObj);
    });
  }

  private getSeq(): number {
    const ret = this.seq;
    this.seq += 1;
    return ret;
  }
}

interface ResponseEmitter {
  once(seq: string, listener: (data: GamiumProtocol.ResponseT) => void): EventEmitter;
}

class ResponseEmitterImpl extends EventEmitter implements ResponseEmitter {}
