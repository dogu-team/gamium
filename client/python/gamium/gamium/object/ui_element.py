from typing import Optional, Union
from gamium.condition.until import Until
from gamium.condition.condition import Condition
from gamium.options.action_drag_options import ActionDragOptions
from gamium.protocol.types import ObjectInfo, Vector2

from gamium.igamium_client import IGamiumClient
from gamium.gamium_service import (
    GamiumService,
    create_query_object_interactable,
)
from gamium.internal.logger import Logger
from gamium.locator.by import By
from gamium.options.action_click_options import ActionClickOptions
from gamium.options.action_scroll_options import ActionScrollOptions
from gamium.options.query_object_interactable_options import (
    QueryObjectInteractableOptions,
)
from gamium.options.set_text_options import SetTextOptions
from gamium.utils.try_utils import TryResult, tryify


class UIElement:
    def __init__(self, client: IGamiumClient, service: GamiumService, info: ObjectInfo):
        self._client = client
        self._service = service
        self.info = info

    async def click(self, options: Optional[ActionClickOptions] = ActionClickOptions()) -> None:
        self._client._logger.info(f"UIElement({self.info.path}).click")
        await self.refresh()
        await self._client.actions().click(self.info.screen_position, options).perform()

    async def drag(
        self,
        to: Union["UIElement", Vector2],
        options: Optional[ActionDragOptions] = ActionDragOptions(),
    ) -> None:
        self._client._logger.info(f"UIElement({self.info.path}).drag")
        to_pos = to
        if isinstance(to, UIElement):
            to_pos = to.info.screen_position
        await self.refresh()
        await self._client.actions().drag(self.info.screen_position, to_pos, options).perform()

    async def scroll(
        self,
        delta: Vector2,
        options: Optional[ActionScrollOptions] = ActionScrollOptions(),
    ):
        self._client._logger.info(f"UIElement({self.info.path}).scroll")

        await self.refresh()
        await self._client.actions().scroll(self.info.screen_position, delta, options).sleep(options.duration_ms).scroll(
            self.info.screen_position, Vector2.zero()
        ).perform()

    async def set_text(self, text: str, options: Optional[SetTextOptions] = SetTextOptions()):
        self._client._logger.info(f"UIElement({self.info.path}).set_text")

        await self._client.actions().set_text(By.path(self.info.path), text, options).perform()
        await self.refresh()

    async def get_text(self) -> str:
        await self.refresh()
        return self.info.text

    async def is_interactable(
        self,
        options: Optional[QueryObjectInteractableOptions] = QueryObjectInteractableOptions(),
    ) -> bool:
        self._client._logger.info(f"UIElement({self.info.path}).is_interactable")

        res = await self._service.request(create_query_object_interactable(self.info.path, options.check_moving, options.check_raycast))
        return res.isInteractable

    async def try_is_interactable(
        self,
        options: Optional[QueryObjectInteractableOptions] = QueryObjectInteractableOptions(),
    ) -> TryResult[bool]:
        return await tryify(self.is_interactable(options))

    async def wait_interactable(
        self,
        options: Optional[QueryObjectInteractableOptions] = QueryObjectInteractableOptions(),
    ) -> bool:
        self._client._logger.info(f"UIElement({self.info.path}).wait_interactable")
        return await self._client.wait(Until.element_interactable(self, options))

    async def try_wait_interactable(
        self,
        options: Optional[QueryObjectInteractableOptions] = QueryObjectInteractableOptions(),
    ) -> TryResult[bool]:
        return await tryify(self.wait_interactable(options))

    async def refresh(self):
        self.info = await self._client.find(By.path(self.info.path))
