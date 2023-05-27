from typing import Callable, Generic, Union

from gamium.errors.gamium_error import GamiumError
from gamium.utils.generics import T


def tryify(func: Callable[[], T]) -> "TryResult[T]":
    try:
        return TryValueResult(func())
    except GamiumError as e:
        return TryErrorResult(e)


class TryValueResult(Generic[T]):
    def __init__(self, value: T):
        self.success = True
        self.value = value


class TryErrorResult:
    def __init__(self, error: Exception):
        self.success = False
        self.error = error


TryResult = Union[TryValueResult[T], TryErrorResult]
