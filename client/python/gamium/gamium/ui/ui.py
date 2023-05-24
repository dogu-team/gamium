from typing import List, Optional, Union
from gamium.Protocol.Types.Vector2 import Vector2T
from gamium.Protocol.Types.Vector3 import Vector3T
from gamium.condition.until import Until
from gamium.object.ui_element import UIElement
from gamium.options.action_click_options import ActionClickOptions
from gamium.options.action_drag_options import ActionDragOptions
from gamium.options.action_scroll_options import ActionScrollOptions
from gamium.protocol_util.types import ObjectInfo
from gamium.igamium_client import IGamiumClient
from gamium.gamium_service import GamiumService
from gamium.internal.logger import Logger
from gamium.locator.locator import Locator
from gamium.options.find_objects_options import FindObjectOptions


class UI:
    def __init__(self, client: IGamiumClient, service: GamiumService):
        self._client = client
        self._service = service

    async def find(
        self, locator: Locator, options: FindObjectOptions = FindObjectOptions()
    ) -> UIElement:
        info = await self._client.wait(Until.object_located(locator, options))
        return UIElement(self._client, self._service, info)

    async def finds(
        self, locator: Locator, options: FindObjectOptions = FindObjectOptions()
    ) -> List[UIElement]:
        infos = await self._client.wait(Until.objects_located(locator, options))
        elements = []
        for info in infos:
            elements.append(UIElement(self._client, self._service, info))
        return elements

    async def click(
        self,
        locator: Locator,
        find_options: Optional[FindObjectOptions] = FindObjectOptions(),
        click_options: Optional[ActionClickOptions] = ActionClickOptions(),
    ):
        elem = await self.find(locator, find_options)
        await self._client.wait(Until.element_interactable(elem))
        await elem.click(click_options)

    async def drag(
        self,
        locator: Locator,
        to: Union[Locator, Vector2T],
        find_options: Optional[FindObjectOptions] = FindObjectOptions(),
        drag_options: Optional[ActionDragOptions] = ActionDragOptions(),
    ):
        elem = await self.find(locator, find_options)
        await self._client.wait(Until.element_interactable(elem))
        to_pos = to
        if isinstance(to, Locator):
            to_elem = await self.find(to)
            to_pos = to_elem._info.screen_position
        await self._client.actions().drag(
            elem._info.screen_position, to_pos, drag_options
        ).perform()

    async def scroll(
        self,
        locator: Locator,
        delta: Vector2T,
        find_options: Optional[FindObjectOptions] = FindObjectOptions(),
        scroll_options: Optional[ActionScrollOptions] = ActionScrollOptions(),
    ):
        elem = await self.find(locator, find_options)
        await self._client.wait(Until.element_interactable(elem))
        await elem.scroll(delta, scroll_options)

    async def set_text(
        self,
        locator: Locator,
        text: str,
        find_options: Optional[FindObjectOptions] = FindObjectOptions(),
    ):
        elem = await self.find(locator, find_options)
        await self._client.wait(Until.element_interactable(elem))
        await elem.set_text(text)

    async def get_text(
        self,
        locator: Locator,
        find_options: Optional[FindObjectOptions] = FindObjectOptions(),
    ):
        elem = await self.find(locator, find_options)
        await self._client.wait(Until.element_interactable(elem))
        await elem.get_text()
