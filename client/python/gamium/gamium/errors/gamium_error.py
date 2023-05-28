class GamiumError(Exception):
    def __init__(self, code: int, message: str):
        self.code = code  # gamium.protocol.generated.Types.ErrorCode
        self.message = message

    @staticmethod
    def default() -> "GamiumError":
        return GamiumError(0, "")
