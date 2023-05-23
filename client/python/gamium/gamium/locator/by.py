from gamium.Protocol.Types.ObjectLocatorBy import ObjectLocatorBy
from gamium.Protocol.Types import ObjectLocator


class By:
    def __init__(self, by: ObjectLocatorBy, str: str):
        self.by = by
        self.str = str

    @staticmethod
    def path(str: str):
        return By(ObjectLocatorBy.Path, str)

    @staticmethod
    def tag(str: str):
        return By(ObjectLocatorBy.Tag, str)
