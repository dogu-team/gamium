from typing import Optional, Union
from gamium.condition.condition import Condition
from gamium.protocol.types import ObjectInfo

from gamium.protocol.generated import Vector2T
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


class UIElement:
    def __init__(self, client: IGamiumClient, service: GamiumService, info: ObjectInfo):
        self._client = client
        self._service = service
        self._info = info

    async def click(self, options: Optional[ActionClickOptions] = ActionClickOptions()) -> None:
        self._client._logger.info(f"UIElement({self._info.path}).click")
        await self.refresh()
        await self._client.actions().click(By.path(self._info.path), options).perform()

    async def drag(self, to: Union["UIElement", Vector2T]) -> None:
        self._client._logger.info(f"UIElement({self._info.path}).drag")
        to_pos = to
        if isinstance(to, UIElement):
            to_pos = to._info.screen_position
        await self.refresh()
        await self._client.actions().drag(By.path(self._info.path), to_pos).perform()

    async def scroll(
        self, delta: Vector2T, options: Optional[ActionScrollOptions] = ActionScrollOptions()
    ):
        self._client._logger.info(f"UIElement({self._info.path}).scroll")

        await self.refresh()
        await self._client.actions().scroll(By.path(self._info.path), delta, options).sleep(
            options.duration_ms
        ).scroll(self._info.screenPosition, Vector2T()).perform()

    async def set_text(self, text: str, options: Optional[SetTextOptions] = SetTextOptions()):
        self._client._logger.info(f"UIElement({self._info.path}).set_text")

        await self._client.actions().set_text(By.path(self._info.path), text, options).perform()
        await self.refresh()

    async def get_text(self) -> str:
        await self.refresh()
        return self._info.text

    async def is_interactable(
        self, options: Optional[QueryObjectInteractableOptions] = QueryObjectInteractableOptions()
    ) -> bool:
        self._client._logger.info(f"UIElement({self._info.path}).is_interactable")

        res = await self._service.request(
            create_query_object_interactable(
                self._info.path, options.check_moving, options.check_raycast
            )
        )
        return res.isInteractable

    async def refresh(self):
        self._info = await self._client.find(By.path(self._info.path))


class UIElementCondition(Condition[UIElement]):
    pass
