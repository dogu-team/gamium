# automatically generated by the FlatBuffers compiler, do not modify

# namespace: Packets

import flatbuffers
from flatbuffers.compat import import_numpy
np = import_numpy()

class ExecuteRpcResult(object):
    __slots__ = ['_tab']

    @classmethod
    def GetRootAs(cls, buf, offset=0):
        n = flatbuffers.encode.Get(flatbuffers.packer.uoffset, buf, offset)
        x = ExecuteRpcResult()
        x.Init(buf, n + offset)
        return x

    @classmethod
    def GetRootAsExecuteRpcResult(cls, buf, offset=0):
        """This method is deprecated. Please switch to GetRootAs."""
        return cls.GetRootAs(buf, offset)
    # ExecuteRpcResult
    def Init(self, buf, pos):
        self._tab = flatbuffers.table.Table(buf, pos)

    # ExecuteRpcResult
    def Document(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(4))
        if o != 0:
            return self._tab.String(o + self._tab.Pos)
        return None

def ExecuteRpcResultStart(builder): builder.StartObject(1)
def Start(builder):
    return ExecuteRpcResultStart(builder)
def ExecuteRpcResultAddDocument(builder, document): builder.PrependUOffsetTRelativeSlot(0, flatbuffers.number_types.UOffsetTFlags.py_type(document), 0)
def AddDocument(builder, document):
    return ExecuteRpcResultAddDocument(builder, document)
def ExecuteRpcResultEnd(builder): return builder.EndObject()
def End(builder):
    return ExecuteRpcResultEnd(builder)

class ExecuteRpcResultT(object):

    # ExecuteRpcResultT
    def __init__(self):
        self.document = None  # type: str

    @classmethod
    def InitFromBuf(cls, buf, pos):
        executeRpcResult = ExecuteRpcResult()
        executeRpcResult.Init(buf, pos)
        return cls.InitFromObj(executeRpcResult)

    @classmethod
    def InitFromPackedBuf(cls, buf, pos=0):
        n = flatbuffers.encode.Get(flatbuffers.packer.uoffset, buf, pos)
        return cls.InitFromBuf(buf, pos+n)

    @classmethod
    def InitFromObj(cls, executeRpcResult):
        x = ExecuteRpcResultT()
        x._UnPack(executeRpcResult)
        return x

    # ExecuteRpcResultT
    def _UnPack(self, executeRpcResult):
        if executeRpcResult is None:
            return
        self.document = executeRpcResult.Document()

    # ExecuteRpcResultT
    def Pack(self, builder):
        if self.document is not None:
            document = builder.CreateString(self.document)
        ExecuteRpcResultStart(builder)
        if self.document is not None:
            ExecuteRpcResultAddDocument(builder, document)
        executeRpcResult = ExecuteRpcResultEnd(builder)
        return executeRpcResult
