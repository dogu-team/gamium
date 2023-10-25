# automatically generated by the FlatBuffers compiler, do not modify

# namespace: Packets

import flatbuffers
from flatbuffers.compat import import_numpy
np = import_numpy()

class QueryScreenParam(object):
    __slots__ = ['_tab']

    @classmethod
    def GetRootAs(cls, buf, offset=0):
        n = flatbuffers.encode.Get(flatbuffers.packer.uoffset, buf, offset)
        x = QueryScreenParam()
        x.Init(buf, n + offset)
        return x

    @classmethod
    def GetRootAsQueryScreenParam(cls, buf, offset=0):
        """This method is deprecated. Please switch to GetRootAs."""
        return cls.GetRootAs(buf, offset)
    # QueryScreenParam
    def Init(self, buf, pos):
        self._tab = flatbuffers.table.Table(buf, pos)

def QueryScreenParamStart(builder): builder.StartObject(0)
def Start(builder):
    return QueryScreenParamStart(builder)
def QueryScreenParamEnd(builder): return builder.EndObject()
def End(builder):
    return QueryScreenParamEnd(builder)

class QueryScreenParamT(object):

    # QueryScreenParamT
    def __init__(self):
        pass

    @classmethod
    def InitFromBuf(cls, buf, pos):
        queryScreenParam = QueryScreenParam()
        queryScreenParam.Init(buf, pos)
        return cls.InitFromObj(queryScreenParam)

    @classmethod
    def InitFromPackedBuf(cls, buf, pos=0):
        n = flatbuffers.encode.Get(flatbuffers.packer.uoffset, buf, pos)
        return cls.InitFromBuf(buf, pos+n)

    @classmethod
    def InitFromObj(cls, queryScreenParam):
        x = QueryScreenParamT()
        x._UnPack(queryScreenParam)
        return x

    # QueryScreenParamT
    def _UnPack(self, queryScreenParam):
        if queryScreenParam is None:
            return

    # QueryScreenParamT
    def Pack(self, builder):
        QueryScreenParamStart(builder)
        queryScreenParam = QueryScreenParamEnd(builder)
        return queryScreenParam