import { stringify } from "../common/functions";
import { ErrorCode } from "../protocols/generated";

export class GamiumError extends Error {
  constructor(
    public readonly code: ErrorCode,
    public readonly reason: string,
    private readonly etc?: { [key: string]: unknown },
    options?: ErrorOptions
  ) {
    const reasonObj = { code: ErrorCode[code], reason, etc };
    super(stringify(reasonObj, { depth: undefined }), options);
  }
}
