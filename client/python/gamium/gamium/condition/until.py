from typing import Optional, TypeVar
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


T = TypeVar("T")


class Until:
    @staticmethod
    def object_located(locator: Locator, options: Optional[FindObjectOptions] = FindObjectOptions()) -> ObjectInfoCondition:
        async def func(client: IGamiumClient):
            return await client.find(locator, options)

        return ObjectInfoCondition(f"locate element locator {locator.str}", func)

    @staticmethod
    def objects_located(locator: Locator, options: Optional[FindObjectOptions] = FindObjectOptions()) -> ObjectInfosCondition:
        async def func(client: IGamiumClient):
            return await client.finds(locator, options)

        return ObjectInfosCondition(f"locate element locator {locator.str}", func)

    @staticmethod
    def element_interactable(
        param: T,  # UIElement
        options: Optional[QueryObjectInteractableOptions] = QueryObjectInteractableOptions(),
    ) -> Condition[T]:  # Condition[UIElement]
        async def func(client: IGamiumClient):
            res = await param.is_interactable(options)
            if True == res:
                return param
            else:
                raise GamiumError(
                    ErrorCode.ObjectIsNotInteractable,
                    f"object not interactable. path: {param.info.path}",
                )

        return Condition[T](f"locate element gameObject {param.info.path}", func)
