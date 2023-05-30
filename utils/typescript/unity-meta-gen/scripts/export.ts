import { execFile } from 'child_process';
import fs from 'fs';
import os from 'os';
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

export function newNodeEnv(): NodeJS.ProcessEnv {
  const newEnv: NodeJS.ProcessEnv = {};
  Object.keys(process.env).forEach((key) => {
    if (key.toLowerCase().startsWith('node_')) return;
    if (key.toLowerCase().startsWith('npm_')) return;
    if (key.toLowerCase().startsWith('nvm_')) return;
    newEnv[key] = process.env[key];
  });
  return newEnv;
}

async function genMeta(): Promise<void> {
  const binPath = getBinPath();
  const stat = await fs.promises.stat(binPath).catch(() => null);
  const logPath = path.resolve(os.tmpdir(), 'unity_buildlog.txt');
  if (!stat) {
    throw new Error(`Unity not found at ${binPath}`);
  }
  try {
    const { stdout, stderr } = await promisify(execFile)(binPath, ['-batchmode', '-quit', '-projectPath', ProjectPath, '-logFile', logPath], {
      env: newNodeEnv(),
    });
    if (stdout) {
      console.log(stdout);
    }
    if (stderr) {
      console.error(stderr);
    }
  } catch (e) {
    console.error(e);
  } finally {
    if (fs.existsSync(logPath)) {
      console.log(fs.readFileSync(logPath, 'utf-8'));
      fs.rmSync(logPath);
    }
  }
}

genMeta().catch((error) => {
  console.error(error);
  process.exit(1);
});
