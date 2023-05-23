from gamium.Protocol.Types.ObjectInfo import ObjectInfoT
from gamium.igamium_client import IGamiumClient
from gamium.gamium_service import GamiumService
from gamium.internal.logger import Logger
from gamium.locator.locator import Locator
from gamium.options.find_objects_options import FindObjectOptions


class UI:
    def __init__(self, client: IGamiumClient, service: GamiumService):
        self._client = client
        self._service = service

    async def find(
        self, locator: Locator, options: FindObjectOptions = FindObjectOptions()
    ) -> ObjectInfoT:
        return await self._client.find(locator, options)
