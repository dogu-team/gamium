# automatically generated by the FlatBuffers compiler, do not modify

# namespace: Packets

import flatbuffers
from flatbuffers.compat import import_numpy
np = import_numpy()

class ActionResult(object):
    __slots__ = ['_tab']

    @classmethod
    def GetRootAs(cls, buf, offset=0):
        n = flatbuffers.encode.Get(flatbuffers.packer.uoffset, buf, offset)
        x = ActionResult()
        x.Init(buf, n + offset)
        return x

    @classmethod
    def GetRootAsActionResult(cls, buf, offset=0):
        """This method is deprecated. Please switch to GetRootAs."""
        return cls.GetRootAs(buf, offset)
    # ActionResult
    def Init(self, buf, pos):
        self._tab = flatbuffers.table.Table(buf, pos)

    # ActionResult
    def Error(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(4))
        if o != 0:
            x = self._tab.Indirect(o + self._tab.Pos)
            from Gamium.Protocol.Types.ErrorResult import ErrorResult
            obj = ErrorResult()
            obj.Init(self._tab.Bytes, x)
            return obj
        return None

def ActionResultStart(builder): builder.StartObject(1)
def Start(builder):
    return ActionResultStart(builder)
def ActionResultAddError(builder, error): builder.PrependUOffsetTRelativeSlot(0, flatbuffers.number_types.UOffsetTFlags.py_type(error), 0)
def AddError(builder, error):
    return ActionResultAddError(builder, error)
def ActionResultEnd(builder): return builder.EndObject()
def End(builder):
    return ActionResultEnd(builder)
import Gamium.Protocol.Types.ErrorResult
try:
    from typing import Optional
except:
    pass

class ActionResultT(object):

    # ActionResultT
    def __init__(self):
        self.error = None  # type: Optional[Gamium.Protocol.Types.ErrorResult.ErrorResultT]

    @classmethod
    def InitFromBuf(cls, buf, pos):
        actionResult = ActionResult()
        actionResult.Init(buf, pos)
        return cls.InitFromObj(actionResult)

    @classmethod
    def InitFromPackedBuf(cls, buf, pos=0):
        n = flatbuffers.encode.Get(flatbuffers.packer.uoffset, buf, pos)
        return cls.InitFromBuf(buf, pos+n)

    @classmethod
    def InitFromObj(cls, actionResult):
        x = ActionResultT()
        x._UnPack(actionResult)
        return x

    # ActionResultT
    def _UnPack(self, actionResult):
        if actionResult is None:
            return
        if actionResult.Error() is not None:
            self.error = Gamium.Protocol.Types.ErrorResult.ErrorResultT.InitFromObj(actionResult.Error())

    # ActionResultT
    def Pack(self, builder):
        if self.error is not None:
            error = self.error.Pack(builder)
        ActionResultStart(builder)
        if self.error is not None:
            ActionResultAddError(builder, error)
        actionResult = ActionResultEnd(builder)
        return actionResult
