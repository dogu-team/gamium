from typing import List

from gamium.protocol.generated.Types.ErrorCode import ErrorCode
from gamium.protocol.generated.Types.ExecuteRpcBy import ExecuteRpcBy
from gamium.protocol.generated.Types.InputKeyBy import InputKeyBy
from gamium.protocol.generated.Types.InputKeyPressType import InputKeyPressType
from gamium.protocol.generated.Types.InputMouseButtonCode import InputMouseButtonCode
from gamium.protocol.generated.Types.InputMousePressType import InputMousePressType
from gamium.protocol.generated.Packets.Actions.MovePlayerBy import MovePlayerBy
from gamium.protocol.generated.Types.ObjectLocatorBy import ObjectLocatorBy
from gamium.protocol.generated.Types.Unity.UnityKeyboard import UnityKeyboard
from gamium.protocol.generated.Types.Unity.UnityKeyCode import UnityKeyCode


class Vector2:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

    @staticmethod
    def zero() -> "Vector2":
        return Vector2(0, 0)

    @staticmethod
    def from_vector3(vector3: "Vector3") -> "Vector2":
        return Vector2(vector3.x, vector3.y)


class Vector3:
    def __init__(self, x: float, y: float, z: float):
        self.x = x
        self.y = y
        self.z = z

    @staticmethod
    def zero() -> "Vector3":
        return Vector3(0, 0, 0)


class Vector4:
    def __init__(self, x: float, y: float, z: float, w: float):
        self.x = x
        self.y = y
        self.z = z
        self.w = w

    @staticmethod
    def zero() -> "Vector4":
        return Vector4(0, 0, 0, 0)


class ObjectInfo:
    def __init__(
        self,
        path: str,
        name: str,
        type: int,  # ObjectType
        tag: List[str],
        is_active: bool,
        screen_position: Vector3,
        screen_rect_size: Vector2,
        position: Vector3,
        rotation: Vector4,
        text: str,
    ):
        self.path = path
        self.name = name
        self.type = type
        self.tag = tag
        self.is_active = is_active
        self.screen_position = screen_position
        self.screen_rect_size = screen_rect_size
        self.position = position
        self.rotation = rotation
        self.text = text


class ErrorResult:
    def __init__(self, code: int, reason: str):
        self.code = code  # gamium.protocol.generated.Types.ErrorCode
        self.reason = reason


class ActionResult:
    def __init__(self, error: ErrorResult):
        self.error = error


class InspectObjectOnScreenResult:
    def __init__(self, infos: List[ObjectInfo], hit_point: Vector3):
        self.infos = infos
        self.hit_point = hit_point


class QueryProfileResult:
    def __init__(self, fps: float):
        self.fps = fps


class HelloResult:
    def __init__(self, width: int, height: int):
        self.width = width
        self.height = height


class QueryScreenResult:
    def __init__(self, width: int, height: int):
        self.width = width
        self.height = height


class ObjectHierarchyNode:
    def __init__(self, name: str, path: str, children: List["ObjectHierarchyNode"]):
        self.name = name
        self.path = path
        self.children = children


class ObjectsHierarchy:
    def __init__(self, name: str, children: List[ObjectHierarchyNode]):
        self.name = name
        self.children = children
