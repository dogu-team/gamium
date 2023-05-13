// <auto-generated>
//  automatically generated by the FlatBuffers compiler, do not modify
// </auto-generated>

namespace Gamium.Protocol
{

public enum Result : byte
{
  NONE = 0,
  Packets_HelloResult = 1,
  Packets_QueryScreenResult = 2,
  Packets_FindObjectsResult = 3,
  Packets_QueryObjectInteractableResult = 4,
  Packets_ActionsResult = 5,
  Packets_ExecuteRpcResult = 6,
  Packets_InspectObjectOnScreenResult = 7,
  Packets_InspectObjectWithIdResult = 8,
  Packets_DumpObjectsHierarchyResult = 9,
  Packets_ChangeConfigurationResult = 10,
  Packets_QueryProfileResult = 11,
};

public class ResultUnion {
  public Result Type { get; set; }
  public object Value { get; set; }

  public ResultUnion() {
    this.Type = Result.NONE;
    this.Value = null;
  }

  public T As<T>() where T : class { return this.Value as T; }
  public Gamium.Protocol.Packets.HelloResultT AsPackets_HelloResult() { return this.As<Gamium.Protocol.Packets.HelloResultT>(); }
  public static ResultUnion FromPackets_HelloResult(Gamium.Protocol.Packets.HelloResultT _packets_helloresult) { return new ResultUnion{ Type = Result.Packets_HelloResult, Value = _packets_helloresult }; }
  public Gamium.Protocol.Packets.QueryScreenResultT AsPackets_QueryScreenResult() { return this.As<Gamium.Protocol.Packets.QueryScreenResultT>(); }
  public static ResultUnion FromPackets_QueryScreenResult(Gamium.Protocol.Packets.QueryScreenResultT _packets_queryscreenresult) { return new ResultUnion{ Type = Result.Packets_QueryScreenResult, Value = _packets_queryscreenresult }; }
  public Gamium.Protocol.Packets.FindObjectsResultT AsPackets_FindObjectsResult() { return this.As<Gamium.Protocol.Packets.FindObjectsResultT>(); }
  public static ResultUnion FromPackets_FindObjectsResult(Gamium.Protocol.Packets.FindObjectsResultT _packets_findobjectsresult) { return new ResultUnion{ Type = Result.Packets_FindObjectsResult, Value = _packets_findobjectsresult }; }
  public Gamium.Protocol.Packets.QueryObjectInteractableResultT AsPackets_QueryObjectInteractableResult() { return this.As<Gamium.Protocol.Packets.QueryObjectInteractableResultT>(); }
  public static ResultUnion FromPackets_QueryObjectInteractableResult(Gamium.Protocol.Packets.QueryObjectInteractableResultT _packets_queryobjectinteractableresult) { return new ResultUnion{ Type = Result.Packets_QueryObjectInteractableResult, Value = _packets_queryobjectinteractableresult }; }
  public Gamium.Protocol.Packets.ActionsResultT AsPackets_ActionsResult() { return this.As<Gamium.Protocol.Packets.ActionsResultT>(); }
  public static ResultUnion FromPackets_ActionsResult(Gamium.Protocol.Packets.ActionsResultT _packets_actionsresult) { return new ResultUnion{ Type = Result.Packets_ActionsResult, Value = _packets_actionsresult }; }
  public Gamium.Protocol.Packets.ExecuteRpcResultT AsPackets_ExecuteRpcResult() { return this.As<Gamium.Protocol.Packets.ExecuteRpcResultT>(); }
  public static ResultUnion FromPackets_ExecuteRpcResult(Gamium.Protocol.Packets.ExecuteRpcResultT _packets_executerpcresult) { return new ResultUnion{ Type = Result.Packets_ExecuteRpcResult, Value = _packets_executerpcresult }; }
  public Gamium.Protocol.Packets.InspectObjectOnScreenResultT AsPackets_InspectObjectOnScreenResult() { return this.As<Gamium.Protocol.Packets.InspectObjectOnScreenResultT>(); }
  public static ResultUnion FromPackets_InspectObjectOnScreenResult(Gamium.Protocol.Packets.InspectObjectOnScreenResultT _packets_inspectobjectonscreenresult) { return new ResultUnion{ Type = Result.Packets_InspectObjectOnScreenResult, Value = _packets_inspectobjectonscreenresult }; }
  public Gamium.Protocol.Packets.InspectObjectWithIdResultT AsPackets_InspectObjectWithIdResult() { return this.As<Gamium.Protocol.Packets.InspectObjectWithIdResultT>(); }
  public static ResultUnion FromPackets_InspectObjectWithIdResult(Gamium.Protocol.Packets.InspectObjectWithIdResultT _packets_inspectobjectwithidresult) { return new ResultUnion{ Type = Result.Packets_InspectObjectWithIdResult, Value = _packets_inspectobjectwithidresult }; }
  public Gamium.Protocol.Packets.DumpObjectsHierarchyResultT AsPackets_DumpObjectsHierarchyResult() { return this.As<Gamium.Protocol.Packets.DumpObjectsHierarchyResultT>(); }
  public static ResultUnion FromPackets_DumpObjectsHierarchyResult(Gamium.Protocol.Packets.DumpObjectsHierarchyResultT _packets_dumpobjectshierarchyresult) { return new ResultUnion{ Type = Result.Packets_DumpObjectsHierarchyResult, Value = _packets_dumpobjectshierarchyresult }; }
  public Gamium.Protocol.Packets.ChangeConfigurationResultT AsPackets_ChangeConfigurationResult() { return this.As<Gamium.Protocol.Packets.ChangeConfigurationResultT>(); }
  public static ResultUnion FromPackets_ChangeConfigurationResult(Gamium.Protocol.Packets.ChangeConfigurationResultT _packets_changeconfigurationresult) { return new ResultUnion{ Type = Result.Packets_ChangeConfigurationResult, Value = _packets_changeconfigurationresult }; }
  public Gamium.Protocol.Packets.QueryProfileResultT AsPackets_QueryProfileResult() { return this.As<Gamium.Protocol.Packets.QueryProfileResultT>(); }
  public static ResultUnion FromPackets_QueryProfileResult(Gamium.Protocol.Packets.QueryProfileResultT _packets_queryprofileresult) { return new ResultUnion{ Type = Result.Packets_QueryProfileResult, Value = _packets_queryprofileresult }; }

  public static int Pack(Google.FlatBuffers.FlatBufferBuilder builder, ResultUnion _o) {
    switch (_o.Type) {
      default: return 0;
      case Result.Packets_HelloResult: return Gamium.Protocol.Packets.HelloResult.Pack(builder, _o.AsPackets_HelloResult()).Value;
      case Result.Packets_QueryScreenResult: return Gamium.Protocol.Packets.QueryScreenResult.Pack(builder, _o.AsPackets_QueryScreenResult()).Value;
      case Result.Packets_FindObjectsResult: return Gamium.Protocol.Packets.FindObjectsResult.Pack(builder, _o.AsPackets_FindObjectsResult()).Value;
      case Result.Packets_QueryObjectInteractableResult: return Gamium.Protocol.Packets.QueryObjectInteractableResult.Pack(builder, _o.AsPackets_QueryObjectInteractableResult()).Value;
      case Result.Packets_ActionsResult: return Gamium.Protocol.Packets.ActionsResult.Pack(builder, _o.AsPackets_ActionsResult()).Value;
      case Result.Packets_ExecuteRpcResult: return Gamium.Protocol.Packets.ExecuteRpcResult.Pack(builder, _o.AsPackets_ExecuteRpcResult()).Value;
      case Result.Packets_InspectObjectOnScreenResult: return Gamium.Protocol.Packets.InspectObjectOnScreenResult.Pack(builder, _o.AsPackets_InspectObjectOnScreenResult()).Value;
      case Result.Packets_InspectObjectWithIdResult: return Gamium.Protocol.Packets.InspectObjectWithIdResult.Pack(builder, _o.AsPackets_InspectObjectWithIdResult()).Value;
      case Result.Packets_DumpObjectsHierarchyResult: return Gamium.Protocol.Packets.DumpObjectsHierarchyResult.Pack(builder, _o.AsPackets_DumpObjectsHierarchyResult()).Value;
      case Result.Packets_ChangeConfigurationResult: return Gamium.Protocol.Packets.ChangeConfigurationResult.Pack(builder, _o.AsPackets_ChangeConfigurationResult()).Value;
      case Result.Packets_QueryProfileResult: return Gamium.Protocol.Packets.QueryProfileResult.Pack(builder, _o.AsPackets_QueryProfileResult()).Value;
    }
  }
}


}