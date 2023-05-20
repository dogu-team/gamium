from gamium.gamium_service import GamiumService


class GamiumClient:
    def __init__(self, host: str, port: int):
        self._service = GamiumService(host, port)

    async def connect(self):
        self._service.connect()
