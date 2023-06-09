// <auto-generated>
//  automatically generated by the FlatBuffers compiler, do not modify
// </auto-generated>

namespace Gamium.Protocol.Types
{

using global::System;
using global::System.Collections.Generic;
using global::Google.FlatBuffers;

public struct Vector2 : IFlatbufferObject
{
  private Struct __p;
  public ByteBuffer ByteBuffer { get { return __p.bb; } }
  public void __init(int _i, ByteBuffer _bb) { __p = new Struct(_i, _bb); }
  public Vector2 __assign(int _i, ByteBuffer _bb) { __init(_i, _bb); return this; }

  public float X { get { return __p.bb.GetFloat(__p.bb_pos + 0); } }
  public float Y { get { return __p.bb.GetFloat(__p.bb_pos + 4); } }

  public static Offset<Gamium.Protocol.Types.Vector2> CreateVector2(FlatBufferBuilder builder, float X, float Y) {
    builder.Prep(4, 8);
    builder.PutFloat(Y);
    builder.PutFloat(X);
    return new Offset<Gamium.Protocol.Types.Vector2>(builder.Offset);
  }
  public Vector2T UnPack() {
    var _o = new Vector2T();
    this.UnPackTo(_o);
    return _o;
  }
  public void UnPackTo(Vector2T _o) {
    _o.X = this.X;
    _o.Y = this.Y;
  }
  public static Offset<Gamium.Protocol.Types.Vector2> Pack(FlatBufferBuilder builder, Vector2T _o) {
    if (_o == null) return default(Offset<Gamium.Protocol.Types.Vector2>);
    return CreateVector2(
      builder,
      _o.X,
      _o.Y);
  }
}

public class Vector2T
{
  public float X { get; set; }
  public float Y { get; set; }

  public Vector2T() {
    this.X = 0.0f;
    this.Y = 0.0f;
  }
}


}
