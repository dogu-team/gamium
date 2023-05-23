from typing import Generic, TypeVar
from gamium.Protocol.Types.ObjectInfo import ObjectInfoT

from gamium.gamium_client import GamiumClient


T = TypeVar("T")


class ConditionFn(Generic[T]):
    def __init__(self, client: GamiumClient):
        self.client = client


class Condition(Generic[T]):
    def __init__(self, message: str, func: ConditionFn[T]):
        self.message = message
        self.func = func


ObjectInfoCondition = ConditionFn[ObjectInfoT]
ObjectInfosCondition = ConditionFn[ObjectInfoT[]]
