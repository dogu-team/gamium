# automatically generated by the FlatBuffers compiler, do not modify

# namespace: Packets

import flatbuffers
from flatbuffers.compat import import_numpy
np = import_numpy()

class DumpObjectsHierarchyResult(object):
    __slots__ = ['_tab']

    @classmethod
    def GetRootAs(cls, buf, offset=0):
        n = flatbuffers.encode.Get(flatbuffers.packer.uoffset, buf, offset)
        x = DumpObjectsHierarchyResult()
        x.Init(buf, n + offset)
        return x

    @classmethod
    def GetRootAsDumpObjectsHierarchyResult(cls, buf, offset=0):
        """This method is deprecated. Please switch to GetRootAs."""
        return cls.GetRootAs(buf, offset)
    # DumpObjectsHierarchyResult
    def Init(self, buf, pos):
        self._tab = flatbuffers.table.Table(buf, pos)

    # DumpObjectsHierarchyResult
    def Hierarchies(self, j):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(4))
        if o != 0:
            x = self._tab.Vector(o)
            x += flatbuffers.number_types.UOffsetTFlags.py_type(j) * 4
            x = self._tab.Indirect(x)
            from Gamium.Protocol.Types.ObjectsHierarchy import ObjectsHierarchy
            obj = ObjectsHierarchy()
            obj.Init(self._tab.Bytes, x)
            return obj
        return None

    # DumpObjectsHierarchyResult
    def HierarchiesLength(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(4))
        if o != 0:
            return self._tab.VectorLen(o)
        return 0

    # DumpObjectsHierarchyResult
    def HierarchiesIsNone(self):
        o = flatbuffers.number_types.UOffsetTFlags.py_type(self._tab.Offset(4))
        return o == 0

def DumpObjectsHierarchyResultStart(builder): builder.StartObject(1)
def Start(builder):
    return DumpObjectsHierarchyResultStart(builder)
def DumpObjectsHierarchyResultAddHierarchies(builder, hierarchies): builder.PrependUOffsetTRelativeSlot(0, flatbuffers.number_types.UOffsetTFlags.py_type(hierarchies), 0)
def AddHierarchies(builder, hierarchies):
    return DumpObjectsHierarchyResultAddHierarchies(builder, hierarchies)
def DumpObjectsHierarchyResultStartHierarchiesVector(builder, numElems): return builder.StartVector(4, numElems, 4)
def StartHierarchiesVector(builder, numElems):
    return DumpObjectsHierarchyResultStartHierarchiesVector(builder, numElems)
def DumpObjectsHierarchyResultEnd(builder): return builder.EndObject()
def End(builder):
    return DumpObjectsHierarchyResultEnd(builder)
import Gamium.Protocol.Types.ObjectsHierarchy
try:
    from typing import List
except:
    pass

class DumpObjectsHierarchyResultT(object):

    # DumpObjectsHierarchyResultT
    def __init__(self):
        self.hierarchies = None  # type: List[Gamium.Protocol.Types.ObjectsHierarchy.ObjectsHierarchyT]

    @classmethod
    def InitFromBuf(cls, buf, pos):
        dumpObjectsHierarchyResult = DumpObjectsHierarchyResult()
        dumpObjectsHierarchyResult.Init(buf, pos)
        return cls.InitFromObj(dumpObjectsHierarchyResult)

    @classmethod
    def InitFromPackedBuf(cls, buf, pos=0):
        n = flatbuffers.encode.Get(flatbuffers.packer.uoffset, buf, pos)
        return cls.InitFromBuf(buf, pos+n)

    @classmethod
    def InitFromObj(cls, dumpObjectsHierarchyResult):
        x = DumpObjectsHierarchyResultT()
        x._UnPack(dumpObjectsHierarchyResult)
        return x

    # DumpObjectsHierarchyResultT
    def _UnPack(self, dumpObjectsHierarchyResult):
        if dumpObjectsHierarchyResult is None:
            return
        if not dumpObjectsHierarchyResult.HierarchiesIsNone():
            self.hierarchies = []
            for i in range(dumpObjectsHierarchyResult.HierarchiesLength()):
                if dumpObjectsHierarchyResult.Hierarchies(i) is None:
                    self.hierarchies.append(None)
                else:
                    objectsHierarchy_ = Gamium.Protocol.Types.ObjectsHierarchy.ObjectsHierarchyT.InitFromObj(dumpObjectsHierarchyResult.Hierarchies(i))
                    self.hierarchies.append(objectsHierarchy_)

    # DumpObjectsHierarchyResultT
    def Pack(self, builder):
        if self.hierarchies is not None:
            hierarchieslist = []
            for i in range(len(self.hierarchies)):
                hierarchieslist.append(self.hierarchies[i].Pack(builder))
            DumpObjectsHierarchyResultStartHierarchiesVector(builder, len(self.hierarchies))
            for i in reversed(range(len(self.hierarchies))):
                builder.PrependUOffsetTRelative(hierarchieslist[i])
            hierarchies = builder.EndVector()
        DumpObjectsHierarchyResultStart(builder)
        if self.hierarchies is not None:
            DumpObjectsHierarchyResultAddHierarchies(builder, hierarchies)
        dumpObjectsHierarchyResult = DumpObjectsHierarchyResultEnd(builder)
        return dumpObjectsHierarchyResult
