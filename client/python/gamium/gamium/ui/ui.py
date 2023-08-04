import functools
from typing import List, Optional, Union
from gamium.protocol.generated.Types.Vector2 import Vector2T
from gamium.protocol.generated.Types.Vector3 import Vector3T
from gamium.condition.until import Until
from gamium.object.ui_element import UIElement
from gamium.options.action_click_options import ActionClickOptions
from gamium.options.action_drag_options import ActionDragOptions
from gamium.options.action_scroll_options import ActionScrollOptions
from gamium.protocol.types import ObjectInfo, Vector2
from gamium.igamium_client import IGamiumClient
from gamium.igamium_service import IGamiumService
from gamium.internal.logger import Logger
from gamium.locator.locator import Locator
from gamium.options.find_objects_options import FindObjectOptions
from gamium.utils.try_utils import TryResult, tryify


class UI:
    def __init__(self, client: IGamiumClient, service: IGamiumService):
        self._client = client
        self._service = service

    def find(self, locator: Locator, options: FindObjectOptions = FindObjectOptions()) -> UIElement:
        info = self._client.wait(Until.object_located(locator, options))
        return UIElement(self._client, self._service, info)

    def try_find(self, locator: Locator, options: FindObjectOptions = FindObjectOptions()) -> TryResult[UIElement]:
        return tryify(functools.partial(self.find, locator, options))

    def finds(self, locator: Locator, options: FindObjectOptions = FindObjectOptions()) -> List[UIElement]:
        infos = self._client.wait(Until.objects_located(locator, options))
        elements = []
        for info in infos:
            elements.append(UIElement(self._client, self._service, info))
        return elements

    def try_finds(self, locator: Locator, options: FindObjectOptions = FindObjectOptions()) -> TryResult[List[UIElement]]:
        return tryify(functools.partial(self.finds, locator, options))

    def click(
        self,
        locator: Locator,
        find_options: FindObjectOptions = FindObjectOptions(),
        click_options: ActionClickOptions = ActionClickOptions(),
    ):
        elem = self.find(locator, find_options)
        self._client.wait(Until.element_interactable(elem))
        elem.click(click_options)

    def drag(
        self,
        locator: Locator,
        to: Union[Locator, Vector2],
        find_options: FindObjectOptions = FindObjectOptions(),
        drag_options: ActionDragOptions = ActionDragOptions(),
    ):
        elem = self.find(locator, find_options)
        self._client.wait(Until.element_interactable(elem))
        to_pos = Vector2.zero()
        if isinstance(to, Locator):
            to_elem = self.find(to)
            to_pos = Vector2.from_vector3(to_elem.info.screen_position)
        if isinstance(to, Vector2):
            to_pos = to
        elem_pos = Vector2.from_vector3(elem.info.screen_position)
        self._client.actions().drag(elem_pos, to_pos, drag_options).perform()

    def scroll(
        self,
        locator: Locator,
        delta: Vector2,
        find_options: FindObjectOptions = FindObjectOptions(),
        scroll_options: ActionScrollOptions = ActionScrollOptions(),
    ):
        elem = self.find(locator, find_options)
        self._client.wait(Until.element_interactable(elem))
        elem.scroll(delta, scroll_options)

    def set_text(
        self,
        locator: Locator,
        text: str,
        find_options: FindObjectOptions = FindObjectOptions(),
    ):
        elem = self.find(locator, find_options)
        self._client.wait(Until.element_interactable(elem))
        elem.set_text(text)

    def get_text(
        self,
        locator: Locator,
        find_options: FindObjectOptions = FindObjectOptions(),
    ):
        elem = self.find(locator, find_options)
        self._client.wait(Until.element_interactable(elem))
        return elem.get_text()
