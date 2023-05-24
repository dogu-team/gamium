import asyncio
import inspect
from datetime import datetime
from typing import TypeVar
from gamium.protocol.generated.Types import ErrorCode
from gamium.condition.condition import Condition
from gamium.condition.wait_condition import WaitCondition
from gamium.errors.gamium_error import GamiumError
from gamium.igamium_client import IGamiumClient
from gamium.options.wait_options import WaitOptions
from gamium.utils.time import current_time_ms


T = TypeVar("T")


async def wait_generic(client: IGamiumClient, condition: WaitCondition[T], options: WaitOptions) -> T:
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

    start_time = current_time_ms()
    last_call_time = start_time
    is_timeouted = False

    for i in range(0, 99999):
        try:
            if current_time_ms() - start_time > options.timeout_ms:
                is_timeouted = True
            last_call_time = current_time_ms()
            condition_ret = await call_condition(condition)
            if condition_ret:
                return condition_ret
        except Exception as e:
            if is_timeouted == True:
                raise e
            if options.ignore_error == False:
                raise e
        remain_interval_ms = options.interval_ms - (current_time_ms() - last_call_time)
        if 1 < remain_interval_ms:
            await asyncio.sleep(remain_interval_ms / 1000)
