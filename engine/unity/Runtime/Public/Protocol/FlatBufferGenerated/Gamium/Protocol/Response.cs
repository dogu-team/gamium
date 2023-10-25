// <auto-generated>
//  automatically generated by the FlatBuffers compiler, do not modify
// </auto-generated>

namespace Gamium.Protocol
{

using global::System;
using global::System.Collections.Generic;
using global::Google.FlatBuffers;

public struct Response : IFlatbufferObject
{
  private Table __p;
  public ByteBuffer ByteBuffer { get { return __p.bb; } }
  public static void ValidateVersion() { FlatBufferConstants.FLATBUFFERS_22_10_26(); }
  public static Response GetRootAsResponse(ByteBuffer _bb) { return GetRootAsResponse(_bb, new Response()); }
  public static Response GetRootAsResponse(ByteBuffer _bb, Response obj) { return (obj.__assign(_bb.GetInt(_bb.Position) + _bb.Position, _bb)); }
  public void __init(int _i, ByteBuffer _bb) { __p = new Table(_i, _bb); }
  public Response __assign(int _i, ByteBuffer _bb) { __init(_i, _bb); return this; }

  public uint Seq { get { int o = __p.__offset(4); return o != 0 ? __p.bb.GetUint(o + __p.bb_pos) : (uint)0; } }
  public Gamium.Protocol.Types.ErrorResult? Error { get { int o = __p.__offset(6); return o != 0 ? (Gamium.Protocol.Types.ErrorResult?)(new Gamium.Protocol.Types.ErrorResult()).__assign(__p.__indirect(o + __p.bb_pos), __p.bb) : null; } }
  public Gamium.Protocol.Result ResultType { get { int o = __p.__offset(8); return o != 0 ? (Gamium.Protocol.Result)__p.bb.Get(o + __p.bb_pos) : Gamium.Protocol.Result.NONE; } }
  public TTable? Result<TTable>() where TTable : struct, IFlatbufferObject { int o = __p.__offset(10); return o != 0 ? (TTable?)__p.__union<TTable>(o + __p.bb_pos) : null; }
  public Gamium.Protocol.Packets.HelloResult ResultAsPackets_HelloResult() { return Result<Gamium.Protocol.Packets.HelloResult>().Value; }
  public Gamium.Protocol.Packets.QueryScreenResult ResultAsPackets_QueryScreenResult() { return Result<Gamium.Protocol.Packets.QueryScreenResult>().Value; }
  public Gamium.Protocol.Packets.FindObjectsResult ResultAsPackets_FindObjectsResult() { return Result<Gamium.Protocol.Packets.FindObjectsResult>().Value; }
  public Gamium.Protocol.Packets.QueryObjectInteractableResult ResultAsPackets_QueryObjectInteractableResult() { return Result<Gamium.Protocol.Packets.QueryObjectInteractableResult>().Value; }
  public Gamium.Protocol.Packets.ActionsResult ResultAsPackets_ActionsResult() { return Result<Gamium.Protocol.Packets.ActionsResult>().Value; }
  public Gamium.Protocol.Packets.ExecuteRpcResult ResultAsPackets_ExecuteRpcResult() { return Result<Gamium.Protocol.Packets.ExecuteRpcResult>().Value; }
  public Gamium.Protocol.Packets.InspectObjectOnScreenResult ResultAsPackets_InspectObjectOnScreenResult() { return Result<Gamium.Protocol.Packets.InspectObjectOnScreenResult>().Value; }
  public Gamium.Protocol.Packets.InspectObjectWithIdResult ResultAsPackets_InspectObjectWithIdResult() { return Result<Gamium.Protocol.Packets.InspectObjectWithIdResult>().Value; }
  public Gamium.Protocol.Packets.DumpObjectsHierarchyResult ResultAsPackets_DumpObjectsHierarchyResult() { return Result<Gamium.Protocol.Packets.DumpObjectsHierarchyResult>().Value; }
  public Gamium.Protocol.Packets.ChangeConfigurationResult ResultAsPackets_ChangeConfigurationResult() { return Result<Gamium.Protocol.Packets.ChangeConfigurationResult>().Value; }
  public Gamium.Protocol.Packets.QueryProfileResult ResultAsPackets_QueryProfileResult() { return Result<Gamium.Protocol.Packets.QueryProfileResult>().Value; }
  public Gamium.Protocol.Packets.GetPageSourceResult ResultAsPackets_GetPageSourceResult() { return Result<Gamium.Protocol.Packets.GetPageSourceResult>().Value; }

  public static Offset<Gamium.Protocol.Response> CreateResponse(FlatBufferBuilder builder,
      uint seq = 0,
      Offset<Gamium.Protocol.Types.ErrorResult> errorOffset = default(Offset<Gamium.Protocol.Types.ErrorResult>),
      Gamium.Protocol.Result result_type = Gamium.Protocol.Result.NONE,
      int resultOffset = 0) {
    builder.StartTable(4);
    Response.AddResult(builder, resultOffset);
    Response.AddError(builder, errorOffset);
    Response.AddSeq(builder, seq);
    Response.AddResultType(builder, result_type);
    return Response.EndResponse(builder);
  }

  public static void StartResponse(FlatBufferBuilder builder) { builder.StartTable(4); }
  public static void AddSeq(FlatBufferBuilder builder, uint seq) { builder.AddUint(0, seq, 0); }
  public static void AddError(FlatBufferBuilder builder, Offset<Gamium.Protocol.Types.ErrorResult> errorOffset) { builder.AddOffset(1, errorOffset.Value, 0); }
  public static void AddResultType(FlatBufferBuilder builder, Gamium.Protocol.Result resultType) { builder.AddByte(2, (byte)resultType, 0); }
  public static void AddResult(FlatBufferBuilder builder, int resultOffset) { builder.AddOffset(3, resultOffset, 0); }
  public static Offset<Gamium.Protocol.Response> EndResponse(FlatBufferBuilder builder) {
    int o = builder.EndTable();
    return new Offset<Gamium.Protocol.Response>(o);
  }
  public static void FinishResponseBuffer(FlatBufferBuilder builder, Offset<Gamium.Protocol.Response> offset) { builder.Finish(offset.Value); }
  public static void FinishSizePrefixedResponseBuffer(FlatBufferBuilder builder, Offset<Gamium.Protocol.Response> offset) { builder.FinishSizePrefixed(offset.Value); }
  public ResponseT UnPack() {
    var _o = new ResponseT();
    this.UnPackTo(_o);
    return _o;
  }
  public void UnPackTo(ResponseT _o) {
    _o.Seq = this.Seq;
    _o.Error = this.Error.HasValue ? this.Error.Value.UnPack() : null;
    _o.Result = new Gamium.Protocol.ResultUnion();
    _o.Result.Type = this.ResultType;
    switch (this.ResultType) {
      default: break;
      case Gamium.Protocol.Result.Packets_HelloResult:
        _o.Result.Value = this.Result<Gamium.Protocol.Packets.HelloResult>().HasValue ? this.Result<Gamium.Protocol.Packets.HelloResult>().Value.UnPack() : null;
        break;
      case Gamium.Protocol.Result.Packets_QueryScreenResult:
        _o.Result.Value = this.Result<Gamium.Protocol.Packets.QueryScreenResult>().HasValue ? this.Result<Gamium.Protocol.Packets.QueryScreenResult>().Value.UnPack() : null;
        break;
      case Gamium.Protocol.Result.Packets_FindObjectsResult:
        _o.Result.Value = this.Result<Gamium.Protocol.Packets.FindObjectsResult>().HasValue ? this.Result<Gamium.Protocol.Packets.FindObjectsResult>().Value.UnPack() : null;
        break;
      case Gamium.Protocol.Result.Packets_QueryObjectInteractableResult:
        _o.Result.Value = this.Result<Gamium.Protocol.Packets.QueryObjectInteractableResult>().HasValue ? this.Result<Gamium.Protocol.Packets.QueryObjectInteractableResult>().Value.UnPack() : null;
        break;
      case Gamium.Protocol.Result.Packets_ActionsResult:
        _o.Result.Value = this.Result<Gamium.Protocol.Packets.ActionsResult>().HasValue ? this.Result<Gamium.Protocol.Packets.ActionsResult>().Value.UnPack() : null;
        break;
      case Gamium.Protocol.Result.Packets_ExecuteRpcResult:
        _o.Result.Value = this.Result<Gamium.Protocol.Packets.ExecuteRpcResult>().HasValue ? this.Result<Gamium.Protocol.Packets.ExecuteRpcResult>().Value.UnPack() : null;
        break;
      case Gamium.Protocol.Result.Packets_InspectObjectOnScreenResult:
        _o.Result.Value = this.Result<Gamium.Protocol.Packets.InspectObjectOnScreenResult>().HasValue ? this.Result<Gamium.Protocol.Packets.InspectObjectOnScreenResult>().Value.UnPack() : null;
        break;
      case Gamium.Protocol.Result.Packets_InspectObjectWithIdResult:
        _o.Result.Value = this.Result<Gamium.Protocol.Packets.InspectObjectWithIdResult>().HasValue ? this.Result<Gamium.Protocol.Packets.InspectObjectWithIdResult>().Value.UnPack() : null;
        break;
      case Gamium.Protocol.Result.Packets_DumpObjectsHierarchyResult:
        _o.Result.Value = this.Result<Gamium.Protocol.Packets.DumpObjectsHierarchyResult>().HasValue ? this.Result<Gamium.Protocol.Packets.DumpObjectsHierarchyResult>().Value.UnPack() : null;
        break;
      case Gamium.Protocol.Result.Packets_ChangeConfigurationResult:
        _o.Result.Value = this.Result<Gamium.Protocol.Packets.ChangeConfigurationResult>().HasValue ? this.Result<Gamium.Protocol.Packets.ChangeConfigurationResult>().Value.UnPack() : null;
        break;
      case Gamium.Protocol.Result.Packets_QueryProfileResult:
        _o.Result.Value = this.Result<Gamium.Protocol.Packets.QueryProfileResult>().HasValue ? this.Result<Gamium.Protocol.Packets.QueryProfileResult>().Value.UnPack() : null;
        break;
      case Gamium.Protocol.Result.Packets_GetPageSourceResult:
        _o.Result.Value = this.Result<Gamium.Protocol.Packets.GetPageSourceResult>().HasValue ? this.Result<Gamium.Protocol.Packets.GetPageSourceResult>().Value.UnPack() : null;
        break;
    }
  }
  public static Offset<Gamium.Protocol.Response> Pack(FlatBufferBuilder builder, ResponseT _o) {
    if (_o == null) return default(Offset<Gamium.Protocol.Response>);
    var _error = _o.Error == null ? default(Offset<Gamium.Protocol.Types.ErrorResult>) : Gamium.Protocol.Types.ErrorResult.Pack(builder, _o.Error);
    var _result_type = _o.Result == null ? Gamium.Protocol.Result.NONE : _o.Result.Type;
    var _result = _o.Result == null ? 0 : Gamium.Protocol.ResultUnion.Pack(builder, _o.Result);
    return CreateResponse(
      builder,
      _o.Seq,
      _error,
      _result_type,
      _result);
  }
}

public class ResponseT
{
  public uint Seq { get; set; }
  public Gamium.Protocol.Types.ErrorResultT Error { get; set; }
  public Gamium.Protocol.ResultUnion Result { get; set; }

  public ResponseT() {
    this.Seq = 0;
    this.Error = null;
    this.Result = null;
  }
  public static ResponseT DeserializeFromBinary(byte[] fbBuffer) {
    return Response.GetRootAsResponse(new ByteBuffer(fbBuffer)).UnPack();
  }
  public byte[] SerializeToBinary() {
    var fbb = new FlatBufferBuilder(0x10000);
    Response.FinishResponseBuffer(fbb, Response.Pack(fbb, this));
    return fbb.DataBuffer.ToSizedArray();
  }
}


}