// <auto-generated>
//  automatically generated by the FlatBuffers compiler, do not modify
// </auto-generated>

namespace Gamium.Protocol.Packets
{

using global::System;
using global::System.Collections.Generic;
using global::Google.FlatBuffers;

public struct QueryProfileResult : IFlatbufferObject
{
  private Table __p;
  public ByteBuffer ByteBuffer { get { return __p.bb; } }
  public static void ValidateVersion() { FlatBufferConstants.FLATBUFFERS_22_10_26(); }
  public static QueryProfileResult GetRootAsQueryProfileResult(ByteBuffer _bb) { return GetRootAsQueryProfileResult(_bb, new QueryProfileResult()); }
  public static QueryProfileResult GetRootAsQueryProfileResult(ByteBuffer _bb, QueryProfileResult obj) { return (obj.__assign(_bb.GetInt(_bb.Position) + _bb.Position, _bb)); }
  public void __init(int _i, ByteBuffer _bb) { __p = new Table(_i, _bb); }
  public QueryProfileResult __assign(int _i, ByteBuffer _bb) { __init(_i, _bb); return this; }

  public uint Fps { get { int o = __p.__offset(4); return o != 0 ? __p.bb.GetUint(o + __p.bb_pos) : (uint)0; } }

  public static Offset<Gamium.Protocol.Packets.QueryProfileResult> CreateQueryProfileResult(FlatBufferBuilder builder,
      uint fps = 0) {
    builder.StartTable(1);
    QueryProfileResult.AddFps(builder, fps);
    return QueryProfileResult.EndQueryProfileResult(builder);
  }

  public static void StartQueryProfileResult(FlatBufferBuilder builder) { builder.StartTable(1); }
  public static void AddFps(FlatBufferBuilder builder, uint fps) { builder.AddUint(0, fps, 0); }
  public static Offset<Gamium.Protocol.Packets.QueryProfileResult> EndQueryProfileResult(FlatBufferBuilder builder) {
    int o = builder.EndTable();
    return new Offset<Gamium.Protocol.Packets.QueryProfileResult>(o);
  }
  public QueryProfileResultT UnPack() {
    var _o = new QueryProfileResultT();
    this.UnPackTo(_o);
    return _o;
  }
  public void UnPackTo(QueryProfileResultT _o) {
    _o.Fps = this.Fps;
  }
  public static Offset<Gamium.Protocol.Packets.QueryProfileResult> Pack(FlatBufferBuilder builder, QueryProfileResultT _o) {
    if (_o == null) return default(Offset<Gamium.Protocol.Packets.QueryProfileResult>);
    return CreateQueryProfileResult(
      builder,
      _o.Fps);
  }
}

public class QueryProfileResultT
{
  public uint Fps { get; set; }

  public QueryProfileResultT() {
    this.Fps = 0;
  }
}


}