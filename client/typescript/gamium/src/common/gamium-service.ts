import {
  ActionsParamT,
  ActionsResultT,
  DumpObjectsHierarchyParamT,
  DumpObjectsHierarchyResultT,
  ExecuteRpcParamT,
  ExecuteRpcResultT,
  FindObjectsParamT,
  FindObjectsResultT,
  GetPageSourceParamT,
  GetPageSourceResultT,
  HelloParamT,
  HelloResultT,
  InspectObjectOnScreenParamT,
  InspectObjectOnScreenResultT,
  InspectObjectWithIdParamT,
  InspectObjectWithIdResultT,
  Param,
  QueryObjectInteractableParamT,
  QueryObjectInteractableResultT,
  QueryProfileParamT,
  QueryProfileResultT,
  QueryScreenParamT,
  QueryScreenResultT,
  RequestT,
  ResponseT,
  Result,
} from './protocols/generated';
import { Plain } from './types';

const _dummyReq = new RequestT();
const _dummyRes = new ResponseT();
declare type GcGaParamTypes = NonNullable<typeof _dummyReq.param>;
declare type GcGaResultTypes = NonNullable<typeof _dummyRes.result>;

export interface PacketTypes<P, R> {
  param: P;
  result: R | undefined;
  paramEnum: Param;
  resultEnum: Result;
}

export const createHello = (param: Plain<HelloParamT>): PacketTypes<HelloParamT, HelloResultT> => {
  return {
    param: new HelloParamT(param.version),
    result: undefined,
    paramEnum: Param.Packets_HelloParam,
    resultEnum: Result.Packets_HelloResult,
  };
};

export const createQueryScreen = (param: Plain<QueryScreenParamT>): PacketTypes<QueryScreenParamT, QueryScreenResultT> => {
  return {
    param: new QueryScreenParamT(),
    result: undefined,
    paramEnum: Param.Packets_QueryScreenParam,
    resultEnum: Result.Packets_QueryScreenResult,
  };
};

export const createFindObjects = (param: Plain<FindObjectsParamT>): PacketTypes<FindObjectsParamT, FindObjectsResultT> => {
  return {
    param: new FindObjectsParamT(param.locator),
    result: undefined,
    paramEnum: Param.Packets_FindObjectsParam,
    resultEnum: Result.Packets_FindObjectsResult,
  };
};

export const createQueryObjectInteractable = (
  param: Plain<QueryObjectInteractableParamT>,
): PacketTypes<QueryObjectInteractableParamT, QueryObjectInteractableResultT> => {
  return {
    param: new QueryObjectInteractableParamT(param.objectId, param.checkMoving, param.checkRaycast),
    result: undefined,
    paramEnum: Param.Packets_QueryObjectInteractableParam,
    resultEnum: Result.Packets_QueryObjectInteractableResult,
  };
};

export const createActions = (param: Plain<ActionsParamT>): PacketTypes<ActionsParamT, ActionsResultT> => {
  return {
    param: new ActionsParamT(param.actions),
    result: undefined,
    paramEnum: Param.Packets_ActionsParam,
    resultEnum: Result.Packets_ActionsResult,
  };
};

export const createExecuteRpc = (param: Plain<ExecuteRpcParamT>): PacketTypes<ExecuteRpcParamT, ExecuteRpcResultT> => {
  return {
    param: new ExecuteRpcParamT(param.by, param.className, param.targetName, param.paramDocuments),
    result: undefined,
    paramEnum: Param.Packets_ExecuteRpcParam,
    resultEnum: Result.Packets_ExecuteRpcResult,
  };
};

export const createDumpObjectsHierarchy = (param: Plain<DumpObjectsHierarchyParamT>): PacketTypes<DumpObjectsHierarchyParamT, DumpObjectsHierarchyResultT> => {
  return {
    param: new DumpObjectsHierarchyParamT(param.objectId, param.depth),
    result: undefined,
    paramEnum: Param.Packets_DumpObjectsHierarchyParam,
    resultEnum: Result.Packets_DumpObjectsHierarchyResult,
  };
};

export const createInspectObjectOnScreen = (
  param: Plain<InspectObjectOnScreenParamT>,
): PacketTypes<InspectObjectOnScreenParamT, InspectObjectOnScreenResultT> => {
  return {
    param: new InspectObjectOnScreenParamT(param.pos, param.screenSize),
    result: undefined,
    paramEnum: Param.Packets_InspectObjectOnScreenParam,
    resultEnum: Result.Packets_InspectObjectOnScreenResult,
  };
};

export const createInspectWithIdScreen = (param: Plain<InspectObjectWithIdParamT>): PacketTypes<InspectObjectWithIdParamT, InspectObjectWithIdResultT> => {
  return {
    param: new InspectObjectWithIdParamT(param.objectId),
    result: undefined,
    paramEnum: Param.Packets_InspectObjectWithIdParam,
    resultEnum: Result.Packets_InspectObjectWithIdResult,
  };
};

export const createGetPageSource = (param: Plain<GetPageSourceParamT>): PacketTypes<GetPageSourceParamT, GetPageSourceResultT> => {
  return {
    param: new GetPageSourceParamT(),
    result: undefined,
    paramEnum: Param.Packets_GetPageSourceParam,
    resultEnum: Result.Packets_GetPageSourceResult,
  };
};

export const createQueryProfile = (param: Plain<QueryProfileParamT>): PacketTypes<QueryProfileParamT, QueryProfileResultT> => {
  return {
    param: new QueryProfileParamT(),
    result: undefined,
    paramEnum: Param.Packets_QueryProfileParam,
    resultEnum: Result.Packets_QueryProfileResult,
  };
};

export interface GamiumRequestOptions {
  timeout: number;
}

export interface GamiumService {
  get connected(): boolean;
  connect(tryCount?: number): Promise<HelloResultT>;
  disconnect(): Promise<void>;
  request<P extends GcGaParamTypes, R extends GcGaResultTypes>(packet: PacketTypes<P, R>, options?: GamiumRequestOptions): Promise<R>;
}
