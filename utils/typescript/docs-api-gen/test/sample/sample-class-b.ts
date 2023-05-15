import { SampleClassA } from './sample-class-a';

interface SampleInterface {
  a: number;
  b: string;
}

export class SampleClassB {
  constructor() {}

  public function1(): boolean {
    return true;
  }

  public function2(param: number | string | boolean, param2: SampleInterface): boolean {
    return true;
  }

  public async function3(tryCount = 30): Promise<void> {}

  public async function4(a: SampleClassA): Promise<string> {
    return '';
  }

  public async function5(option: { a: number; b: number }, option2: boolean, option3?: { c: number; d: string }): Promise<{ a: number; c: boolean }> {
    return { a: 1, c: true };
  }
}
