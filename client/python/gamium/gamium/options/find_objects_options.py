from typing import Optional


class FindObjectOptions:
    def __init__(self, delay_ms: Optional[int] = 60):
        self.delay_ms = delay_ms
