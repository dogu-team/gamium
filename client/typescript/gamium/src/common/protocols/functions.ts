import {
  ObjectHierarchyNodeT,
  ObjectInfoT,
  ObjectsHierarchyT,
  Vector2T,
  Vector3T,
  Vector4T,
} from "./generated";
import { GamiumClient } from "../gamium-client";
import { By } from "../locator/by";
import {
  ObjectHierarchyNode,
  ObjectInfo,
  ObjectsHierarchy,
  Vector2,
  Vector3,
  Vector4,
} from "./types";

export async function refreshObjectInfo(
  game: GamiumClient,
  info: ObjectInfo
): Promise<ObjectInfo> {
  return await game.find(By.path(info.path.toString()));
}

export class Zero {
  static vector2(): Vector2 {
    return { x: 0, y: 0 };
  }

  static vector3(): Vector3 {
    return { x: 0, y: 0, z: 0 };
  }

  static vector4(): Vector4 {
    return { x: 0, y: 0, z: 0, w: 0 };
  }
}

export class Plainify {
  static string(value: string | Uint8Array | null): string {
    return typeof value === "string" ? value : value?.toString() ?? "";
  }

  static vector2(value: Vector2T | null): Vector2 {
    const { x, y } = value ?? Zero.vector2();
    return { x, y };
  }

  static vector3(value: Vector3T | null): Vector3 {
    const { x, y, z } = value ?? Zero.vector3();
    return { x, y, z };
  }

  static vector4(value: Vector4T | null): Vector4 {
    const { x, y, z, w } = value ?? Zero.vector4();
    return { x, y, z, w };
  }

  static objectInfo(value: ObjectInfoT): ObjectInfo {
    const {
      path,
      name,
      text,
      screenPosition,
      screenRectSize,
      position,
      rotation,
      ...rest
    } = value;
    return {
      path: Plainify.string(path),
      name: Plainify.string(name),
      text: Plainify.string(text),
      screenPosition: Plainify.vector3(screenPosition),
      screenRectSize: Plainify.vector2(screenRectSize),
      position: Plainify.vector3(position),
      rotation: Plainify.vector4(rotation),
      ...rest,
    };
  }

  static objectHierarchyNode(value: ObjectHierarchyNodeT): ObjectHierarchyNode {
    const { name, path, children } = value;
    return {
      name: Plainify.string(name),
      path: Plainify.string(path),
      children: children.map((child) => Plainify.objectHierarchyNode(child)),
    };
  }

  static objectsHierarchy(value: ObjectsHierarchyT): ObjectsHierarchy {
    const { name, children } = value;
    return {
      name: Plainify.string(name),
      children: children.map((child) => Plainify.objectHierarchyNode(child)),
    };
  }
}
