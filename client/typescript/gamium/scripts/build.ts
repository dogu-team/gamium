import { exec } from 'child_process';
import { promisify } from 'util';
import { glob } from 'glob';
import fs from 'fs';

const projects = [
  {
    path: './tsconfig.cjs.json',
    replace: {
      dir: 'build/cjs/common/protocols/generated',
      execute: (text: string) => text.replace(/\.js/g, '.cjs'),
    },
    remove: {
      dir: 'build/cjs',
      condition: (file: string) => file.endsWith('.cts'),
    }
  },
  {
    path: './tsconfig.esm.json',
    replace: {
      dir: 'build/esm/common/protocols/generated',
      execute: (text: string) => text.replace(/\.js/g, '.mjs'),
    },
    remove: {
      dir: 'build/esm',
      condition: (file: string) => file.endsWith('.mts'),
    }
  }
]

Promise.all(
projects.map(async ({ path, replace, remove }) => {
  await promisify(exec)(`yarn tsc -p ${path}`);

  async function replaceContents() {
    const files = await glob(`${replace.dir}/**/*.js`);
    await Promise.all(files.map(async (file) => {
      const stat = await fs.promises.stat(file);
      if (!stat.isFile()) {
        return;
      }
      const content = await fs.promises.readFile(file, 'utf8');
      const replaced = replace.execute(content);
      fs.promises.writeFile(file, replaced);
    }));  
  }

  await replaceContents();
  await promisify(exec)(`yarn mjscjs -p ${path}`);

  async function removeFiles() {
    const files = await glob(`${remove.dir}/**/*`);
    await Promise.all(files.map(async (file) => {
      const stat = await fs.promises.stat(file);
      if (!stat.isFile()) {
        return;
      }
      if (remove.condition(file)) {
        await fs.promises.unlink(file);
      }
    }));
  }

  await removeFiles();
})).
catch((error) => {
  console.error(error);
  process.exit(1);
});
