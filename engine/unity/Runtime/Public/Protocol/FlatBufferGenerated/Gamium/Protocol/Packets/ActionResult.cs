// <auto-generated>
//  automatically generated by the FlatBuffers compiler, do not modify
// </auto-generated>

namespace Gamium.Protocol.Packets
{

using global::System;
using global::System.Collections.Generic;
using global::Google.FlatBuffers;

public struct ActionResult : IFlatbufferObject
{
  private Table __p;
  public ByteBuffer ByteBuffer { get { return __p.bb; } }
  public static void ValidateVersion() { FlatBufferConstants.FLATBUFFERS_22_10_26(); }
  public static ActionResult GetRootAsActionResult(ByteBuffer _bb) { return GetRootAsActionResult(_bb, new ActionResult()); }
  public static ActionResult GetRootAsActionResult(ByteBuffer _bb, ActionResult obj) { return (obj.__assign(_bb.GetInt(_bb.Position) + _bb.Position, _bb)); }
  public void __init(int _i, ByteBuffer _bb) { __p = new Table(_i, _bb); }
  public ActionResult __assign(int _i, ByteBuffer _bb) { __init(_i, _bb); return this; }

  public Gamium.Protocol.Types.ErrorResult? Error { get { int o = __p.__offset(4); return o != 0 ? (Gamium.Protocol.Types.ErrorResult?)(new Gamium.Protocol.Types.ErrorResult()).__assign(__p.__indirect(o + __p.bb_pos), __p.bb) : null; } }

  public static Offset<Gamium.Protocol.Packets.ActionResult> CreateActionResult(FlatBufferBuilder builder,
      Offset<Gamium.Protocol.Types.ErrorResult> errorOffset = default(Offset<Gamium.Protocol.Types.ErrorResult>)) {
    builder.StartTable(1);
    ActionResult.AddError(builder, errorOffset);
    return ActionResult.EndActionResult(builder);
  }

  public static void StartActionResult(FlatBufferBuilder builder) { builder.StartTable(1); }
  public static void AddError(FlatBufferBuilder builder, Offset<Gamium.Protocol.Types.ErrorResult> errorOffset) { builder.AddOffset(0, errorOffset.Value, 0); }
  public static Offset<Gamium.Protocol.Packets.ActionResult> EndActionResult(FlatBufferBuilder builder) {
    int o = builder.EndTable();
    return new Offset<Gamium.Protocol.Packets.ActionResult>(o);
  }
  public ActionResultT UnPack() {
    var _o = new ActionResultT();
    this.UnPackTo(_o);
    return _o;
  }
  public void UnPackTo(ActionResultT _o) {
    _o.Error = this.Error.HasValue ? this.Error.Value.UnPack() : null;
  }
  public static Offset<Gamium.Protocol.Packets.ActionResult> Pack(FlatBufferBuilder builder, ActionResultT _o) {
    if (_o == null) return default(Offset<Gamium.Protocol.Packets.ActionResult>);
    var _error = _o.Error == null ? default(Offset<Gamium.Protocol.Types.ErrorResult>) : Gamium.Protocol.Types.ErrorResult.Pack(builder, _o.Error);
    return CreateActionResult(
      builder,
      _error);
  }
}

public class ActionResultT
{
  public Gamium.Protocol.Types.ErrorResultT Error { get; set; }

  public ActionResultT() {
    this.Error = null;
  }
}


}