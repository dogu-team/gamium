from typing import Awaitable, Callable, TypeVar, Union
from gamium.condition.condition import Condition


T = TypeVar("T")
WaitCondition = Union[
    Callable[[], Awaitable[T]],
    Callable[[object], Awaitable[T]],  # Callable[[IGamiumClient], Awaitable[T]]
    Condition[T],
]
