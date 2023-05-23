from typing import Awaitable, Callable, TypeVar, Union
from client.python.gamium.gamium.gamium_client import GamiumClient

from gamium.condition.condition import Condition


T = TypeVar("T")
WaitCondition = Union[
    Callable[[], Awaitable[T]],
    Callable[[GamiumClient], Awaitable[T]],
    Condition[T],
]
