from typing import Optional, Union

import numpy as np
from gamium.protocol.generated.Types.Vector3 import Vector3T
from gamium.protocol.types import ObjectInfo, Vector3
from gamium.actions.action_chain import create_move_player
from gamium.igamium_client import IGamiumClient
from gamium.igamium_service import IGamiumService
from gamium.internal.logger import Logger
from gamium.locator.by import By
from gamium.locator.locator import Locator
from gamium.options.move_player_options import MovePlayerOptions


class Player:
    def __init__(
        self,
        client: IGamiumClient,
        service: IGamiumService,
        info: ObjectInfo,
    ) -> None:
        self._client = client
        self._service = service
        self.info = info

    def move(
        self,
        camera_locator: Locator,
        dest: Union[Vector3, Locator],
        options: MovePlayerOptions = MovePlayerOptions(),
    ) -> None:
        self._client._logger.info(f"Player({self.info.path}).move. dest: {dest}")

        if isinstance(dest, Locator):
            dest_obj_info = self._client.find(dest)
            dest_pos = dest_obj_info.position
        else:
            dest_pos = dest

        self._client.actions().move_player(By.path(self.info.path), camera_locator, dest_pos, options).perform()

    def is_near(self, other_locator: Locator, epsilon: int = 10):
        self._client._logger.info(f"Player({self.info.path}).is_near. other_locator: {other_locator.str}")

        self.refresh()

        other_obj_info = self._client.find(other_locator)
        other_pos = other_obj_info.position

        this_pos_np = np.array([self.info.position.x, self.info.position.y, self.info.position.z])
        other_pos_np = np.array([other_pos.x, other_pos.y, other_pos.z])

        distance = np.linalg.norm(this_pos_np - other_pos_np)
        if distance < epsilon:
            return True
        return False

    def refresh(self):
        self.info = self._client.find(By.path(self.info.path))
