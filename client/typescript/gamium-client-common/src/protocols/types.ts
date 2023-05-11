import {
  ActionParam,
  AppQuitParamT,
  ChangeConfigurationResultT,
  ConfigurationT,
  DumpObjectsHierarchyParamT,
  EnvT,
  ErrorResultT,
  ExecuteRpcParamT,
  ExecuteRpcResultT,
  HelloParamT,
  InputKeyParamT,
  InputMouseParamT,
  InputSetTextParamT,
  MovePlayerParamT,
  ObjectLocatorT,
  ObjectType,
  Param,
  QueryObjectInteractableParamT,
  QueryObjectInteractableResultT,
  QueryProfileParamT,
  QueryProfileResultT,
  QueryScreenParamT,
  QueryScreenResultT,
  Result,
  SleepParamT,
} from "./generated";

type OmitedPackProperty<T> = Omit<T, "pack">;
type FilledPlainObject<T> = { [P in keyof T]: NonNullable<T[P]> };
type RemoveBytesToStringProperty<T> = {
  [P in keyof T]: T[P] extends string | Uint8Array ? string : T[P];
};
type FilteredGamiumObject<T> = RemoveBytesToStringProperty<
  FilledPlainObject<OmitedPackProperty<T>>
>;

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
} from "./generated";
export { ActionParam };
export { ObjectType };
export { Param };
export { Result };
export type MovePlayerParam = FilteredGamiumObject<MovePlayerParamT>;
export type SleepParam = FilteredGamiumObject<SleepParamT>;
export interface ActionResult {
  error: ErrorResult;
}
export interface ActionsParam {
  actionsType: ActionParam[];
  actions: (
    | AppQuitParam
    | InputKeyParam
    | InputMouseParam
    | InputSetTextParam
    | MovePlayerParam
    | SleepParam
  )[];
}
export interface ActionsResult {
  results: ActionResult[];
}
export interface ChangeConfigurationParam {
  config: Configuration;
}
export type ChangeConfigurationResult =
  FilteredGamiumObject<ChangeConfigurationResultT>;
export type DumpObjectsHierarchyParam =
  FilteredGamiumObject<DumpObjectsHierarchyParamT>;
export interface DumpObjectsHierarchyResult {
  hierarchies: ObjectsHierarchy[];
}
export type Env = FilteredGamiumObject<EnvT>;
export type ExecuteRpcParam = FilteredGamiumObject<ExecuteRpcParamT>;
export type ExecuteRpcResult = FilteredGamiumObject<ExecuteRpcResultT>;
export interface FindObjectsParam {
  locator: ObjectLocator;
}
export interface FindObjectsResult {
  infos: ObjectInfo[];
}
export type HelloParam = FilteredGamiumObject<HelloParamT>;
export interface HelloResult {
  appName: string;
  appVersion: string;
  gamiumVersion: string;
  framesFromStart: bigint;
  secondsFromStart: number;
  clientSequence: number;
  envs: Env[];
}
export interface InspectObjectOnScreenParam {
  pos: Vector2;
  screenSize: Vector2;
}
export interface InspectObjectOnScreenResult {
  infos: ObjectInfo[];
  hitPoint: Vector3;
}
export interface InspectObjectWithIdParam {
  objectId: string;
}
export interface InspectObjectWithIdResult {
  info: ObjectInfo;
}
export type QueryObjectInteractableParam =
  FilteredGamiumObject<QueryObjectInteractableParamT>;
export type QueryObjectInteractableResult =
  FilteredGamiumObject<QueryObjectInteractableResultT>;
export type QueryProfileParam = FilteredGamiumObject<QueryProfileParamT>;
export type QueryProfileResult = FilteredGamiumObject<QueryProfileResultT>;
export type QueryScreenParam = FilteredGamiumObject<QueryScreenParamT>;
export type QueryScreenResult = FilteredGamiumObject<QueryScreenResultT>;
export type Configuration = FilteredGamiumObject<ConfigurationT>;
export type ErrorResult = FilteredGamiumObject<ErrorResultT>;
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
export interface Request {
  seq: number;
  paramType: Param;
  param:
    | ActionsParam
    | ChangeConfigurationParam
    | DumpObjectsHierarchyParam
    | ExecuteRpcParam
    | FindObjectsParam
    | HelloParam
    | InspectObjectOnScreenParam
    | InspectObjectWithIdParam
    | QueryObjectInteractableParam
    | QueryProfileParam
    | QueryScreenParam;
}
export interface Response {
  seq: number;
  error: ErrorResult;
  resultType: Result;
  result:
    | ActionsResult
    | ChangeConfigurationResult
    | DumpObjectsHierarchyResult
    | ExecuteRpcResult
    | FindObjectsResult
    | HelloResult
    | InspectObjectOnScreenResult
    | InspectObjectWithIdResult
    | QueryObjectInteractableResult
    | QueryProfileResult
    | QueryScreenResult;
}
