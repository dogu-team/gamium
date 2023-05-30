from typing import Any, Callable, Generic, List
from gamium.protocol.types import ObjectInfo
from gamium.utils.generics import T

ConditionFn = Callable[[Any], T]  # Callable[[IGamiumClient], T]


class Condition(Generic[T]):
    def __init__(self, message: str, func: ConditionFn[T]):
        self.message = message
        self.func = func


class ObjectInfoCondition(Condition[ObjectInfo]):
    pass


class ObjectInfosCondition(Condition[List[ObjectInfo]]):
    pass
