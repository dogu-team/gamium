# automatically generated by the FlatBuffers compiler, do not modify

# namespace: Protocol

class Result(object):
    NONE = 0
    Packets_HelloResult = 1
    Packets_QueryScreenResult = 2
    Packets_FindObjectsResult = 3
    Packets_QueryObjectInteractableResult = 4
    Packets_ActionsResult = 5
    Packets_ExecuteRpcResult = 6
    Packets_InspectObjectOnScreenResult = 7
    Packets_InspectObjectWithIdResult = 8
    Packets_DumpObjectsHierarchyResult = 9
    Packets_ChangeConfigurationResult = 10
    Packets_QueryProfileResult = 11

def ResultCreator(unionType, table):
    from flatbuffers.table import Table
    if not isinstance(table, Table):
        return None
    if unionType == Result().Packets_HelloResult:
        import gamium.Protocol.Packets.HelloResult
        return gamium.Protocol.Packets.HelloResult.HelloResultT.InitFromBuf(table.Bytes, table.Pos)
    if unionType == Result().Packets_QueryScreenResult:
        import gamium.Protocol.Packets.QueryScreenResult
        return gamium.Protocol.Packets.QueryScreenResult.QueryScreenResultT.InitFromBuf(table.Bytes, table.Pos)
    if unionType == Result().Packets_FindObjectsResult:
        import gamium.Protocol.Packets.FindObjectsResult
        return gamium.Protocol.Packets.FindObjectsResult.FindObjectsResultT.InitFromBuf(table.Bytes, table.Pos)
    if unionType == Result().Packets_QueryObjectInteractableResult:
        import gamium.Protocol.Packets.QueryObjectInteractableResult
        return gamium.Protocol.Packets.QueryObjectInteractableResult.QueryObjectInteractableResultT.InitFromBuf(table.Bytes, table.Pos)
    if unionType == Result().Packets_ActionsResult:
        import gamium.Protocol.Packets.ActionsResult
        return gamium.Protocol.Packets.ActionsResult.ActionsResultT.InitFromBuf(table.Bytes, table.Pos)
    if unionType == Result().Packets_ExecuteRpcResult:
        import gamium.Protocol.Packets.ExecuteRpcResult
        return gamium.Protocol.Packets.ExecuteRpcResult.ExecuteRpcResultT.InitFromBuf(table.Bytes, table.Pos)
    if unionType == Result().Packets_InspectObjectOnScreenResult:
        import gamium.Protocol.Packets.InspectObjectOnScreenResult
        return gamium.Protocol.Packets.InspectObjectOnScreenResult.InspectObjectOnScreenResultT.InitFromBuf(table.Bytes, table.Pos)
    if unionType == Result().Packets_InspectObjectWithIdResult:
        import gamium.Protocol.Packets.InspectObjectWithIdResult
        return gamium.Protocol.Packets.InspectObjectWithIdResult.InspectObjectWithIdResultT.InitFromBuf(table.Bytes, table.Pos)
    if unionType == Result().Packets_DumpObjectsHierarchyResult:
        import gamium.Protocol.Packets.DumpObjectsHierarchyResult
        return gamium.Protocol.Packets.DumpObjectsHierarchyResult.DumpObjectsHierarchyResultT.InitFromBuf(table.Bytes, table.Pos)
    if unionType == Result().Packets_ChangeConfigurationResult:
        import gamium.Protocol.Packets.ChangeConfigurationResult
        return gamium.Protocol.Packets.ChangeConfigurationResult.ChangeConfigurationResultT.InitFromBuf(table.Bytes, table.Pos)
    if unionType == Result().Packets_QueryProfileResult:
        import gamium.Protocol.Packets.QueryProfileResult
        return gamium.Protocol.Packets.QueryProfileResult.QueryProfileResultT.InitFromBuf(table.Bytes, table.Pos)
    return None