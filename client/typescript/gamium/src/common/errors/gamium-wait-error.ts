import { ErrorCode } from "../protocols/generated";
import { WaitOptions } from "../options/wait-options";
import { GamiumError } from "./gamium-error";

export class GamiumWaitError extends GamiumError {
  constructor(
    code: ErrorCode,
    reason: string,
    public innerResult?: unknown,
    public tryCount?: number,
    public waitOptions?: Partial<WaitOptions>,
    options?: ErrorOptions
  ) {
    super(code, reason, { innerResult, tryCount, waitOptions }, options);
  }
}
