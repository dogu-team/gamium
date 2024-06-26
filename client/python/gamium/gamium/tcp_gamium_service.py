import socket
import time
import traceback
import flatbuffers
from gamium.igamium_service import IGamiumService, PacketTypes, create_hello
from gamium.protocol.generated.Types.ErrorCode import ErrorCode
from gamium.protocol.generated.Packets.HelloResult import HelloResultT

from gamium.protocol.generated.Request import RequestT
from gamium.protocol.generated.Response import ResponseT

from gamium.internal import Logger, SizePrefixedRecvQueue
from gamium.errors.gamium_error import GamiumError
from gamium.utils.bytes import bytes_to_str_recursive
from gamium.utils.generics import P, R


class TcpGamiumService(IGamiumService):
    def __init__(
        self,
        host: str,
        port: int,
        timeout_sec: int = 10,
        logger: Logger = Logger(),
    ):
        self._host = host
        self._port = port
        self._timeout_sec = timeout_sec
        self._logger = logger
        self._socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self._seq = 0
        self._is_connected = False
        self._recv_queue = SizePrefixedRecvQueue()

    def is_connected(self) -> bool:
        return self._is_connected

    def connect(self, try_count: int = 30) -> HelloResultT:
        self._logger.info(f"Connecting to {self._host}:{self._port}")

        last_error = None
        for i in range(try_count):
            try:
                self._socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                self._socket.settimeout(self._timeout_sec)
                self._socket.connect((self._host, self._port))
            except Exception as e:
                self._logger.dot()
                last_error = e
                time.sleep(1)
                continue

            try:
                res = self.request(create_hello())
                self._is_connected = True
                return res
            except Exception as e:
                self._socket.close()
                self._logger.dot()
                last_error = e
                time.sleep(1)
                continue

        self._logger.newline()
        stack_trace = "".join(traceback.format_tb(last_error.__traceback__))
        raise Exception(f"Failed to connect to {self._host}:{self._port}. error: {last_error}, stack: {stack_trace}")

    def disconnect(self):
        self._is_connected = False
        self._socket.close()

    def request(self, packet: PacketTypes[P, R]) -> R:
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
            self.disconnect()
            raise e

        try:
            while True:
                data = self._socket.recv(1024)
                if len(data) == 0:
                    self.disconnect()
                    raise Exception("Connection closed")
                self._recv_queue.pushBuffer(data)
                if self._recv_queue.has():
                    break
            return self.pop_message(req)

        except ConnectionResetError as e:
            self.disconnect()
            raise e
        except Exception as e:
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
        ret = bytes_to_str_recursive(ret)

        return response.result

    def __get_seq(self):
        self._seq += 1
        return self._seq
