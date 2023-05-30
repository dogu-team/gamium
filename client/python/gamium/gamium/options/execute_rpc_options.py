from typing import Optional


class ExecuteRpcOptions:
    def __init__(self, cast_number_to_float: bool = True):
        self.cast_number_to_float = cast_number_to_float
