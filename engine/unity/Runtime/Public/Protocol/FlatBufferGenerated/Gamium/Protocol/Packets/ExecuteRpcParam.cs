// <auto-generated>
//  automatically generated by the FlatBuffers compiler, do not modify
// </auto-generated>

namespace Gamium.Protocol.Packets
{

using global::System;
using global::System.Collections.Generic;
using global::Google.FlatBuffers;

public struct ExecuteRpcParam : IFlatbufferObject
{
  private Table __p;
  public ByteBuffer ByteBuffer { get { return __p.bb; } }
  public static void ValidateVersion() { FlatBufferConstants.FLATBUFFERS_22_10_26(); }
  public static ExecuteRpcParam GetRootAsExecuteRpcParam(ByteBuffer _bb) { return GetRootAsExecuteRpcParam(_bb, new ExecuteRpcParam()); }
  public static ExecuteRpcParam GetRootAsExecuteRpcParam(ByteBuffer _bb, ExecuteRpcParam obj) { return (obj.__assign(_bb.GetInt(_bb.Position) + _bb.Position, _bb)); }
  public void __init(int _i, ByteBuffer _bb) { __p = new Table(_i, _bb); }
  public ExecuteRpcParam __assign(int _i, ByteBuffer _bb) { __init(_i, _bb); return this; }

  public Gamium.Protocol.Types.ExecuteRpcBy By { get { int o = __p.__offset(4); return o != 0 ? (Gamium.Protocol.Types.ExecuteRpcBy)__p.bb.GetShort(o + __p.bb_pos) : Gamium.Protocol.Types.ExecuteRpcBy.Method; } }
  public string ClassName { get { int o = __p.__offset(6); return o != 0 ? __p.__string(o + __p.bb_pos) : null; } }
#if ENABLE_SPAN_T
  public Span<byte> GetClassNameBytes() { return __p.__vector_as_span<byte>(6, 1); }
#else
  public ArraySegment<byte>? GetClassNameBytes() { return __p.__vector_as_arraysegment(6); }
#endif
  public byte[] GetClassNameArray() { return __p.__vector_as_array<byte>(6); }
  public string TargetName { get { int o = __p.__offset(8); return o != 0 ? __p.__string(o + __p.bb_pos) : null; } }
#if ENABLE_SPAN_T
  public Span<byte> GetTargetNameBytes() { return __p.__vector_as_span<byte>(8, 1); }
#else
  public ArraySegment<byte>? GetTargetNameBytes() { return __p.__vector_as_arraysegment(8); }
#endif
  public byte[] GetTargetNameArray() { return __p.__vector_as_array<byte>(8); }
  public string ParamDocuments(int j) { int o = __p.__offset(10); return o != 0 ? __p.__string(__p.__vector(o) + j * 4) : null; }
  public int ParamDocumentsLength { get { int o = __p.__offset(10); return o != 0 ? __p.__vector_len(o) : 0; } }

  public static Offset<Gamium.Protocol.Packets.ExecuteRpcParam> CreateExecuteRpcParam(FlatBufferBuilder builder,
      Gamium.Protocol.Types.ExecuteRpcBy by = Gamium.Protocol.Types.ExecuteRpcBy.Method,
      StringOffset class_nameOffset = default(StringOffset),
      StringOffset target_nameOffset = default(StringOffset),
      VectorOffset param_documentsOffset = default(VectorOffset)) {
    builder.StartTable(4);
    ExecuteRpcParam.AddParamDocuments(builder, param_documentsOffset);
    ExecuteRpcParam.AddTargetName(builder, target_nameOffset);
    ExecuteRpcParam.AddClassName(builder, class_nameOffset);
    ExecuteRpcParam.AddBy(builder, by);
    return ExecuteRpcParam.EndExecuteRpcParam(builder);
  }

  public static void StartExecuteRpcParam(FlatBufferBuilder builder) { builder.StartTable(4); }
  public static void AddBy(FlatBufferBuilder builder, Gamium.Protocol.Types.ExecuteRpcBy by) { builder.AddShort(0, (short)by, 0); }
  public static void AddClassName(FlatBufferBuilder builder, StringOffset classNameOffset) { builder.AddOffset(1, classNameOffset.Value, 0); }
  public static void AddTargetName(FlatBufferBuilder builder, StringOffset targetNameOffset) { builder.AddOffset(2, targetNameOffset.Value, 0); }
  public static void AddParamDocuments(FlatBufferBuilder builder, VectorOffset paramDocumentsOffset) { builder.AddOffset(3, paramDocumentsOffset.Value, 0); }
  public static VectorOffset CreateParamDocumentsVector(FlatBufferBuilder builder, StringOffset[] data) { builder.StartVector(4, data.Length, 4); for (int i = data.Length - 1; i >= 0; i--) builder.AddOffset(data[i].Value); return builder.EndVector(); }
  public static VectorOffset CreateParamDocumentsVectorBlock(FlatBufferBuilder builder, StringOffset[] data) { builder.StartVector(4, data.Length, 4); builder.Add(data); return builder.EndVector(); }
  public static VectorOffset CreateParamDocumentsVectorBlock(FlatBufferBuilder builder, ArraySegment<StringOffset> data) { builder.StartVector(4, data.Count, 4); builder.Add(data); return builder.EndVector(); }
  public static VectorOffset CreateParamDocumentsVectorBlock(FlatBufferBuilder builder, IntPtr dataPtr, int sizeInBytes) { builder.StartVector(1, sizeInBytes, 1); builder.Add<StringOffset>(dataPtr, sizeInBytes); return builder.EndVector(); }
  public static void StartParamDocumentsVector(FlatBufferBuilder builder, int numElems) { builder.StartVector(4, numElems, 4); }
  public static Offset<Gamium.Protocol.Packets.ExecuteRpcParam> EndExecuteRpcParam(FlatBufferBuilder builder) {
    int o = builder.EndTable();
    return new Offset<Gamium.Protocol.Packets.ExecuteRpcParam>(o);
  }
  public ExecuteRpcParamT UnPack() {
    var _o = new ExecuteRpcParamT();
    this.UnPackTo(_o);
    return _o;
  }
  public void UnPackTo(ExecuteRpcParamT _o) {
    _o.By = this.By;
    _o.ClassName = this.ClassName;
    _o.TargetName = this.TargetName;
    _o.ParamDocuments = new List<string>();
    for (var _j = 0; _j < this.ParamDocumentsLength; ++_j) {_o.ParamDocuments.Add(this.ParamDocuments(_j));}
  }
  public static Offset<Gamium.Protocol.Packets.ExecuteRpcParam> Pack(FlatBufferBuilder builder, ExecuteRpcParamT _o) {
    if (_o == null) return default(Offset<Gamium.Protocol.Packets.ExecuteRpcParam>);
    var _class_name = _o.ClassName == null ? default(StringOffset) : builder.CreateString(_o.ClassName);
    var _target_name = _o.TargetName == null ? default(StringOffset) : builder.CreateString(_o.TargetName);
    var _param_documents = default(VectorOffset);
    if (_o.ParamDocuments != null) {
      var __param_documents = new StringOffset[_o.ParamDocuments.Count];
      for (var _j = 0; _j < __param_documents.Length; ++_j) { __param_documents[_j] = builder.CreateString(_o.ParamDocuments[_j]); }
      _param_documents = CreateParamDocumentsVector(builder, __param_documents);
    }
    return CreateExecuteRpcParam(
      builder,
      _o.By,
      _class_name,
      _target_name,
      _param_documents);
  }
}

public class ExecuteRpcParamT
{
  public Gamium.Protocol.Types.ExecuteRpcBy By { get; set; }
  public string ClassName { get; set; }
  public string TargetName { get; set; }
  public List<string> ParamDocuments { get; set; }

  public ExecuteRpcParamT() {
    this.By = Gamium.Protocol.Types.ExecuteRpcBy.Method;
    this.ClassName = null;
    this.TargetName = null;
    this.ParamDocuments = null;
  }
}


}
