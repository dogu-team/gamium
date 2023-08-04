from gamium.protocol.generated.Packets.HelloResult import HelloResultT
from typing import Generic, List
from gamium.protocol.generated.Param import Param
from gamium.protocol.generated.Result import Result
from gamium.protocol.generated.Packets.ActionsParam import ActionsParamT
from gamium.protocol.generated.Packets.ActionsResult import ActionsResultT
from gamium.protocol.generated.Packets.ExecuteRpcParam import ExecuteRpcParamT
from gamium.protocol.generated.Packets.ExecuteRpcResult import (
    ExecuteRpcResultT,
)
from gamium.protocol.generated.Packets.FindObjectsParam import (
    FindObjectsParamT,
)
from gamium.protocol.generated.Packets.FindObjectsResult import (
    FindObjectsResultT,
)
from gamium.protocol.generated.Packets.HelloParam import HelloParamT
from gamium.protocol.generated.Packets.HelloResult import HelloResultT
from gamium.protocol.generated.Packets.QueryObjectInteractableParam import (
    QueryObjectInteractableParamT,
)
from gamium.protocol.generated.Packets.QueryObjectInteractableResult import (
    QueryObjectInteractableResultT,
)
from gamium.protocol.generated.Packets.QueryProfileParam import (
    QueryProfileParamT,
)
from gamium.protocol.generated.Packets.QueryProfileResult import (
    QueryProfileResultT,
)
from gamium.protocol.generated.Packets.QueryScreenParam import (
    QueryScreenParamT,
)
from gamium.protocol.generated.Packets.QueryScreenResult import (
    QueryScreenResultT,
)
from gamium.protocol.generated.Types.ObjectLocator import ObjectLocatorT

from gamium.utils.generics import P, R

from abc import *


class PacketTypes(Generic[P, R]):
    def __init__(self, param_type: int, result_type: int, param: P):
        self.param_type = param_type  # Param
        self.result_type = result_type  # Result
        self.param: P = param


def create_hello() -> PacketTypes[HelloParamT, HelloResultT]:
    param = HelloParamT()
    return PacketTypes(Param.Packets_HelloParam, Result.Packets_HelloResult, param)


def create_query_screen() -> PacketTypes[QueryScreenParamT, QueryScreenResultT]:
    param = QueryScreenParamT()
    return PacketTypes(Param.Packets_QueryScreenParam, Result.Packets_QueryScreenResult, param)


def create_profile() -> PacketTypes[QueryProfileParamT, QueryProfileResultT]:
    param = QueryProfileParamT()
    return PacketTypes(Param.Packets_QueryProfileParam, Result.Packets_QueryProfileResult, param)


def create_find_objects(
    locator: ObjectLocatorT,
) -> PacketTypes[FindObjectsParamT, FindObjectsResultT]:
    param = FindObjectsParamT()
    param.locator = locator
    return PacketTypes(Param.Packets_FindObjectsParam, Result.Packets_FindObjectsResult, param)


def create_actions(actions: List[str]) -> PacketTypes[ActionsParamT, ActionsResultT]:
    param = ActionsParamT()
    param.actions = actions
    return PacketTypes(Param.Packets_ActionsParam, Result.Packets_ActionsResult, param)


def create_execute_rpc(by: int, class_name: str, target: str, params: List[str]) -> PacketTypes[ExecuteRpcParamT, ExecuteRpcResultT]:
    param = ExecuteRpcParamT()
    param.by = by
    param.className = class_name
    param.targetName = target
    param.paramDocuments = params
    return PacketTypes(Param.Packets_ExecuteRpcParam, Result.Packets_ExecuteRpcResult, param)


def create_query_object_interactable(
    object_id: str, check_moving: bool, check_raycast: bool
) -> PacketTypes[QueryObjectInteractableParamT, QueryObjectInteractableResultT]:
    param = QueryObjectInteractableParamT()
    param.objectId = object_id
    param.checkMoving = check_moving
    param.checkRaycast = check_raycast
    return PacketTypes(
        Param.Packets_QueryObjectInteractableParam,
        Result.Packets_QueryObjectInteractableResult,
        param,
    )


class IGamiumService(metaclass=ABCMeta):
    @abstractmethod
    def is_connected(self) -> bool:
        pass

    @abstractmethod
    def connect(self, try_count: int = 30) -> HelloResultT:
        pass

    @abstractmethod
    def disconnect(self):
        pass

    @abstractmethod
    def request(self, packet: PacketTypes[P, R], timeout_ms: int = 0) -> R:
        pass
