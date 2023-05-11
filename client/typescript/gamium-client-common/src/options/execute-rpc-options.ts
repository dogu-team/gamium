export interface ExecuteRpcOptions {
  castNumberToFloat: boolean;
}

export function DefaultExecuteRpcOptions(): ExecuteRpcOptions {
  return {
    castNumberToFloat: true,
  };
}
