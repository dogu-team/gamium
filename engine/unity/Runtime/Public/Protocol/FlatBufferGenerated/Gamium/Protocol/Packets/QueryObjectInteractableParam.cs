// <auto-generated>
//  automatically generated by the FlatBuffers compiler, do not modify
// </auto-generated>

namespace Gamium.Protocol.Packets
{

using global::System;
using global::System.Collections.Generic;
using global::Google.FlatBuffers;

public struct QueryObjectInteractableParam : IFlatbufferObject
{
  private Table __p;
  public ByteBuffer ByteBuffer { get { return __p.bb; } }
  public static void ValidateVersion() { FlatBufferConstants.FLATBUFFERS_22_10_26(); }
  public static QueryObjectInteractableParam GetRootAsQueryObjectInteractableParam(ByteBuffer _bb) { return GetRootAsQueryObjectInteractableParam(_bb, new QueryObjectInteractableParam()); }
  public static QueryObjectInteractableParam GetRootAsQueryObjectInteractableParam(ByteBuffer _bb, QueryObjectInteractableParam obj) { return (obj.__assign(_bb.GetInt(_bb.Position) + _bb.Position, _bb)); }
  public void __init(int _i, ByteBuffer _bb) { __p = new Table(_i, _bb); }
  public QueryObjectInteractableParam __assign(int _i, ByteBuffer _bb) { __init(_i, _bb); return this; }

  public string ObjectId { get { int o = __p.__offset(4); return o != 0 ? __p.__string(o + __p.bb_pos) : null; } }
#if ENABLE_SPAN_T
  public Span<byte> GetObjectIdBytes() { return __p.__vector_as_span<byte>(4, 1); }
#else
  public ArraySegment<byte>? GetObjectIdBytes() { return __p.__vector_as_arraysegment(4); }
#endif
  public byte[] GetObjectIdArray() { return __p.__vector_as_array<byte>(4); }
  public bool CheckMoving { get { int o = __p.__offset(6); return o != 0 ? 0!=__p.bb.Get(o + __p.bb_pos) : (bool)false; } }
  public bool CheckRaycast { get { int o = __p.__offset(8); return o != 0 ? 0!=__p.bb.Get(o + __p.bb_pos) : (bool)false; } }

  public static Offset<Gamium.Protocol.Packets.QueryObjectInteractableParam> CreateQueryObjectInteractableParam(FlatBufferBuilder builder,
      StringOffset object_idOffset = default(StringOffset),
      bool check_moving = false,
      bool check_raycast = false) {
    builder.StartTable(3);
    QueryObjectInteractableParam.AddObjectId(builder, object_idOffset);
    QueryObjectInteractableParam.AddCheckRaycast(builder, check_raycast);
    QueryObjectInteractableParam.AddCheckMoving(builder, check_moving);
    return QueryObjectInteractableParam.EndQueryObjectInteractableParam(builder);
  }

  public static void StartQueryObjectInteractableParam(FlatBufferBuilder builder) { builder.StartTable(3); }
  public static void AddObjectId(FlatBufferBuilder builder, StringOffset objectIdOffset) { builder.AddOffset(0, objectIdOffset.Value, 0); }
  public static void AddCheckMoving(FlatBufferBuilder builder, bool checkMoving) { builder.AddBool(1, checkMoving, false); }
  public static void AddCheckRaycast(FlatBufferBuilder builder, bool checkRaycast) { builder.AddBool(2, checkRaycast, false); }
  public static Offset<Gamium.Protocol.Packets.QueryObjectInteractableParam> EndQueryObjectInteractableParam(FlatBufferBuilder builder) {
    int o = builder.EndTable();
    return new Offset<Gamium.Protocol.Packets.QueryObjectInteractableParam>(o);
  }
  public QueryObjectInteractableParamT UnPack() {
    var _o = new QueryObjectInteractableParamT();
    this.UnPackTo(_o);
    return _o;
  }
  public void UnPackTo(QueryObjectInteractableParamT _o) {
    _o.ObjectId = this.ObjectId;
    _o.CheckMoving = this.CheckMoving;
    _o.CheckRaycast = this.CheckRaycast;
  }
  public static Offset<Gamium.Protocol.Packets.QueryObjectInteractableParam> Pack(FlatBufferBuilder builder, QueryObjectInteractableParamT _o) {
    if (_o == null) return default(Offset<Gamium.Protocol.Packets.QueryObjectInteractableParam>);
    var _object_id = _o.ObjectId == null ? default(StringOffset) : builder.CreateString(_o.ObjectId);
    return CreateQueryObjectInteractableParam(
      builder,
      _object_id,
      _o.CheckMoving,
      _o.CheckRaycast);
  }
}

public class QueryObjectInteractableParamT
{
  public string ObjectId { get; set; }
  public bool CheckMoving { get; set; }
  public bool CheckRaycast { get; set; }

  public QueryObjectInteractableParamT() {
    this.ObjectId = null;
    this.CheckMoving = false;
    this.CheckRaycast = false;
  }
}


}
