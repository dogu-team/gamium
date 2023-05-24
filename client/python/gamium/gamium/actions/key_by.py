from gamium.protocol.generated import InputKeyBy, UnityKeyCode, UnityKeyboard


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
