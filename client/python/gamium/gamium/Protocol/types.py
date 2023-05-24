from typing import List

from gamium.protocol.generated.Types import ErrorCode


class Vector2:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y


class Vector3:
    def __init__(self, x: float, y: float, z: float):
        self.x = x
        self.y = y
        self.z = z


class Vector4:
    def __init__(self, x: float, y: float, z: float, w: float):
        self.x = x
        self.y = y
        self.z = z
        self.w = w


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
        self._screen_rect_size = screen_rect_size
        self.position = position
        self.rotation = rotation
        self.text = text


class AErrorResult:
    def __init__(self, code: ErrorCode, reason: str):
        self.code = code
        self.reason = reason


class ActionResult:
    def __init__(self, error: AErrorResult):
        self._error = error


class InspectObjectOnScreenResult:
    def __init__(self, infos: List[ObjectInfo], hit_point: Vector3):
        self.infos = infos
        self.hit_point = hit_point


class QueryProfileResult:
    def __init__(self, fps: float):
        self.fps = fps


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
