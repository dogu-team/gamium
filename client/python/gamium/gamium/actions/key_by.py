from gamium.protocol.generated.Types.InputKeyBy import InputKeyBy


class KeyBy:
    def __init__(self, by: int, str: str):
        self.by = by
        self.str = str

    @staticmethod
    def unity_keycode(str: str):
        return KeyBy(InputKeyBy.UNITY_KEYCODE, str)

    @staticmethod
    def unity_keyboard(str: str):
        return KeyBy(InputKeyBy.UNITY_KEYBOARD, str)
