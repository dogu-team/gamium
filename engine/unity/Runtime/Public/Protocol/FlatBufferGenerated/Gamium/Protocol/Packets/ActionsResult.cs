// <auto-generated>
//  automatically generated by the FlatBuffers compiler, do not modify
// </auto-generated>

namespace Gamium.Protocol.Packets
{

using global::System;
using global::System.Collections.Generic;
using global::Google.FlatBuffers;

public struct ActionsResult : IFlatbufferObject
{
  private Table __p;
  public ByteBuffer ByteBuffer { get { return __p.bb; } }
  public static void ValidateVersion() { FlatBufferConstants.FLATBUFFERS_22_10_26(); }
  public static ActionsResult GetRootAsActionsResult(ByteBuffer _bb) { return GetRootAsActionsResult(_bb, new ActionsResult()); }
  public static ActionsResult GetRootAsActionsResult(ByteBuffer _bb, ActionsResult obj) { return (obj.__assign(_bb.GetInt(_bb.Position) + _bb.Position, _bb)); }
  public void __init(int _i, ByteBuffer _bb) { __p = new Table(_i, _bb); }
  public ActionsResult __assign(int _i, ByteBuffer _bb) { __init(_i, _bb); return this; }

  public Gamium.Protocol.Packets.ActionResult? Results(int j) { int o = __p.__offset(4); return o != 0 ? (Gamium.Protocol.Packets.ActionResult?)(new Gamium.Protocol.Packets.ActionResult()).__assign(__p.__indirect(__p.__vector(o) + j * 4), __p.bb) : null; }
  public int ResultsLength { get { int o = __p.__offset(4); return o != 0 ? __p.__vector_len(o) : 0; } }

  public static Offset<Gamium.Protocol.Packets.ActionsResult> CreateActionsResult(FlatBufferBuilder builder,
      VectorOffset resultsOffset = default(VectorOffset)) {
    builder.StartTable(1);
    ActionsResult.AddResults(builder, resultsOffset);
    return ActionsResult.EndActionsResult(builder);
  }

  public static void StartActionsResult(FlatBufferBuilder builder) { builder.StartTable(1); }
  public static void AddResults(FlatBufferBuilder builder, VectorOffset resultsOffset) { builder.AddOffset(0, resultsOffset.Value, 0); }
  public static VectorOffset CreateResultsVector(FlatBufferBuilder builder, Offset<Gamium.Protocol.Packets.ActionResult>[] data) { builder.StartVector(4, data.Length, 4); for (int i = data.Length - 1; i >= 0; i--) builder.AddOffset(data[i].Value); return builder.EndVector(); }
  public static VectorOffset CreateResultsVectorBlock(FlatBufferBuilder builder, Offset<Gamium.Protocol.Packets.ActionResult>[] data) { builder.StartVector(4, data.Length, 4); builder.Add(data); return builder.EndVector(); }
  public static VectorOffset CreateResultsVectorBlock(FlatBufferBuilder builder, ArraySegment<Offset<Gamium.Protocol.Packets.ActionResult>> data) { builder.StartVector(4, data.Count, 4); builder.Add(data); return builder.EndVector(); }
  public static VectorOffset CreateResultsVectorBlock(FlatBufferBuilder builder, IntPtr dataPtr, int sizeInBytes) { builder.StartVector(1, sizeInBytes, 1); builder.Add<Offset<Gamium.Protocol.Packets.ActionResult>>(dataPtr, sizeInBytes); return builder.EndVector(); }
  public static void StartResultsVector(FlatBufferBuilder builder, int numElems) { builder.StartVector(4, numElems, 4); }
  public static Offset<Gamium.Protocol.Packets.ActionsResult> EndActionsResult(FlatBufferBuilder builder) {
    int o = builder.EndTable();
    return new Offset<Gamium.Protocol.Packets.ActionsResult>(o);
  }
  public ActionsResultT UnPack() {
    var _o = new ActionsResultT();
    this.UnPackTo(_o);
    return _o;
  }
  public void UnPackTo(ActionsResultT _o) {
    _o.Results = new List<Gamium.Protocol.Packets.ActionResultT>();
    for (var _j = 0; _j < this.ResultsLength; ++_j) {_o.Results.Add(this.Results(_j).HasValue ? this.Results(_j).Value.UnPack() : null);}
  }
  public static Offset<Gamium.Protocol.Packets.ActionsResult> Pack(FlatBufferBuilder builder, ActionsResultT _o) {
    if (_o == null) return default(Offset<Gamium.Protocol.Packets.ActionsResult>);
    var _results = default(VectorOffset);
    if (_o.Results != null) {
      var __results = new Offset<Gamium.Protocol.Packets.ActionResult>[_o.Results.Count];
      for (var _j = 0; _j < __results.Length; ++_j) { __results[_j] = Gamium.Protocol.Packets.ActionResult.Pack(builder, _o.Results[_j]); }
      _results = CreateResultsVector(builder, __results);
    }
    return CreateActionsResult(
      builder,
      _results);
  }
}

public class ActionsResultT
{
  public List<Gamium.Protocol.Packets.ActionResultT> Results { get; set; }

  public ActionsResultT() {
    this.Results = null;
  }
}


}