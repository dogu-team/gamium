from typing import Callable, TypeVar, Union
from gamium.condition.condition import Condition


T = TypeVar("T")
WaitCondition = Union[
    Callable[[], T],
    Callable[[object], T],  # Callable[[IGamiumClient], T]
    Condition[T],
]
