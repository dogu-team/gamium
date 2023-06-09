# automatically generated by the FlatBuffers compiler, do not modify

# namespace: Actions

import flatbuffers
from flatbuffers.compat import import_numpy
np = import_numpy()

class InputSetTextParam(object):
    __slots__ = ['_tab']

    @classmethod
    def GetRootAs(cls, buf, offset=0):
        n = flatbuffers.encode.Get(flatbuffers.packer.uoffset, buf, offset)
        x = InputSetTextParam()
        x.Init(buf, n + offset)
        return x

    @classmethod
    def GetRootAsInputSetTextParam(cls, buf, offset=0):
        """This method is deprecated. Please switch to GetRootAs."""
        return cls.GetRootAs(buf, offset)
    # InputSetTextParam
    def Init(self, buf, pos):
        self._tab = flatbuffers.table.Table(buf, pos)

    # InputSetTextParam
    def ObjectId(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(4))
        if o != 0:
            return self._tab.String(o + self._tab.Pos)
        return None

    # InputSetTextParam
    def Text(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(6))
        if o != 0:
            return self._tab.String(o + self._tab.Pos)
        return None

def InputSetTextParamStart(builder): builder.StartObject(2)
def Start(builder):
    return InputSetTextParamStart(builder)
def InputSetTextParamAddObjectId(builder, objectId): builder.PrependUOffsetTRelativeSlot(0, flatbuffers.number_types.UOffsetTFlags.py_type(objectId), 0)
def AddObjectId(builder, objectId):
    return InputSetTextParamAddObjectId(builder, objectId)
def InputSetTextParamAddText(builder, text): builder.PrependUOffsetTRelativeSlot(1, flatbuffers.number_types.UOffsetTFlags.py_type(text), 0)
def AddText(builder, text):
    return InputSetTextParamAddText(builder, text)
def InputSetTextParamEnd(builder): return builder.EndObject()
def End(builder):
    return InputSetTextParamEnd(builder)

class InputSetTextParamT(object):

    # InputSetTextParamT
    def __init__(self):
        self.objectId = None  # type: str
        self.text = None  # type: str

    @classmethod
    def InitFromBuf(cls, buf, pos):
        inputSetTextParam = InputSetTextParam()
        inputSetTextParam.Init(buf, pos)
        return cls.InitFromObj(inputSetTextParam)

    @classmethod
    def InitFromPackedBuf(cls, buf, pos=0):
        n = flatbuffers.encode.Get(flatbuffers.packer.uoffset, buf, pos)
        return cls.InitFromBuf(buf, pos+n)

    @classmethod
    def InitFromObj(cls, inputSetTextParam):
        x = InputSetTextParamT()
        x._UnPack(inputSetTextParam)
        return x

    # InputSetTextParamT
    def _UnPack(self, inputSetTextParam):
        if inputSetTextParam is None:
            return
        self.objectId = inputSetTextParam.ObjectId()
        self.text = inputSetTextParam.Text()

    # InputSetTextParamT
    def Pack(self, builder):
        if self.objectId is not None:
            objectId = builder.CreateString(self.objectId)
        if self.text is not None:
            text = builder.CreateString(self.text)
        InputSetTextParamStart(builder)
        if self.objectId is not None:
            InputSetTextParamAddObjectId(builder, objectId)
        if self.text is not None:
            InputSetTextParamAddText(builder, text)
        inputSetTextParam = InputSetTextParamEnd(builder)
        return inputSetTextParam
