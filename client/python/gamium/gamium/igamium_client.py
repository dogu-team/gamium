from typing import List, Optional
from gamium.internal.logger import Logger
from gamium.protocol.types import ObjectInfo
from gamium.condition.wait_condition import WaitCondition
from gamium.options.wait_options import WaitOptions
from gamium.actions.action_chain import ActionChain
from gamium.actions.key_by import KeyBy
from gamium.locator.locator import Locator
from gamium.options import FindObjectOptions, SendKeyOptions
from abc import *

from gamium.utils.generics import T


# used internally to prevent circular imports
class IGamiumClient(metaclass=ABCMeta):
    @abstractmethod
    def is_connected(self) -> bool:
        pass

    @abstractmethod
    def find(self, locator: Locator, options: FindObjectOptions = FindObjectOptions()) -> ObjectInfo:
        pass

    @abstractmethod
    def finds(self, locator: Locator, options: FindObjectOptions = FindObjectOptions()) -> List[ObjectInfo]:
        pass

    @abstractmethod
    def actions(self) -> ActionChain:
        pass

    @abstractmethod
    def send_key(self, by: KeyBy, options: SendKeyOptions = SendKeyOptions()) -> None:
        pass

    @abstractmethod
    def wait(self, condition: WaitCondition[T], options: WaitOptions = WaitOptions()) -> T:
        pass

    @property
    @abstractmethod
    def _logger(self) -> Logger:
        pass
