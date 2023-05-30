from typing import Optional
from gamium.protocol.generated.Packets.Actions.MovePlayerBy import MovePlayerBy


class MovePlayerOptions:
    def __init__(
        self,
        by: int = MovePlayerBy.KeyPress,
        epsilon: float = 0.6,
        check_height: bool = False,
    ):
        self.by = by
        self.epsilon = epsilon
        self.check_height = check_height
