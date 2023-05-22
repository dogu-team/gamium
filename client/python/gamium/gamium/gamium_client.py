import asyncio
from typing import List, Optional
from gamium.actions.key_by import KeyBy
from gamium.options.send_key_options import SendKeyOptions
from gamium.actions.action_chain import ActionChain
from gamium.Protocol.Types.ObjectInfo import ObjectInfoT
from gamium.Protocol.Types.ErrorCode import ErrorCode
from gamium.Protocol.Packets.QueryProfileResult import QueryProfileResultT
from gamium.Protocol.Packets.QueryScreenResult import QueryScreenResultT
from gamium.Protocol.Packets.HelloResult import HelloResultT

from gamium.gamium_service import *
from gamium.errors.gamium_error import GamiumError
from gamium.internal.logger import Logger
from gamium.locator.locator import Locator
from gamium.options.find_objects_options import FindObjectOptions


class GamiumClient:
    def __init__(
        self,
        host: str,
        port: int,
        request_timeout_ms: int = 50000,
        printable: any = None,
    ):
        self._logger = Logger()
        if printable:
            self._logger.set_handler(printable)
        self._service = GamiumService(host, port, request_timeout_ms, self._logger)

    async def connect(self) -> None:
        self._logger.info("GamiumClient.connect")
        await self._service.connect()

    async def screen(self) -> QueryScreenResultT:
        self._logger.info("GamiumClient.screen")
        return await self._service.request(create_query_screen())

    async def hello(self) -> HelloResultT:
        self._logger.info("GamiumClient.hello")
        return await self._service.request(create_hello())

    async def profile(self) -> QueryProfileResultT:
        self._logger.info("GamiumClient.profile")
        return await self._service.request(create_profile())

    async def find(
        self, locator: Locator, options: Optional[FindObjectOptions] = FindObjectOptions()
    ) -> ObjectInfoT:
        infos = await self.finds(locator, options)
        if 0 == len(infos):
            raise GamiumError(
                ErrorCode.NotFound,
                f"GamiumClient.find By: {locator.by}, str: {locator.str} not found",
            )
        if None == infos[0]:
            raise GamiumError(
                ErrorCode.NotFound,
                f"GamiumClient.find By: {locator.by}, str: {locator.str} not found",
            )
        return infos[0]

    async def finds(
        self, locator: Locator, options: Optional[FindObjectOptions] = FindObjectOptions()
    ) -> List[ObjectInfoT]:
        self._logger.info(f"GamiumClient.finds By: {locator.by}, str: {locator.str}")
        if locator.str is None or 0 == len(locator.str):
            raise GamiumError(
                ErrorCode.InvalidParameter,
                f"GamiumClient.finds By: {locator.by}, str: {locator.str} is invalid",
            )

        fbs_locator = ObjectLocatorT()
        fbs_locator.by = locator.by
        fbs_locator.str = locator.str
        res = await self._service.request(create_find_objects(fbs_locator))

        await asyncio.sleep(options.delay_ms / 1000)

        return res.infos

    def actions(self) -> ActionChain:
        return ActionChain(self._service)

    async def send_keys(
        self, by_list: List[KeyBy], options: Optional[SendKeyOptions] = SendKeyOptions()
    ) -> None:
        self._logger.info(f"GamiumClient.send_keys {by_list}")
        await self.actions().send_keys(by_list, options).perform()
