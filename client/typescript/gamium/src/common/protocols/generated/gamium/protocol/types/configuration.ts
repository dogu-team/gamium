// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

export class Configuration implements flatbuffers.IUnpackableObject<ConfigurationT> {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): Configuration {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsConfiguration(bb: flatbuffers.ByteBuffer, obj?: Configuration): Configuration {
    return (obj || new Configuration()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsConfiguration(bb: flatbuffers.ByteBuffer, obj?: Configuration): Configuration {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new Configuration()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  showDebugUi(): boolean | null {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? !!this.bb!.readInt8(this.bb_pos + offset) : null;
  }

  inspectIgnoreBigObject(): boolean | null {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset ? !!this.bb!.readInt8(this.bb_pos + offset) : null;
  }

  static startConfiguration(builder: flatbuffers.Builder) {
    builder.startObject(2);
  }

  static addShowDebugUi(builder: flatbuffers.Builder, showDebugUi: boolean) {
    builder.addFieldInt8(0, +showDebugUi, 0);
  }

  static addInspectIgnoreBigObject(builder: flatbuffers.Builder, inspectIgnoreBigObject: boolean) {
    builder.addFieldInt8(1, +inspectIgnoreBigObject, 0);
  }

  static endConfiguration(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createConfiguration(builder: flatbuffers.Builder, showDebugUi: boolean | null, inspectIgnoreBigObject: boolean | null): flatbuffers.Offset {
    Configuration.startConfiguration(builder);
    if (showDebugUi !== null) Configuration.addShowDebugUi(builder, showDebugUi);
    if (inspectIgnoreBigObject !== null) Configuration.addInspectIgnoreBigObject(builder, inspectIgnoreBigObject);
    return Configuration.endConfiguration(builder);
  }

  unpack(): ConfigurationT {
    return new ConfigurationT(this.showDebugUi(), this.inspectIgnoreBigObject());
  }

  unpackTo(_o: ConfigurationT): void {
    _o.showDebugUi = this.showDebugUi();
    _o.inspectIgnoreBigObject = this.inspectIgnoreBigObject();
  }
}

export class ConfigurationT implements flatbuffers.IGeneratedObject {
  constructor(public showDebugUi: boolean | null = null, public inspectIgnoreBigObject: boolean | null = null) {}

  pack(builder: flatbuffers.Builder): flatbuffers.Offset {
    return Configuration.createConfiguration(builder, this.showDebugUi, this.inspectIgnoreBigObject);
  }
}
