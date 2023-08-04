import inspect
from datetime import datetime
import time
from gamium.protocol.generated.Types.ErrorCode import ErrorCode
from gamium.condition.condition import Condition
from gamium.condition.wait_condition import WaitCondition
from gamium.errors.gamium_error import GamiumError
from gamium.igamium_client import IGamiumClient
from gamium.options.wait_options import WaitOptions
from gamium.utils.generics import T
from gamium.utils.time import current_time_ms


def wait_generic(client: IGamiumClient, condition: WaitCondition[T], options: WaitOptions) -> T:
    if client.is_connected() == False:
        raise GamiumError(ErrorCode.Disconnected, "Not connected")

    def call_condition(condition: WaitCondition[T]):
        if callable(condition):
            signature = inspect.signature(condition)
            parameter_count = len(signature.parameters)
            if parameter_count > 0:
                return condition(client)  # type: ignore # no way to let mypy know that this has parameter
            else:
                return condition()  # type: ignore # no way to let mypy know that this hasn't  parameter
        else:
            return condition.func(client)

    start_time = current_time_ms()
    last_call_time = start_time
    is_timeouted = False

    for i in range(0, 99999):
        try:
            if current_time_ms() - start_time > options.timeout_ms:
                is_timeouted = True
            last_call_time = current_time_ms()
            condition_ret = call_condition(condition)
            if condition_ret:
                return condition_ret
        except Exception as e:
            if is_timeouted == True:
                raise e
            if options.ignore_error == False:
                raise e
        remain_interval_ms = options.interval_ms - (current_time_ms() - last_call_time)
        if 1 < remain_interval_ms:
            time.sleep(remain_interval_ms / 1000)

    raise GamiumError(ErrorCode.Timeout, "timeout")
