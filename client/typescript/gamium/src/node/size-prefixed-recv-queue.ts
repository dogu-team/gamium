import { strict as assert } from 'node:assert';
import { Uint8ArrayUtil } from './uint8-array-util';

export class SizePrefixedRecvQueue {
  private buffer: Uint8Array;

  constructor() {
    this.buffer = new Uint8Array(0);
  }

  public pushBuffer(buffer: Uint8Array): void {
    const newBuffer = new Uint8Array(this.buffer.length + buffer.length);
    newBuffer.set(this.buffer);
    newBuffer.set(buffer, this.buffer.length);
    this.buffer = newBuffer;
  }

  public has(): boolean {
    if (this.buffer.length < 4) return false;
    const packetSize = Uint8ArrayUtil.readUint32(this.buffer, 0);
    if (this.buffer.length < packetSize + 4) return false;
    return true;
  }

  public pop(): Uint8Array {
    assert(this.has(), 'PacketQueue no package to pop');

    const packetSize = Uint8ArrayUtil.readUint32(this.buffer, 0);
    const ret = this.buffer.subarray(4, 4 + packetSize);
    this.buffer = this.buffer.subarray(4 + packetSize, this.buffer.length);
    return ret;
  }
}
