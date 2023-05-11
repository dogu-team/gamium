import { GamiumError } from './errors/gamium-error';

export async function tryify<T>(promise: Promise<T>): Promise<TryResult<T>> {
  try {
    const result = await promise;
    return { success: true, value: result };
  } catch (error) {
    if (error instanceof GamiumError) {
      return { success: false, error: error };
    }
    throw error;
  }
}

export interface TryValueResult<Type> {
  success: true;
  value: Type;
}

export interface TryErrorResult {
  success: false;
  error: GamiumError;
}

export type TryResult<Type> = TryValueResult<Type> | TryErrorResult;
