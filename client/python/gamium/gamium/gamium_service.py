import asyncio
import socket
import sys
import flatbuffers

from gamium.errors.gamium_error import GamiumError
from gamium.Protocol.Request import RequestT
from gamium.Protocol.Response import Response, ResponseT
from gamium.Protocol.Types.ErrorCode import ErrorCode

from gamium.internal import Logger, DefaultLogger, SizePrefixedRecvQueue


class GamiumService:
    def __init__(
        self,
        host: str,
        port: int,
        request_timeout: int = 50,
        logger: any = DefaultLogger(),
    ):
        self._host = host
        self._port = port
        self._request_timeout = request_timeout
        self._logger = logger
        self._reader = None
        self._writer = None
        self._seq = 0
        self._recv_queue = SizePrefixedRecvQueue()

    async def connect(self, try_count: int = 30):
        self._logger.info(f"Connecting to {self._host}:{self._port}")

        for i in range(try_count):
            try:
                self._reader, self._writer = await asyncio.open_connection(self._host, self._port)
            except Exception as e:
                self._logger.info(
                    f"Failed to connect to {self._host}:{self._port} ({i + 1}/{try_count}) {e}"
                )
                await asyncio.sleep(1)
                continue
            else:
                self._logger.info(f"Connected to {self._host}:{self._port}")
                return

        raise Exception(f"Failed to connect to {self._host}:{self._port}")

    def disconnect(self):
        if self._writer:
            self._writer.close()

    async def request(self, packet: RequestT, timeout: int = 50):
        if not self._writer:
            raise Exception("Not connected")

        packet.seq = self.__get_seq()

        builder = flatbuffers.Builder()
        request_offset = packet.Pack(builder)
        builder.FinishSizePrefixed(request_offset)

        try:
            self._writer.write(builder.Output())
            await self._writer.drain()
        except socket.error as e:
            self._logger.error(f"Failed to send request: {e}")
            raise e

        try:
            while True:
                data = await asyncio.wait_for(self._reader.read(1024), timeout)
                self._recv_queue.pushBuffer(data)
                if self._recv_queue.has():
                    break
            buf = self._recv_queue.pop()

            response = ResponseT.InitFromPackedBuf(buf, 0)
            if response.resultType != packet.paramType:
                raise GamiumError(
                    ErrorCode.InternalError,
                    f"Invalid response type: {response.resultType} != {packet.paramType}",
                )
            if response.seq != packet.seq:
                raise GamiumError(
                    ErrorCode.InternalError,
                    f"Invalid response seq: {response.seq} != {packet.seq}",
                )
            if None == response.error:
                raise GamiumError(
                    ErrorCode.InternalError, f"request response error is null {response.error}"
                )
            if response.error.code != ErrorCode.None_:
                raise GamiumError(
                    response.error.code, f"request response error {response.error.message}"
                )
            self._logger.verbose(f"request: {packet.seq}, {packet.paramType} done")

            return response.result

        except asyncio.TimeoutError as e:
            self._logger.error(f"Failed to receive response: {e}")
            raise e

        return data

    def __get_seq(self):
        self._seq += 1
        return self._seq
