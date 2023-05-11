import * as gl from "gl-matrix";
import { stringifyAllProps } from "../common/functions";
import { GamiumClient } from "../gamium-client";
import { GamiumService } from "../gamium-service";
import { By } from "../locator/by";
import { isLocator, Locator } from "../locator/locator";
import {
  DefaultMovePlayerOptions,
  MovePlayerOptions,
} from "../options/move-player-options";
import { refreshObjectInfo, Zero } from "../protocols/functions";
import { ObjectInfo, Vector3 } from "../protocols/types";

export class Player {
  constructor(
    protected readonly game: GamiumClient,
    protected readonly gamiumService: GamiumService,
    public info: ObjectInfo
  ) {}

  async move(
    cameraLocator: Locator,
    dest: Vector3 | Locator,
    options: Partial<MovePlayerOptions> = DefaultMovePlayerOptions()
  ): Promise<void> {
    this.game.logger.info(
      `Player(${this.info.path.toString()}).move dest:${stringifyAllProps(
        dest
      )}`
    );
    let destPos = Zero.vector3();
    if (isLocator(dest)) {
      const destObjectInfo = await this.game.find(dest);
      destPos = destObjectInfo.position;
    } else {
      destPos = dest;
    }
    await this.game
      .actions()
      .movePlayer(By.path(this.info.path), cameraLocator, destPos, options)
      .perform();
  }

  async isNear(
    otherLocator: Locator,
    option: { epsilon: number } = { epsilon: 10 }
  ): Promise<boolean> {
    this.game.logger.info(
      `Player(${this.info.path.toString()}).isNear other:${stringifyAllProps(
        otherLocator
      )}`
    );
    await this.refresh();
    const thisPosition = this.info.position;
    const otherPosition = (await this.game.find(otherLocator)).position;
    const dist = gl.vec3.dist(
      [thisPosition.x, thisPosition.y, thisPosition.z],
      [otherPosition.x, otherPosition.y, otherPosition.z]
    );
    if (dist < option.epsilon) {
      return true;
    }
    return false;
  }

  async refresh(): Promise<void> {
    this.info = await refreshObjectInfo(this.game, this.info);
  }
}
