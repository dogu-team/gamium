# automatically generated by the FlatBuffers compiler, do not modify

# namespace: Packets

import flatbuffers
from flatbuffers.compat import import_numpy
np = import_numpy()

class FindObjectsResult(object):
    __slots__ = ['_tab']

    @classmethod
    def GetRootAs(cls, buf, offset=0):
        n = flatbuffers.encode.Get(flatbuffers.packer.uoffset, buf, offset)
        x = FindObjectsResult()
        x.Init(buf, n + offset)
        return x

    @classmethod
    def GetRootAsFindObjectsResult(cls, buf, offset=0):
        """This method is deprecated. Please switch to GetRootAs."""
        return cls.GetRootAs(buf, offset)
    # FindObjectsResult
    def Init(self, buf, pos):
        self._tab = flatbuffers.table.Table(buf, pos)

    # FindObjectsResult
    def Infos(self, j):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(4))
        if o != 0:
            x = self._tab.Vector(o)
            x += flatbuffers.number_types.UOffsetTFlags.py_type(j) * 4
            x = self._tab.Indirect(x)
            from gamium.protocol.generated.Types.ObjectInfo import ObjectInfo
            obj = ObjectInfo()
            obj.Init(self._tab.Bytes, x)
            return obj
        return None

    # FindObjectsResult
    def InfosLength(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(4))
        if o != 0:
            return self._tab.VectorLen(o)
        return 0

    # FindObjectsResult
    def InfosIsNone(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(4))
        return o == 0

def FindObjectsResultStart(builder): builder.StartObject(1)
def Start(builder):
    return FindObjectsResultStart(builder)
def FindObjectsResultAddInfos(builder, infos): builder.PrependUOffsetTRelativeSlot(0, flatbuffers.number_types.UOffsetTFlags.py_type(infos), 0)
def AddInfos(builder, infos):
    return FindObjectsResultAddInfos(builder, infos)
def FindObjectsResultStartInfosVector(builder, numElems): return builder.StartVector(4, numElems, 4)
def StartInfosVector(builder, numElems):
    return FindObjectsResultStartInfosVector(builder, numElems)
def FindObjectsResultEnd(builder): return builder.EndObject()
def End(builder):
    return FindObjectsResultEnd(builder)
import gamium.protocol.generated.Types.ObjectInfo
try:
    from typing import List
except:
    pass

class FindObjectsResultT(object):

    # FindObjectsResultT
    def __init__(self):
        self.infos = None  # type: List[gamium.protocol.generated.Types.ObjectInfo.ObjectInfoT]

    @classmethod
    def InitFromBuf(cls, buf, pos):
        findObjectsResult = FindObjectsResult()
        findObjectsResult.Init(buf, pos)
        return cls.InitFromObj(findObjectsResult)

    @classmethod
    def InitFromPackedBuf(cls, buf, pos=0):
        n = flatbuffers.encode.Get(flatbuffers.packer.uoffset, buf, pos)
        return cls.InitFromBuf(buf, pos+n)

    @classmethod
    def InitFromObj(cls, findObjectsResult):
        x = FindObjectsResultT()
        x._UnPack(findObjectsResult)
        return x

    # FindObjectsResultT
    def _UnPack(self, findObjectsResult):
        if findObjectsResult is None:
            return
        if not findObjectsResult.InfosIsNone():
            self.infos = []
            for i in range(findObjectsResult.InfosLength()):
                if findObjectsResult.Infos(i) is None:
                    self.infos.append(None)
                else:
                    objectInfo_ = gamium.protocol.generated.Types.ObjectInfo.ObjectInfoT.InitFromObj(findObjectsResult.Infos(i))
                    self.infos.append(objectInfo_)

    # FindObjectsResultT
    def Pack(self, builder):
        if self.infos is not None:
            infoslist = []
            for i in range(len(self.infos)):
                infoslist.append(self.infos[i].Pack(builder))
            FindObjectsResultStartInfosVector(builder, len(self.infos))
            for i in reversed(range(len(self.infos))):
                builder.PrependUOffsetTRelative(infoslist[i])
            infos = builder.EndVector()
        FindObjectsResultStart(builder)
        if self.infos is not None:
            FindObjectsResultAddInfos(builder, infos)
        findObjectsResult = FindObjectsResultEnd(builder)
        return findObjectsResult
