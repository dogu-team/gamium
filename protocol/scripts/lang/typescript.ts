import fsPromises from 'fs/promises';
import path from 'path';

function addLine(lines: string[], fileName: string): void {
  const fileNameWithoutExt = path.parse(fileName).name;
  lines.push(`export * from './${fileNameWithoutExt}';`);
}

interface CreateIndexTsOptions {
  dirPostFixExclude?: string[];
  filePostFixExclude?: string[];
}

export async function createIndexTsInternal(currentDir: string, option: CreateIndexTsOptions): Promise<void> {
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
      await createIndexTsInternal(path.join(currentDir, file.name), option);
    }
  }
  await fsPromises.writeFile(path.join(currentDir, 'index.ts'), lines.join('\n') + '\n');
}
