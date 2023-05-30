import child_process from 'child_process';
import path from 'path';
import os from 'os';
import fs from 'fs';
import { CodeGenElemData } from './codegen-elem';

export interface PythonGenerateOption {
  classExclude: string[];
  interfaceExclude: string[];
  methodsExclude: string[];
  propertiesExclude: string[];
}

function defaultOption(): PythonGenerateOption {
  return {
    classExclude: [],
    interfaceExclude: [],
    methodsExclude: [],
    propertiesExclude: [],
  };
}

export class CodeGenPython {
  constructor(private readonly codeFilePath: string, private readonly option: Partial<PythonGenerateOption> = defaultOption()) {}

  async parse(): Promise<CodeGenElemData[]> {
    const parsePyPath = path.resolve(__dirname, 'python/parse.py');
    let command = 'python3 ' + parsePyPath + ` --file_path ${this.codeFilePath}`;
    if (this.option.classExclude && 0 < this.option.classExclude.length) {
      for (const name of this.option.classExclude) {
        command += ` --class_exclude ${name}`;
      }
    }
    if (this.option.interfaceExclude && 0 < this.option.interfaceExclude.length) {
      for (const name of this.option.interfaceExclude) {
        command += ` --interface_exclude ${name}`;
      }
    }
    if (this.option.methodsExclude && 0 < this.option.methodsExclude.length) {
      for (const name of this.option.methodsExclude) {
        command += ` --methods_exclude ${name}`;
      }
    }
    if (this.option.propertiesExclude && 0 < this.option.propertiesExclude.length) {
      for (const name of this.option.propertiesExclude) {
        command += ` --properties_exclude ${name}`;
      }
    }
    const output_path = path.resolve(os.tmpdir(), 'codegen.json');
    command += ` --output_path ${output_path}`;
    await exec(command);

    const elems = JSON.parse(fs.readFileSync(output_path, 'utf8'));
    const ret = elems['root'] as CodeGenElemData[];
    fs.rmSync(output_path);
    return ret;
  }
}

async function exec(command: string): Promise<void> {
  const proc = child_process.exec(command);
  proc.stdout?.pipe(process.stdout);
  proc.stderr?.pipe(process.stderr);

  return new Promise((resolve, reject) => {
    proc.on('exit', (code) => {
      if (code && code !== 0) {
        reject();
      }
      resolve();
    });
  });
}
