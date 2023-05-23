from typing import Awaitable, Callable, Generic, List, TypeVar
from gamium.object.ui_element import UIElement

from gamium.Protocol.Types.ObjectInfo import ObjectInfo

from gamium.gamium_client import GamiumClient


T = TypeVar("T")
ConditionFn = Callable[[GamiumClient], Awaitable[T]]


class Condition(Generic[T]):
    def __init__(self, message: str, func: ConditionFn[T]):
        self.message = message
        self.func = func


ObjectInfoCondition = Condition[ObjectInfo]
ObjectInfosCondition = Condition[List[ObjectInfo]]
UIElementCondition = Condition[UIElement]
