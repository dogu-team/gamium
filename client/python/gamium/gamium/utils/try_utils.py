from typing import Awaitable, Generic, TypeVar

from gamium.errors.gamium_error import GamiumError


T = TypeVar("T")


async def tryify(awaitable: Awaitable[T]) -> "TryResult[T]":
    try:
        return TryResult(True, await awaitable, GamiumError.default())
    except GamiumError as e:
        return TryResult(False, None, e)


class TryResult(Generic[T]):
    def __init__(self, success: bool, value: T, error: GamiumError):
        self.success = success
        self.value = value
        self.error = error
