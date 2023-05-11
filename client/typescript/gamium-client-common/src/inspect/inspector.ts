import { ErrorCode, Vector2T } from "../protocols/generated";
import { GamiumError } from "../errors/gamium-error";
import { GamiumClient } from "../gamium-client";
import {
  createDumpObjectsHierarchy,
  createInspectObjectOnScreen,
  createInspectWithIdScreen,
  GamiumService,
} from "../gamium-service";
import { Plainify } from "../protocols/functions";
import {
  InspectObjectOnScreenResult,
  ObjectInfo,
  ObjectsHierarchy,
  Vector2,
} from "../protocols/types";
import { stringify } from "../common/functions";

export class Inspector {
  constructor(
    protected readonly gamium: GamiumClient,
    protected readonly gamiumService: GamiumService
  ) {}

  async inspectOnPos(
    pos: Vector2,
    screenSize: Vector2
  ): Promise<InspectObjectOnScreenResult> {
    this.gamium.logger.debug?.(`Inspector.insepctOnPos pos:${stringify(pos)}`);
    const result = await this.gamiumService.request(
      createInspectObjectOnScreen({
        pos: new Vector2T(pos.x, pos.y),
        screenSize: new Vector2T(screenSize.x, screenSize.y),
      })
    );
    const { infos, hitPoint } = result;
    return {
      infos: infos.map((info) => Plainify.objectInfo(info)),
      hitPoint: Plainify.vector3(hitPoint),
    };
  }

  async inspect(objectId: string): Promise<ObjectInfo> {
    this.gamium.logger.debug?.(`Inspector.insepct:${objectId}`);
    const res = await this.gamiumService.request(
      createInspectWithIdScreen({ objectId: objectId })
    );
    if (!res.info) {
      throw new GamiumError(
        ErrorCode.ObjectNotFound,
        `inspect.inspect  str:${objectId} not found`
      );
    }
    return Plainify.objectInfo(res.info);
  }

  async dumpHierarchy(
    objectId: string,
    depth: number
  ): Promise<ObjectsHierarchy[]> {
    this.gamium.logger.debug?.(
      `Inspector.dumpHierarchy objectId:${objectId}, depth:${stringify(depth)}`
    );
    const res = await this.gamiumService.request(
      createDumpObjectsHierarchy({ objectId: objectId, depth: depth })
    );
    return res.hierarchies.map((hierarchy) =>
      Plainify.objectsHierarchy(hierarchy)
    );
  }
}
