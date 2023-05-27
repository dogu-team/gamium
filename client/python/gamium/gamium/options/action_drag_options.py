from typing import Optional


class ActionDragOptions:
    def __init__(self, duration_ms: int = 300, interval_ms: int = 60):
        self.duration_ms = duration_ms
        self.interval_ms = interval_ms
