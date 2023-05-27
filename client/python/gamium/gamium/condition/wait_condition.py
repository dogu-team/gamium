from typing import Callable, Union
from gamium.condition.condition import Condition
from gamium.utils.generics import T


WaitCondition = Union[
    Callable[[], T],
    Callable[[object], T],  # Callable[[IGamiumClient], T]
    Condition[T],
]
