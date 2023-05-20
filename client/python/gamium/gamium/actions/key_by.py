from gamium.Protocol.Types.InputKeyBy import InputKeyBy
from gamium.Protocol.Types.Unity.UnityKeyCode import UnityKeyCode
from gamium.Protocol.Types.Unity.UnityKeyboard import UnityKeyboard


class KeyBy:
    def __init__(self, by: InputKeyBy, str: str):
        self.by = by
        self.str = str

    @staticmethod
    def unity_keycode(str: str):
        return KeyBy(InputKeyBy.UNITY_KEYCODE, str)

    @staticmethod
    def unity_keyboard(str: str):
        return KeyBy(InputKeyBy.UNITY_KEYBOARD, str)
