/**
 * @note henry: for browser and node.js compatibility
 */
import { stringifyAllProps } from "./functions";

import util from "util";

/**
 * @reference nodejs util.inspect
 */
export interface StringifyOptions {
  /**
   * @default false
   */
  showHidden?: boolean;

  /**
   * @default 10
   */
  depth?: number;

  /**
   * @default true
   */
  colors?: boolean;

  /**
   * @default true
   */
  customInspect?: boolean;

  /**
   * @default false
   */
  showProxy?: boolean;

  /**
   * @default 100
   */
  maxArrayLength?: number;

  /**
   * @default 10000
   */
  maxStringLength?: number;

  /**
   * @default 100
   */
  breakLength?: number;

  /**
   * @default true
   */
  compact?: boolean;

  /**
   * @default false
   */
  sorted?: boolean | ((a: string, b: string) => number);

  /**
   * @default false
   */
  getters?: "get" | "set" | boolean;

  /**
   * @default false
   */
  numericSeparator?: boolean;
}

type FilledStringifyOptions = Required<StringifyOptions>;

function defaultStringifyOptions(): FilledStringifyOptions {
  return {
    showHidden: false,
    depth: 10,
    colors: true,
    customInspect: true,
    showProxy: false,
    maxArrayLength: 100,
    maxStringLength: 10000,
    breakLength: 100,
    compact: true,
    sorted: false,
    getters: false,
    numericSeparator: false,
  };
}

function fillStringifyOptions(
  options?: StringifyOptions
): FilledStringifyOptions {
  return { ...defaultStringifyOptions(), ...options };
}

interface Stringifier {
  stringify(value: unknown, options?: StringifyOptions): string;
}

class NodeStringifier implements Stringifier {
  util: any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  inspect: Function;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
    this.util = util;
    if (typeof this.util !== "object") {
      throw new Error("Cannot load util");
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    this.inspect = this.util.inspect;
    if (typeof this.inspect !== "function") {
      throw new Error("Cannot load util.inspect");
    }
  }

  stringify(value: unknown, options?: StringifyOptions): string {
    if (typeof value === "object") {
      try {
        const filledOptions = fillStringifyOptions(options);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.inspect(value, filledOptions);
      } catch (error) {
        return stringifyAllProps(value);
      }
    } else {
      return String(value);
    }
  }
}

class BrowserStringifier implements Stringifier {
  stringify(value: unknown, options?: StringifyOptions): string {
    if (typeof value === "object") {
      return stringifyAllProps(value);
    } else {
      return String(value);
    }
  }
}

export const stringifier =
  typeof process === "object"
    ? new NodeStringifier()
    : new BrowserStringifier();
