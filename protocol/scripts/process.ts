import { exec } from 'child_process';

export function createProcess(command: string): Promise<void> {
  return new Promise((resolve, reject): void => {
    const process = exec(command);
    process.on('close', (code: number | null): void => {
      if (code != null && code === 0) {
        resolve();
      } else {
        reject(code);
      }
    });
    if (process.stdout != null) {
      process.stdout.setEncoding('utf8');
      process.stdout.on('data', console.info);
    }
    if (process.stderr != null) {
      process.stderr.setEncoding('utf8');
      process.stderr.on('data', console.error);
    }
  });
}
