from typing import Optional


class SendKeyOptions:
    def __init__(self, duration_ms: Optional[int] = 100):
        self.duration_ms = duration_ms
