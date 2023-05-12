// referenced from https://github.com/google/flatbuffers/blob/master/ts/byte-buffer.ts

export function writeInt32(buffer: Uint8Array, offset: number, value: number): void {
  buffer[offset] = value;
  buffer[offset + 1] = value >> 8;
  buffer[offset + 2] = value >> 16;
  buffer[offset + 3] = value >> 24;
}

export function writeUint32(buffer: Uint8Array, offset: number, value: number): void {
  buffer[offset] = value;
  buffer[offset + 1] = value >> 8;
  buffer[offset + 2] = value >> 16;
  buffer[offset + 3] = value >> 24;
}

export function readInt32(buffer: Uint8Array, offset: number): number {
  return buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16) | (buffer[offset + 3] << 24);
}

export function readUint32(buffer: Uint8Array, offset: number): number {
  return readInt32(buffer, offset) >>> 0;
}

export function prefixSizeBuffer(buffer: Uint8Array): Uint8Array {
  const ret = new Uint8Array(buffer.length + 4);
  writeInt32(ret, 0, buffer.length);
  ret.set(buffer, 4);
  return ret;
}

export function splitBuffer(buffer: Uint8Array, maxChunkSize = 65535): Uint8Array[] {
  const ret: Uint8Array[] = [];
  const size = buffer.length;
  let offset = 0;
  while (offset < size) {
    const chunkSize = Math.min(size - offset, maxChunkSize);
    const chunk = new Uint8Array(chunkSize);
    chunk.set(buffer.subarray(offset, offset + chunkSize), 0);
    ret.push(chunk);
    offset += chunkSize;
  }
  return ret;
}

export function prefixSizeAndSplitBuffer(buffer: Uint8Array, maxChunkSize = 65535): Uint8Array[] {
  const prefixed = prefixSizeBuffer(buffer);
  return splitBuffer(prefixed, maxChunkSize);
}
