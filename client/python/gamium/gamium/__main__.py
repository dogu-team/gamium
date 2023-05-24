from gamium.locator.by import By
from gamium.gamium_client import *
from gamium.gamium_service import *


def main():
    gamium = GamiumClient("127.0.0.1", 50061)
    gamium.connect()

    res = gamium.hello()
    print(res.appName)

    res = gamium.screen()
    print(res.width)

    res = gamium.profile()
    print(res.fps)

    res = gamium.find(By.path("/Canvas[1]/Start[1]/DeleteAccountButton[1]"))
    print(res.screenPosition)

    gamium.send_keys([KeyBy.unity_keycode("Space")])


main()
