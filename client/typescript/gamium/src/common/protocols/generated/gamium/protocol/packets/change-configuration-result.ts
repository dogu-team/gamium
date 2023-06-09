// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

export class ChangeConfigurationResult implements flatbuffers.IUnpackableObject<ChangeConfigurationResultT> {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): ChangeConfigurationResult {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsChangeConfigurationResult(bb: flatbuffers.ByteBuffer, obj?: ChangeConfigurationResult): ChangeConfigurationResult {
    return (obj || new ChangeConfigurationResult()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsChangeConfigurationResult(bb: flatbuffers.ByteBuffer, obj?: ChangeConfigurationResult): ChangeConfigurationResult {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new ChangeConfigurationResult()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static startChangeConfigurationResult(builder: flatbuffers.Builder) {
    builder.startObject(0);
  }

  static endChangeConfigurationResult(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createChangeConfigurationResult(builder: flatbuffers.Builder): flatbuffers.Offset {
    ChangeConfigurationResult.startChangeConfigurationResult(builder);
    return ChangeConfigurationResult.endChangeConfigurationResult(builder);
  }

  unpack(): ChangeConfigurationResultT {
    return new ChangeConfigurationResultT();
  }

  unpackTo(_o: ChangeConfigurationResultT): void {}
}

export class ChangeConfigurationResultT implements flatbuffers.IGeneratedObject {
  constructor() {}

  pack(builder: flatbuffers.Builder): flatbuffers.Offset {
    return ChangeConfigurationResult.createChangeConfigurationResult(builder);
  }
}
