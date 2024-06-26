import { stringifier, StringifyOptions } from './stringifier';

export async function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export function stringify(value: unknown, options?: StringifyOptions): string {
  return stringifier.stringify(value, options);
}

export function stringifyError(value: unknown): string {
  return stringifyAllProps(value);
}

export function stringifyAllProps(value: unknown): string {
  if (null == value) {
    return 'null';
  }
  if (undefined == value) {
    return 'undefined';
  }
  return JSON.stringify(value, Object.getOwnPropertyNames(value), 2).replaceAll('\\n', '\n');
}

export async function* loop(delayMilliseconds: number, count = Infinity): AsyncGenerator<void> {
  for (let i = 0; ; ) {
    if (count !== Infinity) {
      if (!(i < count)) {
        break;
      }
    }
    yield;
    await delay(delayMilliseconds);
    if (count !== Infinity) {
      i++;
    }
  }
}
