// <auto-generated>
//  automatically generated by the FlatBuffers compiler, do not modify
// </auto-generated>

namespace Gamium.Protocol.Types
{

using global::System;
using global::System.Collections.Generic;
using global::Google.FlatBuffers;

public struct Configuration : IFlatbufferObject
{
  private Table __p;
  public ByteBuffer ByteBuffer { get { return __p.bb; } }
  public static void ValidateVersion() { FlatBufferConstants.FLATBUFFERS_22_10_26(); }
  public static Configuration GetRootAsConfiguration(ByteBuffer _bb) { return GetRootAsConfiguration(_bb, new Configuration()); }
  public static Configuration GetRootAsConfiguration(ByteBuffer _bb, Configuration obj) { return (obj.__assign(_bb.GetInt(_bb.Position) + _bb.Position, _bb)); }
  public void __init(int _i, ByteBuffer _bb) { __p = new Table(_i, _bb); }
  public Configuration __assign(int _i, ByteBuffer _bb) { __init(_i, _bb); return this; }

  public bool? ShowDebugUi { get { int o = __p.__offset(4); return o != 0 ? 0!=__p.bb.Get(o + __p.bb_pos) : (bool?)null; } }
  public bool? InspectIgnoreBigObject { get { int o = __p.__offset(6); return o != 0 ? 0!=__p.bb.Get(o + __p.bb_pos) : (bool?)null; } }

  public static Offset<Gamium.Protocol.Types.Configuration> CreateConfiguration(FlatBufferBuilder builder,
      bool? show_debug_ui = null,
      bool? inspect_ignore_big_object = null) {
    builder.StartTable(2);
    Configuration.AddInspectIgnoreBigObject(builder, inspect_ignore_big_object);
    Configuration.AddShowDebugUi(builder, show_debug_ui);
    return Configuration.EndConfiguration(builder);
  }

  public static void StartConfiguration(FlatBufferBuilder builder) { builder.StartTable(2); }
  public static void AddShowDebugUi(FlatBufferBuilder builder, bool? showDebugUi) { builder.AddBool(0, showDebugUi); }
  public static void AddInspectIgnoreBigObject(FlatBufferBuilder builder, bool? inspectIgnoreBigObject) { builder.AddBool(1, inspectIgnoreBigObject); }
  public static Offset<Gamium.Protocol.Types.Configuration> EndConfiguration(FlatBufferBuilder builder) {
    int o = builder.EndTable();
    return new Offset<Gamium.Protocol.Types.Configuration>(o);
  }
  public ConfigurationT UnPack() {
    var _o = new ConfigurationT();
    this.UnPackTo(_o);
    return _o;
  }
  public void UnPackTo(ConfigurationT _o) {
    _o.ShowDebugUi = this.ShowDebugUi;
    _o.InspectIgnoreBigObject = this.InspectIgnoreBigObject;
  }
  public static Offset<Gamium.Protocol.Types.Configuration> Pack(FlatBufferBuilder builder, ConfigurationT _o) {
    if (_o == null) return default(Offset<Gamium.Protocol.Types.Configuration>);
    return CreateConfiguration(
      builder,
      _o.ShowDebugUi,
      _o.InspectIgnoreBigObject);
  }
}

public class ConfigurationT
{
  public bool? ShowDebugUi { get; set; }
  public bool? InspectIgnoreBigObject { get; set; }

  public ConfigurationT() {
    this.ShowDebugUi = null;
    this.InspectIgnoreBigObject = null;
  }
}


}
