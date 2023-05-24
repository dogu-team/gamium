from typing import List, Optional, TypeVar
from gamium.protocol.types import ObjectInfo
from gamium.condition.wait_condition import WaitCondition
from gamium.options.wait_options import WaitOptions
from gamium.actions.action_chain import ActionChain
from gamium.actions.key_by import KeyBy
from gamium.locator.locator import Locator
from gamium.options import FindObjectOptions, SendKeyOptions
from abc import *

T = TypeVar("T")


# used internally to prevent circular imports
class IGamiumClient(metaclass=ABCMeta):
    @abstractmethod
    def find(self, locator: Locator, options: Optional[FindObjectOptions] = FindObjectOptions()) -> ObjectInfo:
        pass

    @abstractmethod
    def finds(self, locator: Locator, options: Optional[FindObjectOptions] = FindObjectOptions()) -> List[ObjectInfo]:
        pass

    @abstractmethod
    def actions(self) -> ActionChain:
        pass

    @abstractmethod
    def send_key(self, by: KeyBy, options: Optional[SendKeyOptions] = SendKeyOptions()) -> None:
        pass

    @abstractmethod
    def wait(condition: WaitCondition[T], options: Optional[WaitOptions] = WaitOptions()) -> T:
        pass
