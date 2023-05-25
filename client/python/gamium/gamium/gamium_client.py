import functools
import json
from typing import List, Optional
from gamium.condition.wait_condition import WaitCondition
from gamium.options.wait_options import WaitOptions
from gamium.utils.try_utils import TryResult, tryify
from gamium.utils.wait import wait_generic
from gamium.protocol.types import ObjectInfo

from gamium.options import FindObjectOptions, ExecuteRpcOptions, SendKeyOptions

from gamium.igamium_client import IGamiumClient
from gamium.locator.rpc_locator import RpcLocator
from gamium.object.player import Player
from gamium.ui.ui import UI
from gamium.actions.key_by import KeyBy
from gamium.actions.action_chain import ActionChain
from gamium.gamium_service import *
from gamium.errors.gamium_error import GamiumError
from gamium.internal.logger import Logger
from gamium.locator.locator import Locator

T = TypeVar("T")


class GamiumClient(IGamiumClient):
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

    def connect(self) -> None:
        self._logger.info("GamiumClient.connect")
        self._service.connect()

    def screen(self) -> QueryScreenResultT:
        self._logger.info("GamiumClient.screen")
        return self._service.request(create_query_screen())

    def hello(self) -> HelloResultT:
        self._logger.info("GamiumClient.hello")
        return self._service.request(create_hello())

    def profile(self) -> QueryProfileResultT:
        self._logger.info("GamiumClient.profile")
        return self._service.request(create_profile())

    def find(
        self,
        locator: Locator,
        options: Optional[FindObjectOptions] = FindObjectOptions(),
    ) -> ObjectInfo:
        infos = self.finds(locator, options)
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

    def finds(
        self,
        locator: Locator,
        options: Optional[FindObjectOptions] = FindObjectOptions(),
    ) -> List[ObjectInfo]:
        self._logger.info(f"GamiumClient.finds By: {locator.by}, str: {locator.str}")
        if locator.str is None or 0 == len(locator.str):
            raise GamiumError(
                ErrorCode.InvalidParameter,
                f"GamiumClient.finds By: {locator.by}, str: {locator.str} is invalid",
            )

        fbs_locator = ObjectLocatorT()
        fbs_locator.by = locator.by
        fbs_locator.str = locator.str
        res = self._service.request(create_find_objects(fbs_locator))

        time.sleep(options.delay_ms / 1000)
        infos = []
        for info in res.infos:
            infos.append(
                ObjectInfo(
                    info.path,
                    info.name,
                    info.type,
                    info.tag,
                    info.isActive,
                    info.screenPosition,
                    info.screenRectSize,
                    info.position,
                    info.rotation,
                    info.text,
                )
            )

        return infos

    def actions(self) -> ActionChain:
        return ActionChain(self._service)

    def send_key(self, by: KeyBy, options: Optional[SendKeyOptions] = SendKeyOptions()) -> None:
        self.send_keys([by], options)

    def send_keys(self, by_list: List[KeyBy], options: Optional[SendKeyOptions] = SendKeyOptions()) -> None:
        self._logger.info(f"GamiumClient.send_keys {[by.str for by in by_list]}")
        self.actions().send_keys(by_list, options).perform()

    def execute_rpc(
        self,
        locator: RpcLocator,
        option: Optional[ExecuteRpcOptions] = ExecuteRpcOptions(),
    ) -> any:
        self._logger.info(f"GamiumClient.execute_rpc By: {locator.by}, class: {locator.class_name}, target: {locator.target_name}")
        params: List[str] = []
        for param in locator.params:
            if option.cast_number_to_float:
                if isinstance(param, int):
                    params.append(str(float(param)))
                    continue
            params.append(str(param))
        res = self._service.request(create_execute_rpc(locator.by, locator.class_name, locator.target_name, params))
        if res.document is None:
            return None
        parsed = json.loads(res.document)
        return parsed

    def player(
        self,
        locator: Locator,
        options: Optional[FindObjectOptions] = FindObjectOptions(),
    ) -> Player:
        info = self.find(locator, options)
        return Player(self, self._service, info)

    def ui(self) -> UI:
        return UI(
            self,
            self._service,
        )

    def inspector(self):
        # TODO
        pass

    def sleep(self, ms: int) -> None:
        self._logger.info(f"GamiumClient.sleep {ms} ms")
        self.actions().sleep(ms).perform()

    def wait(
        self,
        condition: WaitCondition[T],
        options: Optional[WaitOptions] = WaitOptions(),
    ) -> T:
        return wait_generic(self, condition, options)

    def try_wait(
        self,
        condition: WaitCondition[T],
        options: Optional[WaitOptions] = WaitOptions(),
    ) -> TryResult[T]:
        return tryify(functools.partial(self.wait, condition, options))
