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


asyncio.run(main())
