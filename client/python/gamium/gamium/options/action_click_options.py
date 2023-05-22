from typing import Optional


class ActionClickOptions:
    def __init__(self, duration_ms: Optional[int] = 60):
        self.duration_ms = duration_ms
