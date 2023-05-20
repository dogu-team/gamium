from gamium.gamium_client import *
from gamium.gamium_service import *


async def main():
    gamium = GamiumClient("127.0.0.1", 50061)
    await gamium.connect()
    res = await gamium.hello()
    print(res)


asyncio.run(main())
