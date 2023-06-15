import {
  ActionParam,
  AppQuitParamT,
  ErrorCode,
  InputKeyParamT,
  InputMouseParamT,
  InputSetTextParamT,
  MovePlayerParamT,
  ObjectLocatorT,
  ObjectType,
  Param,
  Result,
  SleepParamT,
} from './generated';

type OmitedPackProperty<T> = Omit<T, 'pack'>;
type FilledPlainObject<T> = { [P in keyof T]: NonNullable<T[P]> };
type RemoveBytesToStringProperty<T> = {
  [P in keyof T]: T[P] extends string | Uint8Array ? string : T[P];
};
type FilteredGamiumObject<T> = RemoveBytesToStringProperty<FilledPlainObject<OmitedPackProperty<T>>>;

export type AppQuitParam = FilteredGamiumObject<AppQuitParamT>;
export type InputKeyParam = FilteredGamiumObject<InputKeyParamT>;
export type InputMouseParam = FilteredGamiumObject<InputMouseParamT>;
export type InputSetTextParam = FilteredGamiumObject<InputSetTextParamT>;
export {
  ErrorCode,
  ExecuteRpcBy,
  InputKeyBy,
  InputKeyPressType,
  InputMouseButtonCode,
  InputMousePressType,
  MovePlayerBy,
  ObjectLocatorBy,
  UnityKeyboard,
  UnityKeyCode,
} from './generated';
export { ActionParam };
export { ObjectType };
export { Param };
export { Result };
export type MovePlayerParam = FilteredGamiumObject<MovePlayerParamT>;
export type SleepParam = FilteredGamiumObject<SleepParamT>;
export interface ActionResult {
  error: ErrorResult;
}
export interface InspectObjectOnScreenResult {
  infos: ObjectInfo[];
  hitPoint: Vector3;
}
export interface QueryProfileResult {
  fps: number;
}
export interface QueryScreenResult {
  width: number;
  height: number;
}
export interface ErrorResult {
  code: ErrorCode;
  reason: string;
}

export interface ObjectHierarchyNode {
  name: string;
  path: string;
  children: ObjectHierarchyNode[];
}
export interface ObjectInfo {
  path: string;
  name: string;
  type: ObjectType;
  tag: string[];
  isActive: boolean;
  screenPosition: Vector3;
  screenRectSize: Vector2;
  position: Vector3;
  rotation: Vector4;
  text: string;
}
export type ObjectLocator = FilteredGamiumObject<ObjectLocatorT>;
export interface ObjectsHierarchy {
  name: string;
  children: ObjectHierarchyNode[];
}
export interface Vector2 {
  x: number;
  y: number;
}
export interface Vector3 {
  x: number;
  y: number;
  z: number;
}
export interface Vector4 {
  x: number;
  y: number;
  z: number;
  w: number;
}
