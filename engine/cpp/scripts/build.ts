import { cmake } from '@dogu-dev-private/build-tools';
import path from 'path';
import shelljs from 'shelljs';

export async function build(): Promise<void> {
  console.log('\n\n>> [ build gamium-engine-cpp ]');
  const projPath = path.resolve(__dirname, '..');
  const projectName = 'build';
  shelljs.cd(projPath);

  cmake.generateProject(projPath, projectName);
  cmake.buildProject(projPath, projectName, true);

  return Promise.resolve();
}

(async (): Promise<void> => {
  await build();
})().catch((reason: Error) => {
  console.error(reason);
  process.exit(1);
});
