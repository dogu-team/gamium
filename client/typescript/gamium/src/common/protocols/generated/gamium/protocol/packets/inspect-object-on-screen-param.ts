// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { Vector2, Vector2T } from '../../../gamium/protocol/types/vector2.js';

export class InspectObjectOnScreenParam implements flatbuffers.IUnpackableObject<InspectObjectOnScreenParamT> {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): InspectObjectOnScreenParam {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsInspectObjectOnScreenParam(bb: flatbuffers.ByteBuffer, obj?: InspectObjectOnScreenParam): InspectObjectOnScreenParam {
    return (obj || new InspectObjectOnScreenParam()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsInspectObjectOnScreenParam(bb: flatbuffers.ByteBuffer, obj?: InspectObjectOnScreenParam): InspectObjectOnScreenParam {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new InspectObjectOnScreenParam()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  pos(obj?: Vector2): Vector2 | null {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? (obj || new Vector2()).__init(this.bb_pos + offset, this.bb!) : null;
  }

  screenSize(obj?: Vector2): Vector2 | null {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset ? (obj || new Vector2()).__init(this.bb_pos + offset, this.bb!) : null;
  }

  static startInspectObjectOnScreenParam(builder: flatbuffers.Builder) {
    builder.startObject(2);
  }

  static addPos(builder: flatbuffers.Builder, posOffset: flatbuffers.Offset) {
    builder.addFieldStruct(0, posOffset, 0);
  }

  static addScreenSize(builder: flatbuffers.Builder, screenSizeOffset: flatbuffers.Offset) {
    builder.addFieldStruct(1, screenSizeOffset, 0);
  }

  static endInspectObjectOnScreenParam(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  unpack(): InspectObjectOnScreenParamT {
    return new InspectObjectOnScreenParamT(this.pos() !== null ? this.pos()!.unpack() : null, this.screenSize() !== null ? this.screenSize()!.unpack() : null);
  }

  unpackTo(_o: InspectObjectOnScreenParamT): void {
    _o.pos = this.pos() !== null ? this.pos()!.unpack() : null;
    _o.screenSize = this.screenSize() !== null ? this.screenSize()!.unpack() : null;
  }
}

export class InspectObjectOnScreenParamT implements flatbuffers.IGeneratedObject {
  constructor(public pos: Vector2T | null = null, public screenSize: Vector2T | null = null) {}

  pack(builder: flatbuffers.Builder): flatbuffers.Offset {
    InspectObjectOnScreenParam.startInspectObjectOnScreenParam(builder);
    InspectObjectOnScreenParam.addPos(builder, this.pos !== null ? this.pos!.pack(builder) : 0);
    InspectObjectOnScreenParam.addScreenSize(builder, this.screenSize !== null ? this.screenSize!.pack(builder) : 0);

    return InspectObjectOnScreenParam.endInspectObjectOnScreenParam(builder);
  }
}
