from typing import Dict

from gamium.utils.generics import T


# def refresh_object_info(client: GamiumClient, info: ObjectInfo):
#     self._info = self._client.find(By.path(self._info.path))


def get_property_lowered_to_origin_keys_map(type: T) -> Dict[str, str]:
    ret = {}
    for attr_name in dir(type):
        if not attr_name.startswith("__"):
            ret[attr_name.lower()] = attr_name
    return ret


def get_property_name_by_code(code: int, type: T) -> str:
    for attr_name in dir(type):
        if getattr(type, attr_name) == code:
            return attr_name
    return ""
