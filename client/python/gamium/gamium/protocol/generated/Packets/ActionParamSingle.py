# automatically generated by the FlatBuffers compiler, do not modify

# namespace: Packets

import flatbuffers
from flatbuffers.compat import import_numpy
np = import_numpy()

class ActionParamSingle(object):
    __slots__ = ['_tab']

    @classmethod
    def GetRootAs(cls, buf, offset=0):
        n = flatbuffers.encode.Get(flatbuffers.packer.uoffset, buf, offset)
        x = ActionParamSingle()
        x.Init(buf, n + offset)
        return x

    @classmethod
    def GetRootAsActionParamSingle(cls, buf, offset=0):
        """This method is deprecated. Please switch to GetRootAs."""
        return cls.GetRootAs(buf, offset)
    # ActionParamSingle
    def Init(self, buf, pos):
        self._tab = flatbuffers.table.Table(buf, pos)

    # ActionParamSingle
    def ActionType(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(4))
        if o != 0:
            return self._tab.Get(flatbuffers.number_types.Uint8Flags, o + self._tab.Pos)
        return 0

    # ActionParamSingle
    def Action(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(6))
        if o != 0:
            from flatbuffers.table import Table
            obj = Table(bytearray(), 0)
            self._tab.Union(obj, o)
            return obj
        return None

def ActionParamSingleStart(builder): builder.StartObject(2)
def Start(builder):
    return ActionParamSingleStart(builder)
def ActionParamSingleAddActionType(builder, actionType): builder.PrependUint8Slot(0, actionType, 0)
def AddActionType(builder, actionType):
    return ActionParamSingleAddActionType(builder, actionType)
def ActionParamSingleAddAction(builder, action): builder.PrependUOffsetTRelativeSlot(1, flatbuffers.number_types.UOffsetTFlags.py_type(action), 0)
def AddAction(builder, action):
    return ActionParamSingleAddAction(builder, action)
def ActionParamSingleEnd(builder): return builder.EndObject()
def End(builder):
    return ActionParamSingleEnd(builder)
import gamium.protocol.generated.Packets.ActionParam
import gamium.protocol.generated.Packets.Actions.AppQuitParam
import gamium.protocol.generated.Packets.Actions.InputKeyParam
import gamium.protocol.generated.Packets.Actions.InputMouseParam
import gamium.protocol.generated.Packets.Actions.InputSetTextParam
import gamium.protocol.generated.Packets.Actions.MovePlayerParam
import gamium.protocol.generated.Packets.Actions.SleepParam
try:
    from typing import Union
except:
    pass

class ActionParamSingleT(object):

    # ActionParamSingleT
    def __init__(self):
        self.actionType = 0  # type: int
        self.action = None  # type: Union[None, gamium.protocol.generated.Packets.Actions.SleepParam.SleepParamT, gamium.protocol.generated.Packets.Actions.InputKeyParam.InputKeyParamT, gamium.protocol.generated.Packets.Actions.InputMouseParam.InputMouseParamT, gamium.protocol.generated.Packets.Actions.InputSetTextParam.InputSetTextParamT, gamium.protocol.generated.Packets.Actions.MovePlayerParam.MovePlayerParamT, gamium.protocol.generated.Packets.Actions.AppQuitParam.AppQuitParamT]

    @classmethod
    def InitFromBuf(cls, buf, pos):
        actionParamSingle = ActionParamSingle()
        actionParamSingle.Init(buf, pos)
        return cls.InitFromObj(actionParamSingle)

    @classmethod
    def InitFromPackedBuf(cls, buf, pos=0):
        n = flatbuffers.encode.Get(flatbuffers.packer.uoffset, buf, pos)
        return cls.InitFromBuf(buf, pos+n)

    @classmethod
    def InitFromObj(cls, actionParamSingle):
        x = ActionParamSingleT()
        x._UnPack(actionParamSingle)
        return x

    # ActionParamSingleT
    def _UnPack(self, actionParamSingle):
        if actionParamSingle is None:
            return
        self.actionType = actionParamSingle.ActionType()
        self.action = gamium.protocol.generated.Packets.ActionParam.ActionParamCreator(self.actionType, actionParamSingle.Action())

    # ActionParamSingleT
    def Pack(self, builder):
        if self.action is not None:
            action = self.action.Pack(builder)
        ActionParamSingleStart(builder)
        ActionParamSingleAddActionType(builder, self.actionType)
        if self.action is not None:
            ActionParamSingleAddAction(builder, action)
        actionParamSingle = ActionParamSingleEnd(builder)
        return actionParamSingle
