from gamium.Protocol.Packets.HelloResult import HelloResultT
from gamium.Protocol.Packets.HelloParam import HelloParamT
from gamium.Protocol.Request import RequestT
from gamium.Protocol.Param import Param
from gamium.gamium_service import GamiumService


class GamiumClient:
    def __init__(self, host: str, port: int):
        self._service = GamiumService(host, port)

    async def connect(self):
        await self._service.connect()

    async def hello(self) -> HelloResultT:
        req = RequestT()
        req.paramType = Param.Packets_HelloParam
        req.param = HelloParamT()
        return await self._service.request(req)
