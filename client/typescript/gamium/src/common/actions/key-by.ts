import { InputKeyBy, UnityKeyboard, UnityKeyCode } from '../protocols/generated';

export class KeyBy {
  constructor(public readonly by: InputKeyBy, public readonly str: string) {}
  static unityKeycode(code: keyof typeof UnityKeyCode): KeyBy {
    return new KeyBy(InputKeyBy.UNITY_KEYCODE, code);
  }
  static unityKeyboard(key: keyof typeof UnityKeyboard): KeyBy {
    const casted = key.replace('Digit', '');
    return new KeyBy(InputKeyBy.UNITY_KEYBOARD, casted);
  }
}
