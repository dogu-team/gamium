// <auto-generated>
//  automatically generated by the FlatBuffers compiler, do not modify
// </auto-generated>

namespace Gamium.Protocol.Packets
{

using global::System;
using global::System.Collections.Generic;
using global::Google.FlatBuffers;

public struct ExecuteRpcResult : IFlatbufferObject
{
  private Table __p;
  public ByteBuffer ByteBuffer { get { return __p.bb; } }
  public static void ValidateVersion() { FlatBufferConstants.FLATBUFFERS_22_10_26(); }
  public static ExecuteRpcResult GetRootAsExecuteRpcResult(ByteBuffer _bb) { return GetRootAsExecuteRpcResult(_bb, new ExecuteRpcResult()); }
  public static ExecuteRpcResult GetRootAsExecuteRpcResult(ByteBuffer _bb, ExecuteRpcResult obj) { return (obj.__assign(_bb.GetInt(_bb.Position) + _bb.Position, _bb)); }
  public void __init(int _i, ByteBuffer _bb) { __p = new Table(_i, _bb); }
  public ExecuteRpcResult __assign(int _i, ByteBuffer _bb) { __init(_i, _bb); return this; }

  public string Document { get { int o = __p.__offset(4); return o != 0 ? __p.__string(o + __p.bb_pos) : null; } }
#if ENABLE_SPAN_T
  public Span<byte> GetDocumentBytes() { return __p.__vector_as_span<byte>(4, 1); }
#else
  public ArraySegment<byte>? GetDocumentBytes() { return __p.__vector_as_arraysegment(4); }
#endif
  public byte[] GetDocumentArray() { return __p.__vector_as_array<byte>(4); }

  public static Offset<Gamium.Protocol.Packets.ExecuteRpcResult> CreateExecuteRpcResult(FlatBufferBuilder builder,
      StringOffset documentOffset = default(StringOffset)) {
    builder.StartTable(1);
    ExecuteRpcResult.AddDocument(builder, documentOffset);
    return ExecuteRpcResult.EndExecuteRpcResult(builder);
  }

  public static void StartExecuteRpcResult(FlatBufferBuilder builder) { builder.StartTable(1); }
  public static void AddDocument(FlatBufferBuilder builder, StringOffset documentOffset) { builder.AddOffset(0, documentOffset.Value, 0); }
  public static Offset<Gamium.Protocol.Packets.ExecuteRpcResult> EndExecuteRpcResult(FlatBufferBuilder builder) {
    int o = builder.EndTable();
    return new Offset<Gamium.Protocol.Packets.ExecuteRpcResult>(o);
  }
  public ExecuteRpcResultT UnPack() {
    var _o = new ExecuteRpcResultT();
    this.UnPackTo(_o);
    return _o;
  }
  public void UnPackTo(ExecuteRpcResultT _o) {
    _o.Document = this.Document;
  }
  public static Offset<Gamium.Protocol.Packets.ExecuteRpcResult> Pack(FlatBufferBuilder builder, ExecuteRpcResultT _o) {
    if (_o == null) return default(Offset<Gamium.Protocol.Packets.ExecuteRpcResult>);
    var _document = _o.Document == null ? default(StringOffset) : builder.CreateString(_o.Document);
    return CreateExecuteRpcResult(
      builder,
      _document);
  }
}

public class ExecuteRpcResultT
{
  public string Document { get; set; }

  public ExecuteRpcResultT() {
    this.Document = null;
  }
}


}