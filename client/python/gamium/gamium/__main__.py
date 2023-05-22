from gamium.locator.by import By
from gamium.gamium_client import *
from gamium.gamium_service import *


async def main():
    gamium = GamiumClient("127.0.0.1", 50061)
    await gamium.connect()

    res = await gamium.hello()
    print(res.appName)

    res = await gamium.screen()
    print(res.width)

    res = await gamium.profile()
    print(res.fps)

    res = await gamium.find(By.path("/Canvas[1]/Start[1]/DeleteAccountButton[1]"))
    print(res.screenPosition)

    await gamium.send_keys([KeyBy.unity_keycode("Space")])


asyncio.run(main())
