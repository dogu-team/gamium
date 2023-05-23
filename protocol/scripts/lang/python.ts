import fsPromises from 'fs/promises';
import path from 'path';

function addLine(lines: string[], fileName: string): void {
  const fileNameWithoutExt = path.parse(fileName).name;
  lines.push(`from .${fileNameWithoutExt} import *;`);
}

interface CreateInitPyOptions {
  dirPostFixExclude?: string[];
  filePostFixExclude?: string[];
}

export async function createInitPyInternal(currentDir: string, option: CreateInitPyOptions): Promise<void> {
  const lines: string[] = [];

  const files = await fsPromises.readdir(currentDir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      if (option.dirPostFixExclude?.some((postFix) => file.name.endsWith(postFix))) {
        continue;
      }
      addLine(lines, file.name);
    } else if (file.isFile()) {
      if (option.filePostFixExclude?.some((postFix) => file.name.endsWith(postFix))) {
        continue;
      }
      addLine(lines, file.name);
    } else {
      throw new Error(`path is not directory or file. path: ${file.name}`);
    }

    if (file.isDirectory()) {
      await createInitPyInternal(path.join(currentDir, file.name), option);
    }
  }
  await fsPromises.writeFile(path.join(currentDir, '__init__.py'), lines.join('\n') + '\n');
}
