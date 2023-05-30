from typing import Optional


class WaitOptions:
    def __init__(
        self,
        timeout_ms: int = 5000,
        message: str = "",
        interval_ms: int = 100,
        ignore_error: bool = True,
    ):
        self.timeout_ms = timeout_ms
        self.message = message
        self.interval_ms = interval_ms
        self.ignore_error = ignore_error
