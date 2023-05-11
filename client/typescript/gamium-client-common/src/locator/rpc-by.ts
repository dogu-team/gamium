import { ExecuteRpcBy } from "../protocols/generated";

export class RpcBy {
  constructor(
    public readonly by: ExecuteRpcBy,
    public readonly className: string,
    public readonly targetName: string,
    public readonly params: unknown[]
  ) {}
  static method(
    classPath: string,
    methodName: string,
    ...params: unknown[]
  ): RpcBy {
    return new RpcBy(ExecuteRpcBy.Method, classPath, methodName, params ?? []);
  }
  static field(classPath: string, fieldName: string): RpcBy {
    return new RpcBy(ExecuteRpcBy.Field, classPath, fieldName, []);
  }
  static property(classPath: string, propertyName: string): RpcBy {
    return new RpcBy(ExecuteRpcBy.Property, classPath, propertyName, []);
  }
}
