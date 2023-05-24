from typing import List, Tuple
from gamium.protocol.generated.Packets.ExecuteRpcParam import ExecuteRpcParam


class RpcBy:
    def __init__(self, by: ExecuteRpcParam, class_name: str, target_name: str, params: Tuple[any]):
        self.by = by
        self.class_name = class_name
        self.target_name = target_name
        self.params = params

    @staticmethod
    def method(class_path: str, method_name: str, *params):
        return RpcBy(ExecuteRpcParam.Method, class_path, method_name, params)

    @staticmethod
    def field(class_path: str, field_name: str):
        return RpcBy(ExecuteRpcParam.Field, class_path, field_name, ())

    @staticmethod
    def property(class_path: str, property_name: str):
        return RpcBy(ExecuteRpcParam.Field, class_path, property_name, ())
