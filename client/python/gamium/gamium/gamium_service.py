import socket
import time
import traceback
from typing import Generic, List, Optional
import flatbuffers
from gamium.protocol.generated.Types.ErrorCode import ErrorCode
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
from gamium.protocol.generated.Request import RequestT
from gamium.protocol.generated.Response import ResponseT
from gamium.protocol.generated.Types.ObjectLocator import ObjectLocatorT

from gamium.internal import Logger, SizePrefixedRecvQueue
from gamium.errors.gamium_error import GamiumError
from gamium.utils.generics import P, R


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


class GamiumService:
    def __init__(
        self,
        host: str,
        port: int,
        request_timeout_ms: int = 50000,
        logger: Logger = Logger(),
    ):
        self._host = host
        self._port = port
        self._request_timeout_ms = request_timeout_ms
        self._logger = logger
        self._socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self._seq = 0
        self._recv_queue = SizePrefixedRecvQueue()

    def connect(self, try_count: int = 30) -> HelloResultT:
        self._logger.info(f"Connecting to {self._host}:{self._port}")

        for i in range(try_count):
            try:
                self._socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                self._socket.connect((self._host, self._port))
            except Exception as e:
                self._logger.info(f"Failed to connect to {self._host}:{self._port}. count: ({i + 1}/{try_count}), error: {e}")
                time.sleep(1)
                continue

            try:
                res = self.request(create_hello())
                return res
            except Exception as e:
                self._socket.close()
                stack_trace = "".join(traceback.format_tb(e.__traceback__))
                self._logger.info(f"Failed to say hello to {self._host}:{self._port}. count: ({i + 1}/{try_count}), error: {e}. {stack_trace}")
                time.sleep(1)
                continue

        raise Exception(f"Failed to connect to {self._host}:{self._port}")

    def disconnect(self):
        self._socket.close()

    def request(self, packet: PacketTypes[P, R], timeout_ms: int = 0) -> R:
        if 0 == timeout_ms:
            timeout_ms = self._request_timeout_ms

        req = RequestT()
        req.seq = self.__get_seq()
        req.paramType = packet.param_type
        req.param = packet.param  # type: ignore  # Ignore assignment error on this line

        builder = flatbuffers.Builder()
        request_offset = req.Pack(builder)
        builder.FinishSizePrefixed(request_offset)

        try:
            self._socket.sendall(builder.Output())
        except socket.error as e:
            self._logger.error(f"Failed to send request: {e}")
            raise e

        try:
            while True:
                data = self._socket.recv(1024)
                self._recv_queue.pushBuffer(data)
                if self._recv_queue.has():
                    break
            return self.pop_message(req)

        except Exception as e:
            self._logger.error(f"Failed to receive response: {e}")
            raise e

        return data

    def pop_message(self, req: RequestT):
        buf = self._recv_queue.pop()

        response = ResponseT.InitFromPackedBuf(buf, 0)
        if response.resultType != req.paramType:
            raise GamiumError(
                ErrorCode.InternalError,
                f"Invalid response type: {response.resultType} != {req.paramType}",
            )
        if response.seq != req.seq:
            raise GamiumError(
                ErrorCode.InternalError,
                f"Invalid response seq: {response.seq} != {req.seq}",
            )
        if response.error is None:
            raise GamiumError(ErrorCode.InternalError, f"request response error is null: {response.error}")
        if response.error.code != ErrorCode.None_:
            reason = response.error.reason.decode("utf-8")
            raise GamiumError(response.error.code, f"request response error: {reason}")
        # self._logger.verbose(f"request: seq: {req.seq}, type: {req.paramType} done")

        ret = response.result
        # convert all properties of ret to str if bytes type
        ret = self.__bytes_to_str_recursive(ret)

        return response.result

    def __get_seq(self):
        self._seq += 1
        return self._seq

    @staticmethod
    def __bytes_to_str_recursive(any):
        if isinstance(any, bytes):
            return any.decode("utf-8")
        if hasattr(any, "__dict__"):
            for key, value in any.__dict__.items():
                any.__dict__[key] = GamiumService.__bytes_to_str_recursive(value)
        if isinstance(any, dict):
            for key, value in any.items():
                any[key] = GamiumService.__bytes_to_str_recursive(value)
        if isinstance(any, list):
            for i, value in enumerate(any):
                any[i] = GamiumService.__bytes_to_str_recursive(value)
        return any
