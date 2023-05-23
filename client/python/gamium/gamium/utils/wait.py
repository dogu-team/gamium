import datetime
import inspect
from typing import TypeVar
from client.python.gamium.gamium.condition.condition import Condition
from client.python.gamium.gamium.condition.wait_condition import WaitCondition
from client.python.gamium.gamium.gamium_client import GamiumClient
from client.python.gamium.gamium.options.wait_options import WaitOptions


T = TypeVar("T")


async def wait_generic(
    client: GamiumClient, condition: WaitCondition[T], options: WaitOptions
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

    for i in range(0, 99999):
        try:
            if datetime.now().timestamp() - start_time > options.timeout:
                raise TimeoutError()
            last_call_time = datetime.now().timestamp()

            pass
        except Exception as e:
            pass

    pass
