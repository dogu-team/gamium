from gamium.errors.gamium_error import GamiumError
from gamium.protocol.functions import get_property_lowered_to_origin_keys_map, get_property_name_by_code
from gamium.protocol.generated.Types.ErrorCode import ErrorCode
from gamium.protocol.generated.Types.InputKeyBy import InputKeyBy
from gamium.protocol.generated.Types.Unity.UnityKeyCode import UnityKeyCode
from gamium.protocol.generated.Types.Unity.UnityKeyboard import UnityKeyboard


class KeyBy:
    __UnityKeyCodeKeys = get_property_lowered_to_origin_keys_map(UnityKeyCode)
    __UnityKeyboardKeys = get_property_lowered_to_origin_keys_map(UnityKeyboard)

    def __init__(self, by: int, str: str):
        self.by = by
        self.str = str

    @staticmethod
    def unity_keycode(keycode: str):
        origin = KeyBy.__UnityKeyCodeKeys.get(keycode.lower())
        if origin is None:
            raise GamiumError(
                ErrorCode.InvalidParameter,
                f"Unknown keycode: {keycode}",
            )
        return KeyBy(InputKeyBy.UNITY_KEYCODE, origin)

    @staticmethod
    def unity_keyboard(keyboard_code: str):
        origin = KeyBy.__UnityKeyboardKeys.get(keyboard_code.lower())
        if origin is None:
            raise GamiumError(
                ErrorCode.InvalidParameter,
                f"Unknown keyboard_code: {keyboard_code}",
            )
        casted = origin.replace("Digit", "")
        return KeyBy(InputKeyBy.UNITY_KEYBOARD, casted)
