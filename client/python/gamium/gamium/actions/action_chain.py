from gamium.gamium_service import GamiumService


class ActionChain:
    def __init__(self, service: GamiumService) -> None:
        self._service = service

    
    def __add_action(self, action: Action) -> None:
        pass
