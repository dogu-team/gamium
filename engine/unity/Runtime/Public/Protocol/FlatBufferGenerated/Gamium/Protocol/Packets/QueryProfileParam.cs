// <auto-generated>
//  automatically generated by the FlatBuffers compiler, do not modify
// </auto-generated>

namespace Gamium.Protocol.Packets
{

using global::System;
using global::System.Collections.Generic;
using global::Google.FlatBuffers;

public struct QueryProfileParam : IFlatbufferObject
{
  private Table __p;
  public ByteBuffer ByteBuffer { get { return __p.bb; } }
  public static void ValidateVersion() { FlatBufferConstants.FLATBUFFERS_22_10_26(); }
  public static QueryProfileParam GetRootAsQueryProfileParam(ByteBuffer _bb) { return GetRootAsQueryProfileParam(_bb, new QueryProfileParam()); }
  public static QueryProfileParam GetRootAsQueryProfileParam(ByteBuffer _bb, QueryProfileParam obj) { return (obj.__assign(_bb.GetInt(_bb.Position) + _bb.Position, _bb)); }
  public void __init(int _i, ByteBuffer _bb) { __p = new Table(_i, _bb); }
  public QueryProfileParam __assign(int _i, ByteBuffer _bb) { __init(_i, _bb); return this; }


  public static void StartQueryProfileParam(FlatBufferBuilder builder) { builder.StartTable(0); }
  public static Offset<Gamium.Protocol.Packets.QueryProfileParam> EndQueryProfileParam(FlatBufferBuilder builder) {
    int o = builder.EndTable();
    return new Offset<Gamium.Protocol.Packets.QueryProfileParam>(o);
  }
  public QueryProfileParamT UnPack() {
    var _o = new QueryProfileParamT();
    this.UnPackTo(_o);
    return _o;
  }
  public void UnPackTo(QueryProfileParamT _o) {
  }
  public static Offset<Gamium.Protocol.Packets.QueryProfileParam> Pack(FlatBufferBuilder builder, QueryProfileParamT _o) {
    if (_o == null) return default(Offset<Gamium.Protocol.Packets.QueryProfileParam>);
    StartQueryProfileParam(builder);
    return EndQueryProfileParam(builder);
  }
}

public class QueryProfileParamT
{

  public QueryProfileParamT() {
  }
}


}
