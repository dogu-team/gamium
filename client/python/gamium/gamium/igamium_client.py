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


# used internally to prevent circular imports
class IGamiumClient:
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
