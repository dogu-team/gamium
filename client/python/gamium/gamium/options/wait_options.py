from typing import Optional


class WaitOptions:
    def __init__(
        self,
        timeout_ms: Optional[int] = 5000,
        message: Optional[str] = "",
        interval_ms: Optional[int] = 100,
        ignore_error: Optional[bool] = True,
    ):
        self.timeout_ms = timeout_ms
        self.message = message
        self.interval_ms = interval_ms
        self.ignore_error = ignore_error
