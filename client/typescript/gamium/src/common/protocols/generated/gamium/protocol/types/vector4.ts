// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

export class Vector4 implements flatbuffers.IUnpackableObject<Vector4T> {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(i: number, bb: flatbuffers.ByteBuffer): Vector4 {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  x(): number {
    return this.bb!.readFloat32(this.bb_pos);
  }

  y(): number {
    return this.bb!.readFloat32(this.bb_pos + 4);
  }

  z(): number {
    return this.bb!.readFloat32(this.bb_pos + 8);
  }

  w(): number {
    return this.bb!.readFloat32(this.bb_pos + 12);
  }

  static sizeOf(): number {
    return 16;
  }

  static createVector4(builder: flatbuffers.Builder, x: number, y: number, z: number, w: number): flatbuffers.Offset {
    builder.prep(4, 16);
    builder.writeFloat32(w);
    builder.writeFloat32(z);
    builder.writeFloat32(y);
    builder.writeFloat32(x);
    return builder.offset();
  }

  unpack(): Vector4T {
    return new Vector4T(this.x(), this.y(), this.z(), this.w());
  }

  unpackTo(_o: Vector4T): void {
    _o.x = this.x();
    _o.y = this.y();
    _o.z = this.z();
    _o.w = this.w();
  }
}

export class Vector4T implements flatbuffers.IGeneratedObject {
  constructor(public x: number = 0.0, public y: number = 0.0, public z: number = 0.0, public w: number = 0.0) {}

  pack(builder: flatbuffers.Builder): flatbuffers.Offset {
    return Vector4.createVector4(builder, this.x, this.y, this.z, this.w);
  }
}