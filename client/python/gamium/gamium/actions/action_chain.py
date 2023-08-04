from typing import Generic, List
import flatbuffers
from gamium.protocol.generated.Packets.ActionParam import ActionParam
from gamium.protocol.generated.Types.InputMousePressType import InputMousePressType
from gamium.protocol.generated.Types.ErrorCode import ErrorCode
from gamium.protocol.generated.Types.InputKeyPressType import InputKeyPressType
from gamium.protocol.generated.Types.InputMouseButtonCode import (
    InputMouseButtonCode,
)
from gamium.protocol.generated.Types.ObjectLocatorBy import ObjectLocatorBy
from gamium.protocol.generated.Packets.ActionParamSingle import (
    ActionParamSingleT,
)
from gamium.protocol.generated.Packets.ActionResult import ActionResultT
from gamium.protocol.generated.Packets.Actions.AppQuitParam import (
    AppQuitParamT,
)
from gamium.protocol.generated.Packets.Actions.InputKeyParam import (
    InputKeyParamT,
)
from gamium.protocol.generated.Packets.Actions.InputMouseParam import (
    InputMouseParamT,
)
from gamium.protocol.generated.Packets.Actions.InputSetTextParam import (
    InputSetTextParamT,
)
from gamium.protocol.generated.Packets.Actions.MovePlayerParam import (
    MovePlayerParamT,
)
from gamium.protocol.generated.Packets.Actions.SleepParam import SleepParamT
from gamium.protocol.generated.Types.Vector2 import Vector2T
from gamium.protocol.generated.Types.Vector3 import Vector3T
from gamium.igamium_service import IGamiumService, create_actions
from gamium.options import (
    ActionClickOptions,
    ActionDragOptions,
    ActionMoveOptions,
    ActionScrollOptions,
    MovePlayerOptions,
    SendKeyOptions,
    SetTextOptions,
)
from gamium.actions.key_by import KeyBy
from gamium.errors.gamium_error import GamiumError
from gamium.locator.locator import Locator
from gamium.protocol.types import Vector2, Vector3
from gamium.utils.generics import P


class ActionPacketTypes(Generic[P]):
    def __init__(self, param_type: int, param: P):
        self.param_type = param_type  # ActionParam
        self.param: P = param


def create_sleep(ms: int) -> ActionPacketTypes[SleepParamT]:
    param = SleepParamT()
    param.ms = ms
    return ActionPacketTypes(ActionParam.Actions_SleepParam, param)


def create_input_key(press: int, codess: List[str]) -> ActionPacketTypes[InputKeyParamT]:
    param = InputKeyParamT()
    param.press = press
    param.codes = codess
    return ActionPacketTypes(ActionParam.Actions_InputKeyParam, param)


def create_input_mouse(press: int, button: int, position: Vector2T, delta: Vector2T) -> ActionPacketTypes[InputMouseParamT]:
    param = InputMouseParamT()
    param.press = press
    param.button = button
    param.position = position
    param.delta = delta
    return ActionPacketTypes(ActionParam.Actions_InputMouseParam, param)


def create_set_text(object_id: str, text: str) -> ActionPacketTypes[InputSetTextParamT]:
    param = InputSetTextParamT()
    param.objectId = object_id
    param.text = text
    return ActionPacketTypes(ActionParam.Actions_InputSetTextParam, param)


def create_move_player(
    player_object_id: str,
    camera_object_id: str,
    position: Vector3T,
    by: int,
    epsilon: float,
    check_height: bool,
) -> ActionPacketTypes[MovePlayerParamT]:
    param = MovePlayerParamT()
    param.playerObjectId = player_object_id
    param.cameraObjectId = camera_object_id
    param.position = position
    param.by = by
    param.epsilon = epsilon
    param.checkHeight = check_height
    return ActionPacketTypes(ActionParam.Actions_MovePlayerParam, param)


def create_app_quit(exit_code: int, delay_ms: int) -> ActionPacketTypes[AppQuitParamT]:
    param = AppQuitParamT()
    param.exitCode = exit_code
    param.delayMs = delay_ms
    return ActionPacketTypes(ActionParam.Actions_AppQuitParam, param)


class ActionChain:
    def __init__(self, service: IGamiumService) -> None:
        self._service = service
        self.actions: List[ActionPacketTypes] = []

    def __add_action(self, action: ActionPacketTypes):
        self.actions.append(action)
        return self

    def sleep(self, ms: int):
        return self.__add_action(create_sleep(ms))

    def click(
        self,
        position: Vector2,
        options: ActionClickOptions = ActionClickOptions(),
    ):
        fb_position = Vector2T()
        fb_position.x = position.x
        fb_position.y = position.y

        self.__add_action(
            create_input_mouse(
                InputMousePressType.DOWN,
                InputMouseButtonCode.LEFT,
                fb_position,
                Vector2T(),
            )
        )
        self.__add_action(create_sleep(options.duration_ms))
        self.__add_action(create_input_mouse(InputKeyPressType.UP, InputMouseButtonCode.LEFT, fb_position, Vector2T()))
        self.__add_action(create_sleep(33))
        return self

    def move(
        self,
        position: Vector2,
        options: ActionMoveOptions = ActionMoveOptions(),
    ):
        fb_position = Vector2T()
        fb_position.x = position.x
        fb_position.y = position.y

        self.__add_action(
            create_input_mouse(
                InputMousePressType.MOVE,
                InputMouseButtonCode.LEFT,
                fb_position,
                Vector2T(),
            )
        )
        return self

    def drag(
        self,
        from_position: Vector2,
        to_position: Vector2,
        options: ActionDragOptions = ActionDragOptions(),
    ):
        fb_from_position = Vector2T()
        fb_from_position.x = from_position.x
        fb_from_position.y = from_position.y

        fb_to_position = Vector2T()
        fb_to_position.x = to_position.x
        fb_to_position.y = to_position.y

        self.__add_action(
            create_input_mouse(
                InputMousePressType.DOWN,
                InputMouseButtonCode.LEFT,
                fb_from_position,
                Vector2T(),
            )
        )

        delta_count = int(options.duration_ms / (options.interval_ms + 1))
        delta_vector = [
            (to_position.x - from_position.x) / delta_count,
            (to_position.y - from_position.y) / delta_count,
        ]

        for i in range(delta_count - 1):
            fb_next_position = Vector2T()
            fb_next_position.x = from_position.x + delta_vector[0] * i
            fb_next_position.y = from_position.y + delta_vector[1] * i
            self.__add_action(
                create_input_mouse(
                    InputMousePressType.MOVE,
                    InputMouseButtonCode.LEFT,
                    fb_next_position,
                    Vector2T(),
                )
            )
            self.__add_action(create_sleep(options.interval_ms))

        self.__add_action(
            create_input_mouse(
                InputMousePressType.UP,
                InputMouseButtonCode.LEFT,
                fb_to_position,
                Vector2T(),
            )
        )
        return self

    def scroll(
        self,
        position: Vector2,
        delta: Vector2,
        options: ActionScrollOptions = ActionScrollOptions(),
    ):
        fb_position = Vector2T()
        fb_position.x = position.x
        fb_position.y = position.y

        fb_delta = Vector2T()
        fb_delta.x = delta.x
        fb_delta.y = delta.y

        self.__add_action(
            create_input_mouse(
                InputMousePressType.SCROLL,
                InputMouseButtonCode.LEFT,
                fb_position,
                fb_delta,
            )
        )
        self.__add_action(create_sleep(options.duration_ms))
        return self

    def send_keys(self, by_list: List[KeyBy], options: SendKeyOptions = SendKeyOptions()):
        codes = []
        for by in by_list:
            codes.append(by.str)

        self.__add_action(create_input_key(InputKeyPressType.DOWN, codes))
        self.__add_action(create_sleep(options.duration_ms))
        self.__add_action(create_input_key(InputKeyPressType.UP, codes))
        self.__add_action(create_sleep(33))

        return self

    def set_text(
        self,
        locator: Locator,
        text: str,
        options: SetTextOptions = SetTextOptions(),
    ):
        if locator.by != ObjectLocatorBy.Path:
            raise GamiumError(ErrorCode.InvalidParameter, "setText only support Path locator")

        self.__add_action(create_set_text(locator.str, text))
        self.__add_action(create_sleep(33))
        return self

    def move_player(
        self,
        player_locator: Locator,
        camera_locator: Locator,
        dest: Vector3,
        options: MovePlayerOptions = MovePlayerOptions(),
    ):
        fb_dest = Vector3T()
        fb_dest.x = dest.x
        fb_dest.y = dest.y
        fb_dest.z = dest.z

        if player_locator.by != ObjectLocatorBy.Path or camera_locator.by != ObjectLocatorBy.Path:
            raise GamiumError(ErrorCode.InvalidParameter, "movePlayer only support Path locator")

        self.__add_action(
            create_move_player(
                player_locator.str,
                camera_locator.str,
                fb_dest,
                options.by,
                options.epsilon,
                options.check_height,
            )
        )
        self.__add_action(create_sleep(33))
        return self

    def app_quit(self, exit_code: int = 0, delay_ms: int = 10):
        self.__add_action(create_app_quit(exit_code, delay_ms))
        return self

    def perform(self) -> List[ActionResultT]:
        if len(self.actions) == 0:
            raise GamiumError(
                ErrorCode.InvalidParameter,
                "ActionChains.perform. actions shoult not be empty",
            )

        actions_array: List[str] = []
        for action in self.actions:
            action_param = ActionParamSingleT()
            action_param.actionType = action.param_type
            action_param.action = action.param

            builder = flatbuffers.Builder()
            request_offset = action_param.Pack(builder)
            builder.Finish(request_offset)

            param_bytes = builder.Output()
            param_str = "".join(chr(byte) for byte in param_bytes)
            actions_array.append(param_str)

        res = self._service.request(create_actions(actions_array))
        self.__check_action_return(res.results)
        return res.results

    def __check_action_return(self, results: List[ActionResultT]):
        for i in range(len(results)):
            result = results[i]
            if result is None:
                raise GamiumError(
                    ErrorCode.InternalError,
                    f"ActionChains.perform action {i} return undefined",
                )

            if result.error is None:
                raise GamiumError(
                    ErrorCode.InternalError,
                    "ActionChains.perform. action failed. error is None",
                )
            if result.error.code != ErrorCode.None_:
                raise GamiumError(
                    ErrorCode.InternalError,
                    "ActionChains.perform. action failed. error code: " + str(result.error.code) + " error message: " + result.error.reason,
                )
