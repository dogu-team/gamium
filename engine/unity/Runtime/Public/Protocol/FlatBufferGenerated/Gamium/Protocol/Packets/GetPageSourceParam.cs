// <auto-generated>
//  automatically generated by the FlatBuffers compiler, do not modify
// </auto-generated>

namespace Gamium.Protocol.Packets
{

using global::System;
using global::System.Collections.Generic;
using global::Google.FlatBuffers;

public struct GetPageSourceParam : IFlatbufferObject
{
  private Table __p;
  public ByteBuffer ByteBuffer { get { return __p.bb; } }
  public static void ValidateVersion() { FlatBufferConstants.FLATBUFFERS_22_10_26(); }
  public static GetPageSourceParam GetRootAsGetPageSourceParam(ByteBuffer _bb) { return GetRootAsGetPageSourceParam(_bb, new GetPageSourceParam()); }
  public static GetPageSourceParam GetRootAsGetPageSourceParam(ByteBuffer _bb, GetPageSourceParam obj) { return (obj.__assign(_bb.GetInt(_bb.Position) + _bb.Position, _bb)); }
  public void __init(int _i, ByteBuffer _bb) { __p = new Table(_i, _bb); }
  public GetPageSourceParam __assign(int _i, ByteBuffer _bb) { __init(_i, _bb); return this; }


  public static void StartGetPageSourceParam(FlatBufferBuilder builder) { builder.StartTable(0); }
  public static Offset<Gamium.Protocol.Packets.GetPageSourceParam> EndGetPageSourceParam(FlatBufferBuilder builder) {
    int o = builder.EndTable();
    return new Offset<Gamium.Protocol.Packets.GetPageSourceParam>(o);
  }
  public GetPageSourceParamT UnPack() {
    var _o = new GetPageSourceParamT();
    this.UnPackTo(_o);
    return _o;
  }
  public void UnPackTo(GetPageSourceParamT _o) {
  }
  public static Offset<Gamium.Protocol.Packets.GetPageSourceParam> Pack(FlatBufferBuilder builder, GetPageSourceParamT _o) {
    if (_o == null) return default(Offset<Gamium.Protocol.Packets.GetPageSourceParam>);
    StartGetPageSourceParam(builder);
    return EndGetPageSourceParam(builder);
  }
}

public class GetPageSourceParamT
{

  public GetPageSourceParamT() {
  }
}


}
