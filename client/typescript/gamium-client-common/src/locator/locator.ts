import { By } from './by';

export type Locator = By;

export function isLocator(x: unknown): x is Locator {
  return x instanceof By;
}
