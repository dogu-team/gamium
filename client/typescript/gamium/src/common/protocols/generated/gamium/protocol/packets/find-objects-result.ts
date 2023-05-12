// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { ObjectInfo, ObjectInfoT } from '../../../gamium/protocol/types/object-info.js';

export class FindObjectsResult implements flatbuffers.IUnpackableObject<FindObjectsResultT> {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): FindObjectsResult {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsFindObjectsResult(bb: flatbuffers.ByteBuffer, obj?: FindObjectsResult): FindObjectsResult {
    return (obj || new FindObjectsResult()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsFindObjectsResult(bb: flatbuffers.ByteBuffer, obj?: FindObjectsResult): FindObjectsResult {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new FindObjectsResult()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  infos(index: number, obj?: ObjectInfo): ObjectInfo | null {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? (obj || new ObjectInfo()).__init(this.bb!.__indirect(this.bb!.__vector(this.bb_pos + offset) + index * 4), this.bb!) : null;
  }

  infosLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
  }

  static startFindObjectsResult(builder: flatbuffers.Builder) {
    builder.startObject(1);
  }

  static addInfos(builder: flatbuffers.Builder, infosOffset: flatbuffers.Offset) {
    builder.addFieldOffset(0, infosOffset, 0);
  }

  static createInfosVector(builder: flatbuffers.Builder, data: flatbuffers.Offset[]): flatbuffers.Offset {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]!);
    }
    return builder.endVector();
  }

  static startInfosVector(builder: flatbuffers.Builder, numElems: number) {
    builder.startVector(4, numElems, 4);
  }

  static endFindObjectsResult(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createFindObjectsResult(builder: flatbuffers.Builder, infosOffset: flatbuffers.Offset): flatbuffers.Offset {
    FindObjectsResult.startFindObjectsResult(builder);
    FindObjectsResult.addInfos(builder, infosOffset);
    return FindObjectsResult.endFindObjectsResult(builder);
  }

  unpack(): FindObjectsResultT {
    return new FindObjectsResultT(this.bb!.createObjList<ObjectInfo, ObjectInfoT>(this.infos.bind(this), this.infosLength()));
  }

  unpackTo(_o: FindObjectsResultT): void {
    _o.infos = this.bb!.createObjList<ObjectInfo, ObjectInfoT>(this.infos.bind(this), this.infosLength());
  }
}

export class FindObjectsResultT implements flatbuffers.IGeneratedObject {
  constructor(public infos: ObjectInfoT[] = []) {}

  pack(builder: flatbuffers.Builder): flatbuffers.Offset {
    const infos = FindObjectsResult.createInfosVector(builder, builder.createObjectOffsetList(this.infos));

    return FindObjectsResult.createFindObjectsResult(builder, infos);
  }
}
