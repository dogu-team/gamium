from typing import Awaitable, Callable, Generic, List, TypeVar
from gamium.protocol.generated.Types.ObjectInfo import ObjectInfo

T = TypeVar("T")
ConditionFn = Callable[[object], Awaitable[T]]  # Callable[[IGamiumClient], Awaitable[T]]


class Condition(Generic[T]):
    def __init__(self, message: str, func: ConditionFn[T]):
        self.message = message
        self.func = func


class ObjectInfoCondition(Condition[ObjectInfo]):
    pass


class ObjectInfosCondition(Condition[List[ObjectInfo]]):
    pass
