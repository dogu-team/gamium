import { GamiumWaitError } from '../../errors/gamium-wait-error';
import { GamiumClient } from '../../gamium-client';
import { DefaultWaitOptions, WaitOptions } from '../../options/wait-options';
import { ErrorCode } from '../../protocols/generated';
import { WaitCondition } from '../../wait-condition';
import { delay } from '../functions';

export const waitGeneric = async <Type>(
  GamiumClient: GamiumClient,
  condition: WaitCondition<Type>,
  option: Partial<WaitOptions> = DefaultWaitOptions(),
): Promise<Type> => {
  const optionMixed: WaitOptions = { ...DefaultWaitOptions(), ...option };
  const callCondition: (cond: typeof condition) => Promise<Type> = async (condition) => {
    if ('then' in condition) {
      return await condition;
    }
    if ('message' in condition && 'contidionFunc' in condition) {
      return await condition.contidionFunc(GamiumClient);
    }
    const conditionRet = condition(GamiumClient);
    if ('then' in conditionRet) {
      return await conditionRet;
    }
    return conditionRet;
  };
  const startTime = Date.now();
  let lastCallTime = Date.now();

  let i = 0;
  const error = new GamiumWaitError(ErrorCode.Timeout, 'wait timeout');
  error.waitOptions = optionMixed;

  for (i = 0; i < Infinity; i++) {
    error.tryCount = i;
    try {
      if (Date.now() - startTime > optionMixed.timeoutMs) {
        break;
      }
      lastCallTime = Date.now();
      const conditionRet = await callCondition(condition);
      error.innerResult = conditionRet;
      if (conditionRet) {
        return conditionRet;
      }
    } catch (e: unknown) {
      error.cause = e as Error;
      if (!optionMixed.ignoreError) {
        break;
      }
    }
    const remainIntervalMs = optionMixed.intervalMs - (Date.now() - lastCallTime);
    if (1 < remainIntervalMs) {
      await delay(remainIntervalMs - 1);
    }
  }
  throw error;
};
