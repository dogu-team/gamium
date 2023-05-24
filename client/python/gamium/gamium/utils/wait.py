import asyncio
import datetime
import inspect
from typing import TypeVar
from gamium.protocol.generated.Types import ErrorCode
from gamium.condition.condition import Condition
from gamium.condition.wait_condition import WaitCondition
from gamium.errors.gamium_error import GamiumError
from gamium.igamium_client import IGamiumClient
from gamium.options.wait_options import WaitOptions


T = TypeVar("T")


async def wait_generic(
    client: IGamiumClient, condition: WaitCondition[T], options: WaitOptions
) -> T:
    async def call_condition(condition: WaitCondition[T]):
        if callable(condition):
            signature = inspect.signature(condition)
            parameters = signature.parameters
            if len(parameters) > 0:
                return await condition(client)
            else:
                return await condition()
        else:
            return await condition.func(client)

    start_time = datetime.now().timestamp()
    last_call_time = start_time
    inner_result = None
    inner_exception = None

    for i in range(0, 99999):
        try:
            if datetime.now().timestamp() - start_time > options.timeout:
                raise GamiumError(
                    ErrorCode.Timeout,
                    f"wait timeout: condition: {condition}, inner_result: {inner_result}, inner_exception: {inner_exception}",
                )
            last_call_time = datetime.now().timestamp()
            condition_ret = await call_condition(condition)
            inner_result = condition_ret
            if condition_ret:
                return condition_ret
        except Exception as e:
            inner_exception = e
            if options.ignore_error == False:
                raise e
        remain_interval_ms = options.interval - (datetime.now().timestamp() - last_call_time)
        if 1 < remain_interval_ms:
            await asyncio.sleep(remain_interval_ms / 1000)
