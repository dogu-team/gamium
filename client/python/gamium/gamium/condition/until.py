from typing import List, Optional
from gamium.protocol.generated.Types import ErrorCode
from gamium.condition.condition import (
    Condition,
    ObjectInfoCondition,
    ObjectInfosCondition,
)
from gamium.errors.gamium_error import GamiumError
from gamium.igamium_client import IGamiumClient
from gamium.locator.locator import Locator
from gamium.options.find_objects_options import FindObjectOptions
from gamium.options.query_object_interactable_options import (
    QueryObjectInteractableOptions,
)
from gamium.protocol.types import ObjectInfo
from gamium.utils.generics import T


class Until:
    @staticmethod
    def object_located(locator: Locator, options: FindObjectOptions = FindObjectOptions()) -> ObjectInfoCondition:
        def func(client: IGamiumClient) -> ObjectInfo:
            return client.find(locator, options)

        return ObjectInfoCondition(f"locate element locator {locator.str}", func)

    @staticmethod
    def objects_located(locator: Locator, options: FindObjectOptions = FindObjectOptions()) -> ObjectInfosCondition:
        def func(client: IGamiumClient) -> List[ObjectInfo]:
            return client.finds(locator, options)

        return ObjectInfosCondition(f"locate element locator {locator.str}", func)

    @staticmethod
    def element_interactable(
        param: T,  # UIElement
        options: QueryObjectInteractableOptions = QueryObjectInteractableOptions(),
    ) -> Condition[T]:  # Condition[UIElement]
        def func(client: IGamiumClient) -> T:
            res = param.is_interactable(options)
            if True == res:
                return param
            else:
                raise GamiumError(
                    ErrorCode.ObjectIsNotInteractable,
                    f"object not interactable. path: {param.info.path}",
                )

        return Condition[T](f"locate element gameObject {param.info.path}", func)
