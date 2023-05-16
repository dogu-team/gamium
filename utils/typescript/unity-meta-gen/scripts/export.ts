import { execFile } from 'child_process';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const UnityVersion = '2020.3.47f1';
const ProjectPath = path.resolve(process.cwd(), 'UnityMock');

function getBinPath(): string {
  if (process.platform === 'darwin') {
    return `/Applications/Unity/Hub/Editor/${UnityVersion}/Unity.app/Contents/MacOS/Unity`;
  } else if (process.platform === 'win32') {
    return `C:\\Program Files\\Unity\\Hub\\Editor\\${UnityVersion}\\Editor\\Unity.exe`;
  } else {
    throw new Error(`Unsupported platform: ${process.platform}`);
  }
}

async function genMeta(): Promise<void> {
  const binPath = getBinPath();
  const stat = await fs.promises.stat(binPath).catch(() => null);
  if (!stat) {
    throw new Error(`Unity not found at ${binPath}`);
  }
  const { stdout, stderr } = await promisify(execFile)(binPath, ['-batchmode', '-quit', '-projectPath', ProjectPath]);
  if (stdout) {
    console.log(stdout);
  }
  if (stderr) {
    console.error(stderr);
  }
}

genMeta().catch((error) => {
  console.error(error);
  process.exit(1);
});
