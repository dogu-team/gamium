// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

export class QueryScreenResult implements flatbuffers.IUnpackableObject<QueryScreenResultT> {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): QueryScreenResult {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsQueryScreenResult(bb: flatbuffers.ByteBuffer, obj?: QueryScreenResult): QueryScreenResult {
    return (obj || new QueryScreenResult()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsQueryScreenResult(bb: flatbuffers.ByteBuffer, obj?: QueryScreenResult): QueryScreenResult {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new QueryScreenResult()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  width(): number {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
  }

  height(): number {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
  }

  static startQueryScreenResult(builder: flatbuffers.Builder) {
    builder.startObject(2);
  }

  static addWidth(builder: flatbuffers.Builder, width: number) {
    builder.addFieldInt32(0, width, 0);
  }

  static addHeight(builder: flatbuffers.Builder, height: number) {
    builder.addFieldInt32(1, height, 0);
  }

  static endQueryScreenResult(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createQueryScreenResult(builder: flatbuffers.Builder, width: number, height: number): flatbuffers.Offset {
    QueryScreenResult.startQueryScreenResult(builder);
    QueryScreenResult.addWidth(builder, width);
    QueryScreenResult.addHeight(builder, height);
    return QueryScreenResult.endQueryScreenResult(builder);
  }

  unpack(): QueryScreenResultT {
    return new QueryScreenResultT(this.width(), this.height());
  }

  unpackTo(_o: QueryScreenResultT): void {
    _o.width = this.width();
    _o.height = this.height();
  }
}

export class QueryScreenResultT implements flatbuffers.IGeneratedObject {
  constructor(public width: number = 0, public height: number = 0) {}

  pack(builder: flatbuffers.Builder): flatbuffers.Offset {
    return QueryScreenResult.createQueryScreenResult(builder, this.width, this.height);
  }
}