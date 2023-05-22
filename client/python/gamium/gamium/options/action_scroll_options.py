from typing import Optional


class ActionScrollOptions:
    def __init__(self, duration_ms: Optional[int] = 300):
        self.duration_ms = duration_ms
