from typing import Any, List, Tuple
from gamium.protocol.generated.Packets.ExecuteRpcParam import ExecuteRpcParam
from gamium.protocol.generated.Types.ExecuteRpcBy import ExecuteRpcBy


class RpcBy:
    def __init__(self, by: int, class_name: str, target_name: str, params: Tuple[Any, ...]):
        self.by = by  # gamium.protocol.generated.Types.ExecuteRpcBy
        self.class_name = class_name
        self.target_name = target_name
        self.params = params

    @staticmethod
    def method(class_path: str, method_name: str, *params):
        return RpcBy(ExecuteRpcBy.Method, class_path, method_name, params)

    @staticmethod
    def field(class_path: str, field_name: str):
        return RpcBy(ExecuteRpcBy.Field, class_path, field_name, ())

    @staticmethod
    def property(class_path: str, property_name: str):
        return RpcBy(ExecuteRpcBy.Property, class_path, property_name, ())
