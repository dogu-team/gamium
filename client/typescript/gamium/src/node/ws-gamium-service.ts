import { EventEmitter } from 'events';
import * as flatbuffers from 'flatbuffers';
import WebSocket from 'ws';
import { createHello, ErrorCode, GamiumError, GamiumProtocol, GamiumService, PacketTypes, Version } from '../common';
import { delay, loop, stringify, stringifyError } from '../common/internal/functions';
import { Printable } from '../common/internal/logs';
import { SizePrefixedRecvQueue } from './size-prefixed-recv-queue';

const _dummyReq = new GamiumProtocol.RequestT();
const _dummyRes = new GamiumProtocol.ResponseT();
declare type GcGaParamTypes = NonNullable<typeof _dummyReq.param>;
declare type GcGaResultTypes = NonNullable<typeof _dummyRes.result>;

export class WebsocketGamiumService implements GamiumService {
  private client: WebSocket | undefined;
  private readonly responseEmitter = new ResponseEmitterImpl();
  private readonly recvQueue = new SizePrefixedRecvQueue();
  private isDisconnectCalled = false;

  get connected(): boolean {
    return this.client !== undefined;
  }
  private seq = 0;
  constructor(
    private readonly url: string,
    private readonly requestTimeout: number = 60000,
    private readonly closeOnTimeout: boolean = true,
    private readonly printable: Printable = console,
  ) {}

  async connect(tryCount = 1): Promise<GamiumProtocol.HelloResultT> {
    const { printable } = this;

    printable.info(`WebsocketGamiumService.connect ${this.url}`);

    for (let i = 0; i < tryCount; i++) {
      const client = new WebSocket(this.url);
      this.setHandlers(client);

      for await (const _ of loop(1000, 10)) {
        if (client.readyState !== WebSocket.CONNECTING) {
          break;
        }
      }
      if (client.readyState !== WebSocket.OPEN) {
        client.removeAllListeners();
        printable.warn?.(`WebsocketGamiumService. connect failed.  cont: ${i}`);
        await delay(1000);
        continue;
      }

      this.client = client;
      printable.info(`WebsocketGamiumService. client open`);
      const res = await this.request(createHello({ version: Version }), { timeout: 120 * 1000 }).catch((err) => {
        printable.warn?.(`WebsocketGamiumService. hello failed. cont: ${i}, error:${stringifyError(err)}`);
        this.client?.close();
        return err;
      });
      if (res instanceof Error) {
        printable.warn?.(`WebsocketGamiumService. connect failed. error: ${res.message}, cont: ${i}`);
        await delay(1000);
        continue;
      } else {
        printable.info(`WebsocketGamiumService. hello success. ${stringify(res)}`);
        return res;
      }
    }
    throw new GamiumError(ErrorCode.Disconnected, 'notconnected');
  }

  private setHandlers(client: WebSocket): void {
    client.on('connect', () => {
      this.printable.debug?.('WebsocketGamiumService. client connect');
    });

    client.on('error', (error: Error) => {
      this.printable.error(`WebsocketGamiumService. client error: ${stringify(error)}`);
    });

    client.on('timeout', () => {
      this.printable.error('WebsocketGamiumService. client timeout');
    });

    client.on('close', (code: number, reason: Buffer) => {
      const message = `WebsocketGamiumService. client close ${code}, ${reason}`;
      if (this.isDisconnectCalled) {
        this.printable.info(message);
      } else {
        this.printable.error(message);
      }
      this.client = undefined;
    });

    client.on('end', () => {
      this.printable.debug?.('WebsocketGamiumService. client end');
      this.client = undefined;
    });

    client.on('message', (data: Buffer) => {
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

  async disconnect(): Promise<void> {
    return new Promise((resolve) => {
      if (!this.client) {
        return;
      }
      this.isDisconnectCalled = true;
      const timeout = setTimeout(() => {
        this.printable.error('WebsocketGamiumService. disconnect failed. not close called');
      }, 10000);
      this.client.once('close', () => {
        clearTimeout(timeout);
        resolve();
      });

      this.client.close();
    });
  }

  request<P extends GcGaParamTypes, R extends GcGaResultTypes>(
    packet: PacketTypes<P, R>,
    options: { timeout: number } = { timeout: this.requestTimeout },
  ): Promise<R> {
    return new Promise((resolve, reject) => {
      const { printable } = this;
      const befAsyncError = new Error('WebsocketGamiumService.request');
      if (!this.client) {
        throw new GamiumError(ErrorCode.Disconnected, 'notconnected');
      }

      const seq = this.getSeq();

      // timeout handle
      const timeout = setTimeout(() => {
        printable.error?.(`WebsocketGamiumService. request timeout: seq: ${seq}, timeout: ${options.timeout}`);
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
      this.client.send(builder.asUint8Array());
      printable.verbose?.(`WebsocketGamiumService. request: ${stringify(requestObj).substring(0, 300)} >> `);
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
      printable.verbose?.(`WebsocketGamiumService. response: ${stringify(response).substring(0, 300)} >> `);
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

      printable.verbose?.(`WebsocketGamiumService. request: ${seq}, ${packet.paramEnum} done << `);
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
