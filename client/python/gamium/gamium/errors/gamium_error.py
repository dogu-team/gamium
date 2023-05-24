from gamium.protocol.generated.Types import ErrorCode


class GamiumError(Exception):
    def __init__(self, code: ErrorCode, message: str):
        self.code = code
        self.message = message
