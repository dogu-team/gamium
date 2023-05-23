from client.python.gamium.gamium.gamium_client import GamiumClient
from client.python.gamium.gamium.gamium_service import GamiumService
from client.python.gamium.gamium.internal.logger import Logger
from client.python.gamium.gamium.locator.locator import Locator
from client.python.gamium.gamium.options.find_objects_options import FindObjectOptions


class UI:
    def __init__(self, client: GamiumClient, service: GamiumService, logger: Logger):
        self._client = client
        self._service = service
        self._logger = logger

    async def find(
        self, locator: Locator, options: FindObjectOptions = FindObjectOptions()
    ) -> ObjectInfoT:
        return await self._client.find(locator, options)
