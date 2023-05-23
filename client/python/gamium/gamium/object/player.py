from typing import Optional, Union

import numpy as np
from gamium.Protocol import Vector3, ObjectInfoT
from gamium.actions.action_chain import create_move_player
from gamium.igamium_client import IGamiumClient
from gamium.gamium_service import GamiumService
from gamium.internal.logger import Logger
from gamium.locator.by import By
from gamium.locator.locator import Locator
from gamium.options.move_player_options import MovePlayerOptions


class Player:
    def __init__(
        self,
        client: IGamiumClient,
        service: GamiumService,
        info: ObjectInfoT,
    ) -> None:
        self._client = client
        self._service = service
        self._info = info

    async def move(
        self,
        camera_locator: Locator,
        dest: Union[Vector3, Locator],
        options: Optional[MovePlayerOptions] = MovePlayerOptions(),
    ) -> None:
        self._client._logger.info(f"Player({self._info.path}).move. dest: {dest}")

        if isinstance(dest, Locator):
            dest_obj_info = await self._client.find(dest)
            dest_pos = dest_obj_info.position
        else:
            dest_pos = dest

        await self._client.actions().move_player(
            By.path(self._info.path), camera_locator, dest_pos, options
        ).perform()

    async def is_near(self, other_locator: Locator, epsilon: Optional[int] = 10):
        self._client._logger.info(
            f"Player({self._info.path}).is_near. other_locator: {other_locator.str}"
        )

        await self.refresh()

        other_obj_info = await self._client.find(other_locator)
        other_pos = other_obj_info.position

        this_pos_np = np.array(
            [self._info.position.x, self._info.position.y, self._info.position.z]
        )
        other_pos_np = np.array([other_pos.x, other_pos.y, other_pos.z])

        distance = np.linalg.norm(this_pos_np - other_pos_np)
        if distance < epsilon:
            return True
        return False

    async def refresh(self):
        self._info = await self._client.find(By.path(self._info.path))