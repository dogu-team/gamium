import functools
import json
import time
from typing import Any, List, Optional
from gamium.condition.wait_condition import WaitCondition
from gamium.options.wait_options import WaitOptions
from gamium.protocol.generated.Types import ErrorCode
from gamium.utils.generics import T
from gamium.utils.try_utils import TryResult, tryify
from gamium.utils.wait import wait_generic
from gamium.protocol.types import ObjectInfo, Vector2, Vector3, Vector4

from gamium.options import FindObjectOptions, ExecuteRpcOptions, SendKeyOptions

from gamium.igamium_client import IGamiumClient
from gamium.locator.rpc_locator import RpcLocator
from gamium.object.player import Player
from gamium.ui.ui import UI
from gamium.actions.key_by import KeyBy
from gamium.actions.action_chain import ActionChain
from gamium.igamium_service import *
from gamium.errors.gamium_error import GamiumError
from gamium.internal.logger import Logger
from gamium.locator.locator import Locator


class GamiumClient(IGamiumClient):
    def __init__(
        self,
        service: IGamiumService,
        printable: Any = None,
    ):
        self.__internal_loger = Logger()
        if printable:
            self._logger.set_handler(printable)
        self._service = service

    def is_connected(self) -> bool:
        return self._service.is_connected()

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
        options: FindObjectOptions = FindObjectOptions(),
    ) -> ObjectInfo:
        infos = self.finds(locator, options)
        if 0 == len(infos):
            raise GamiumError(
                ErrorCode.ObjectNotFound,
                f"GamiumClient.find By: {locator.by}, str: {locator.str} not found",
            )
        if infos[0] is None:
            raise GamiumError(
                ErrorCode.ObjectNotFound,
                f"GamiumClient.find By: {locator.by}, str: {locator.str} not found",
            )
        return infos[0]

    def finds(
        self,
        locator: Locator,
        options: FindObjectOptions = FindObjectOptions(),
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
                    Vector3(info.screenPosition.x, info.screenPosition.y, info.screenPosition.z) if info.screenPosition is not None else Vector3.zero(),
                    Vector2(info.screenRectSize.x, info.screenRectSize.y) if info.screenRectSize is not None else Vector2.zero(),
                    Vector3(info.position.x, info.position.y, info.position.z) if info.position is not None else Vector3.zero(),
                    Vector4(info.rotation.x, info.rotation.y, info.rotation.z, info.rotation.w) if info.rotation is not None else Vector4.zero(),
                    info.text,
                )
            )

        return infos

    def actions(self) -> ActionChain:
        return ActionChain(self._service)

    def send_key(self, by: KeyBy, options: SendKeyOptions = SendKeyOptions()) -> None:
        self.send_keys([by], options)

    def send_keys(self, by_list: List[KeyBy], options: SendKeyOptions = SendKeyOptions()) -> None:
        self._logger.info(f"GamiumClient.send_keys {[by.str for by in by_list]}")
        self.actions().send_keys(by_list, options).perform()

    def execute_rpc(
        self,
        locator: RpcLocator,
        option: ExecuteRpcOptions = ExecuteRpcOptions(),
    ) -> Any:
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
        options: FindObjectOptions = FindObjectOptions(),
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
        options: WaitOptions = WaitOptions(),
    ) -> T:
        return wait_generic(self, condition, options)

    def try_wait(
        self,
        condition: WaitCondition[T],
        options: WaitOptions = WaitOptions(),
    ) -> TryResult[T]:
        return tryify(functools.partial(self.wait, condition, options))  # type: ignore  # Ignore type error on this line

    @property
    def _logger(self) -> Logger:
        return self.__internal_loger
