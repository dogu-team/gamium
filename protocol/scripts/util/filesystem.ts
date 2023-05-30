import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import shelljs from 'shelljs';

export async function findFiles(currentDir: string, ext: string): Promise<string[]> {
  const files = await fsPromises.readdir(currentDir, { withFileTypes: true });
  const outPaths: string[] = [];
  for (const file of files) {
    if (file.isDirectory()) {
      const innerRet = await findFiles(path.posix.join(currentDir, file.name), ext);
      outPaths.push(...innerRet);
      continue;
    } else if (file.isFile()) {
      if (path.parse(file.name).ext === ext) {
        outPaths.push(path.posix.join(currentDir, file.name));
      }
    } else {
      throw new Error(`path is not directory or file. path: ${file.name}`);
    }
  }
  return outPaths;
}

export async function deleteDirs(paths: string[]): Promise<void> {
  for (const path of paths) {
    if (fs.existsSync(path)) {
      await fsPromises.rm(path, { recursive: true });
    }
  }
}

export async function createDirs(paths: string[]): Promise<void> {
  for (const path of paths) {
    await fsPromises.mkdir(path, { recursive: true });
  }
}

export async function copyDir(srcDir: string, destDir: string): Promise<void> {
  await fsPromises.mkdir(path.dirname(destDir), { recursive: true });
  shelljs.cp('-R', srcDir, destDir);
}
