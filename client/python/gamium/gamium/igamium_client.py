from typing import Optional
from gamium.actions.action_chain import ActionChain
from gamium.actions.key_by import KeyBy
from gamium.locator.locator import Locator
from gamium.Protocol import (
    QueryScreenResultT,
    HelloResultT,
    QueryProfileResultT,
    ObjectInfoT,
)
from gamium.options import FindObjectOptions, SendKeyOptions


class IGamiumClient:
    async def screen(self) -> QueryScreenResultT:
        pass

    async def hello(self) -> HelloResultT:
        pass

    async def profile(self) -> QueryProfileResultT:
        pass

    async def find(
        self, locator: Locator, options: Optional[FindObjectOptions] = FindObjectOptions()
    ) -> ObjectInfoT:
        pass

    def actions(self) -> ActionChain:
        pass

    async def send_key(
        self, by: KeyBy, options: Optional[SendKeyOptions] = SendKeyOptions()
    ) -> None:
        pass
