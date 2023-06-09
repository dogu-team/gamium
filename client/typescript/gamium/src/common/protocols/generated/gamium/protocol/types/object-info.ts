// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { ObjectType } from '../../../gamium/protocol/types/object-type.js';
import { Vector2, Vector2T } from '../../../gamium/protocol/types/vector2.js';
import { Vector3, Vector3T } from '../../../gamium/protocol/types/vector3.js';
import { Vector4, Vector4T } from '../../../gamium/protocol/types/vector4.js';

export class ObjectInfo implements flatbuffers.IUnpackableObject<ObjectInfoT> {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): ObjectInfo {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsObjectInfo(bb: flatbuffers.ByteBuffer, obj?: ObjectInfo): ObjectInfo {
    return (obj || new ObjectInfo()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsObjectInfo(bb: flatbuffers.ByteBuffer, obj?: ObjectInfo): ObjectInfo {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new ObjectInfo()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  path(): string | null;
  path(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
  path(optionalEncoding?: any): string | Uint8Array | null {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
  }

  name(): string | null;
  name(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
  name(optionalEncoding?: any): string | Uint8Array | null {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
  }

  type(): ObjectType {
    const offset = this.bb!.__offset(this.bb_pos, 8);
    return offset ? this.bb!.readInt16(this.bb_pos + offset) : ObjectType.Unknown;
  }

  tag(index: number): string;
  tag(index: number, optionalEncoding: flatbuffers.Encoding): string | Uint8Array;
  tag(index: number, optionalEncoding?: any): string | Uint8Array | null {
    const offset = this.bb!.__offset(this.bb_pos, 10);
    return offset ? this.bb!.__string(this.bb!.__vector(this.bb_pos + offset) + index * 4, optionalEncoding) : null;
  }

  tagLength(): number {
    const offset = this.bb!.__offset(this.bb_pos, 10);
    return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
  }

  isActive(): boolean {
    const offset = this.bb!.__offset(this.bb_pos, 12);
    return offset ? !!this.bb!.readInt8(this.bb_pos + offset) : false;
  }

  screenPosition(obj?: Vector3): Vector3 | null {
    const offset = this.bb!.__offset(this.bb_pos, 14);
    return offset ? (obj || new Vector3()).__init(this.bb_pos + offset, this.bb!) : null;
  }

  screenRectSize(obj?: Vector2): Vector2 | null {
    const offset = this.bb!.__offset(this.bb_pos, 16);
    return offset ? (obj || new Vector2()).__init(this.bb_pos + offset, this.bb!) : null;
  }

  position(obj?: Vector3): Vector3 | null {
    const offset = this.bb!.__offset(this.bb_pos, 18);
    return offset ? (obj || new Vector3()).__init(this.bb_pos + offset, this.bb!) : null;
  }

  rotation(obj?: Vector4): Vector4 | null {
    const offset = this.bb!.__offset(this.bb_pos, 20);
    return offset ? (obj || new Vector4()).__init(this.bb_pos + offset, this.bb!) : null;
  }

  text(): string | null;
  text(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
  text(optionalEncoding?: any): string | Uint8Array | null {
    const offset = this.bb!.__offset(this.bb_pos, 22);
    return offset ? this.bb!.__string(this.bb_pos + offset, optionalEncoding) : null;
  }

  static startObjectInfo(builder: flatbuffers.Builder) {
    builder.startObject(10);
  }

  static addPath(builder: flatbuffers.Builder, pathOffset: flatbuffers.Offset) {
    builder.addFieldOffset(0, pathOffset, 0);
  }

  static addName(builder: flatbuffers.Builder, nameOffset: flatbuffers.Offset) {
    builder.addFieldOffset(1, nameOffset, 0);
  }

  static addType(builder: flatbuffers.Builder, type: ObjectType) {
    builder.addFieldInt16(2, type, ObjectType.Unknown);
  }

  static addTag(builder: flatbuffers.Builder, tagOffset: flatbuffers.Offset) {
    builder.addFieldOffset(3, tagOffset, 0);
  }

  static createTagVector(builder: flatbuffers.Builder, data: flatbuffers.Offset[]): flatbuffers.Offset {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]!);
    }
    return builder.endVector();
  }

  static startTagVector(builder: flatbuffers.Builder, numElems: number) {
    builder.startVector(4, numElems, 4);
  }

  static addIsActive(builder: flatbuffers.Builder, isActive: boolean) {
    builder.addFieldInt8(4, +isActive, +false);
  }

  static addScreenPosition(builder: flatbuffers.Builder, screenPositionOffset: flatbuffers.Offset) {
    builder.addFieldStruct(5, screenPositionOffset, 0);
  }

  static addScreenRectSize(builder: flatbuffers.Builder, screenRectSizeOffset: flatbuffers.Offset) {
    builder.addFieldStruct(6, screenRectSizeOffset, 0);
  }

  static addPosition(builder: flatbuffers.Builder, positionOffset: flatbuffers.Offset) {
    builder.addFieldStruct(7, positionOffset, 0);
  }

  static addRotation(builder: flatbuffers.Builder, rotationOffset: flatbuffers.Offset) {
    builder.addFieldStruct(8, rotationOffset, 0);
  }

  static addText(builder: flatbuffers.Builder, textOffset: flatbuffers.Offset) {
    builder.addFieldOffset(9, textOffset, 0);
  }

  static endObjectInfo(builder: flatbuffers.Builder): flatbuffers.Offset {
    const offset = builder.endObject();
    builder.requiredField(offset, 4); // path
    builder.requiredField(offset, 14); // screen_position
    builder.requiredField(offset, 18); // position
    builder.requiredField(offset, 20); // rotation
    return offset;
  }

  unpack(): ObjectInfoT {
    return new ObjectInfoT(
      this.path(),
      this.name(),
      this.type(),
      this.bb!.createScalarList<string>(this.tag.bind(this), this.tagLength()),
      this.isActive(),
      this.screenPosition() !== null ? this.screenPosition()!.unpack() : null,
      this.screenRectSize() !== null ? this.screenRectSize()!.unpack() : null,
      this.position() !== null ? this.position()!.unpack() : null,
      this.rotation() !== null ? this.rotation()!.unpack() : null,
      this.text(),
    );
  }

  unpackTo(_o: ObjectInfoT): void {
    _o.path = this.path();
    _o.name = this.name();
    _o.type = this.type();
    _o.tag = this.bb!.createScalarList<string>(this.tag.bind(this), this.tagLength());
    _o.isActive = this.isActive();
    _o.screenPosition = this.screenPosition() !== null ? this.screenPosition()!.unpack() : null;
    _o.screenRectSize = this.screenRectSize() !== null ? this.screenRectSize()!.unpack() : null;
    _o.position = this.position() !== null ? this.position()!.unpack() : null;
    _o.rotation = this.rotation() !== null ? this.rotation()!.unpack() : null;
    _o.text = this.text();
  }
}

export class ObjectInfoT implements flatbuffers.IGeneratedObject {
  constructor(
    public path: string | Uint8Array | null = null,
    public name: string | Uint8Array | null = null,
    public type: ObjectType = ObjectType.Unknown,
    public tag: string[] = [],
    public isActive: boolean = false,
    public screenPosition: Vector3T | null = null,
    public screenRectSize: Vector2T | null = null,
    public position: Vector3T | null = null,
    public rotation: Vector4T | null = null,
    public text: string | Uint8Array | null = null,
  ) {}

  pack(builder: flatbuffers.Builder): flatbuffers.Offset {
    const path = this.path !== null ? builder.createString(this.path!) : 0;
    const name = this.name !== null ? builder.createString(this.name!) : 0;
    const tag = ObjectInfo.createTagVector(builder, builder.createObjectOffsetList(this.tag));
    const text = this.text !== null ? builder.createString(this.text!) : 0;

    ObjectInfo.startObjectInfo(builder);
    ObjectInfo.addPath(builder, path);
    ObjectInfo.addName(builder, name);
    ObjectInfo.addType(builder, this.type);
    ObjectInfo.addTag(builder, tag);
    ObjectInfo.addIsActive(builder, this.isActive);
    ObjectInfo.addScreenPosition(builder, this.screenPosition !== null ? this.screenPosition!.pack(builder) : 0);
    ObjectInfo.addScreenRectSize(builder, this.screenRectSize !== null ? this.screenRectSize!.pack(builder) : 0);
    ObjectInfo.addPosition(builder, this.position !== null ? this.position!.pack(builder) : 0);
    ObjectInfo.addRotation(builder, this.rotation !== null ? this.rotation!.pack(builder) : 0);
    ObjectInfo.addText(builder, text);

    return ObjectInfo.endObjectInfo(builder);
  }
}
