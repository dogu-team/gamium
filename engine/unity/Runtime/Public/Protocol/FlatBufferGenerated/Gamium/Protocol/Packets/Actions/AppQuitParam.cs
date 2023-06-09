// <auto-generated>
//  automatically generated by the FlatBuffers compiler, do not modify
// </auto-generated>

namespace Gamium.Protocol.Packets.Actions
{

using global::System;
using global::System.Collections.Generic;
using global::Google.FlatBuffers;

public struct AppQuitParam : IFlatbufferObject
{
  private Table __p;
  public ByteBuffer ByteBuffer { get { return __p.bb; } }
  public static void ValidateVersion() { FlatBufferConstants.FLATBUFFERS_22_10_26(); }
  public static AppQuitParam GetRootAsAppQuitParam(ByteBuffer _bb) { return GetRootAsAppQuitParam(_bb, new AppQuitParam()); }
  public static AppQuitParam GetRootAsAppQuitParam(ByteBuffer _bb, AppQuitParam obj) { return (obj.__assign(_bb.GetInt(_bb.Position) + _bb.Position, _bb)); }
  public void __init(int _i, ByteBuffer _bb) { __p = new Table(_i, _bb); }
  public AppQuitParam __assign(int _i, ByteBuffer _bb) { __init(_i, _bb); return this; }

  public int ExitCode { get { int o = __p.__offset(4); return o != 0 ? __p.bb.GetInt(o + __p.bb_pos) : (int)0; } }
  public uint DelayMs { get { int o = __p.__offset(6); return o != 0 ? __p.bb.GetUint(o + __p.bb_pos) : (uint)0; } }

  public static Offset<Gamium.Protocol.Packets.Actions.AppQuitParam> CreateAppQuitParam(FlatBufferBuilder builder,
      int exit_code = 0,
      uint delay_ms = 0) {
    builder.StartTable(2);
    AppQuitParam.AddDelayMs(builder, delay_ms);
    AppQuitParam.AddExitCode(builder, exit_code);
    return AppQuitParam.EndAppQuitParam(builder);
  }

  public static void StartAppQuitParam(FlatBufferBuilder builder) { builder.StartTable(2); }
  public static void AddExitCode(FlatBufferBuilder builder, int exitCode) { builder.AddInt(0, exitCode, 0); }
  public static void AddDelayMs(FlatBufferBuilder builder, uint delayMs) { builder.AddUint(1, delayMs, 0); }
  public static Offset<Gamium.Protocol.Packets.Actions.AppQuitParam> EndAppQuitParam(FlatBufferBuilder builder) {
    int o = builder.EndTable();
    return new Offset<Gamium.Protocol.Packets.Actions.AppQuitParam>(o);
  }
  public AppQuitParamT UnPack() {
    var _o = new AppQuitParamT();
    this.UnPackTo(_o);
    return _o;
  }
  public void UnPackTo(AppQuitParamT _o) {
    _o.ExitCode = this.ExitCode;
    _o.DelayMs = this.DelayMs;
  }
  public static Offset<Gamium.Protocol.Packets.Actions.AppQuitParam> Pack(FlatBufferBuilder builder, AppQuitParamT _o) {
    if (_o == null) return default(Offset<Gamium.Protocol.Packets.Actions.AppQuitParam>);
    return CreateAppQuitParam(
      builder,
      _o.ExitCode,
      _o.DelayMs);
  }
}

public class AppQuitParamT
{
  public int ExitCode { get; set; }
  public uint DelayMs { get; set; }

  public AppQuitParamT() {
    this.ExitCode = 0;
    this.DelayMs = 0;
  }
}


}
