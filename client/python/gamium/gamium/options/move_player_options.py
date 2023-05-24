from typing import Optional
from gamium.protocol.generated.Packets.Actions.MovePlayerBy import MovePlayerBy


class MovePlayerOptions:
    def __init__(
        self,
        by: Optional[MovePlayerBy] = MovePlayerBy.KeyPress,
        epsilon: Optional[float] = 0.6,
        check_height: Optional[bool] = False,
    ):
        self.by = by
        self.epsilon = epsilon
        self.check_height = check_height
