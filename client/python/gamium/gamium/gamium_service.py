import asyncio
import socket
import traceback
from typing import Generic, List, Optional, TypeVar
import flatbuffers
from gamium.protocol.generated import (
    ExecuteRpcParamT,
    ExecuteRpcResultT,
    QueryObjectInteractableParamT,
    QueryObjectInteractableResultT,
    ActionsParamT,
    ActionsResultT,
    Param,
    Result,
    RequestT,
    ResponseT,
    ErrorCode,
    ObjectLocatorT,
    HelloResultT,
    FindObjectsResultT,
    QueryProfileParamT,
    QueryProfileResultT,
    QueryScreenParamT,
    QueryScreenResultT,
    FindObjectsParamT,
    HelloParamT,
)
from gamium.internal import Logger, SizePrefixedRecvQueue
from gamium.errors.gamium_error import GamiumError


P = TypeVar("P")
R = TypeVar("R")


class PacketTypes(Generic[P, R]):
    def __init__(self, param_type: Param, result_type: Result, param: P):
        self.param_type: Param = param_type
        self.result_type: Result = result_type
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


def create_execute_rpc(
    by: int, class_name: str, target: str, params: List[str]
) -> PacketTypes[ExecuteRpcParamT, ExecuteRpcResultT]:
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
        self._reader = None
        self._writer = None
        self._seq = 0
        self._recv_queue = SizePrefixedRecvQueue()

    async def connect(self, try_count: int = 30) -> HelloResultT:
        self._logger.info(f"Connecting to {self._host}:{self._port}")

        for i in range(try_count):
            try:
                self._reader, self._writer = await asyncio.open_connection(self._host, self._port)
            except Exception as e:
                self._logger.info(
                    f"Failed to connect to {self._host}:{self._port}. countt: ({i + 1}/{try_count}), error: {e}"
                )
                await asyncio.sleep(1)
                continue

            try:
                res = await self.request(create_hello())
                return res
            except Exception as e:
                self._writer.close()
                stack_trace = "".join(traceback.format_tb(e.__traceback__))
                self._logger.info(
                    f"Failed to say hello to {self._host}:{self._port}. count: ({i + 1}/{try_count}), error: {e}. {stack_trace}"
                )
                await asyncio.sleep(1)
                continue

        raise Exception(f"Failed to connect to {self._host}:{self._port}")

    def disconnect(self):
        if self._writer:
            self._writer.close()

    async def request(self, packet: PacketTypes[P, R], timeout_ms: Optional[int] = None) -> R:
        if not self._writer:
            raise Exception("Not connected")
        if None == timeout_ms:
            timeout_ms = self._request_timeout_ms

        req = RequestT()
        req.seq = self.__get_seq()
        req.paramType = packet.param_type
        req.param = packet.param

        builder = flatbuffers.Builder()
        request_offset = req.Pack(builder)
        builder.FinishSizePrefixed(request_offset)

        try:
            self._writer.write(builder.Output())
            await self._writer.drain()
        except socket.error as e:
            self._logger.error(f"Failed to send request: {e}")
            raise e

        try:
            while True:
                data = await asyncio.wait_for(self._reader.read(1024), timeout_ms / 1000)
                self._recv_queue.pushBuffer(data)
                if self._recv_queue.has():
                    break
            return self.pop_message(req)

        except asyncio.TimeoutError as e:
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
        if None == response.error:
            raise GamiumError(
                ErrorCode.InternalError, f"request response error is null {response.error}"
            )
        if response.error.code != ErrorCode.None_:
            reason = response.error.reason.decode("utf-8")
            raise GamiumError(response.error.code, f"request response error {reason}")
        self._logger.verbose(f"request: seq: {req.seq}, type: {req.paramType} done")

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
