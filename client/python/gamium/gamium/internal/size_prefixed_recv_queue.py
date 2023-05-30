import struct

# struct.unpack https://docs.python.org/3/library/struct.html


class SizePrefixedRecvQueue:
    def __init__(self):
        self._buffer = bytes()

    def pushBuffer(self, buffer: bytes) -> None:
        self._buffer += buffer

    def has(self) -> bool:
        if len(self._buffer) < 4:
            return False
        size = struct.unpack("<I", self._buffer[:4])[0]
        if len(self._buffer) < size + 4:
            return False
        return True

    def pop(self) -> bytes:
        size = struct.unpack("<I", self._buffer[:4])[0]
        packet = self._buffer[4 : size + 4]
        self._buffer = self._buffer[size + 4 :]
        return packet
