import fsPromises from 'fs/promises';
import path from 'path';
import shelljs from 'shelljs';
import * as filesystem from './util/filesystem';
import { formatFbs, lowerGamiumNamespace } from './lang/flatbufferFormatter';
import * as buildToolsProcess from './util/process';
import * as time from './util/time';
import * as typescript from './lang/typescript';
import * as python from './lang/python';

const REPO_PATH = path.resolve(__dirname, '..', '..');
const PROTOCOL_PATH = path.resolve(REPO_PATH, 'protocol');

const FBS_DIRNAME = 'fbs';
const EXPORT_DIRNAME = '.export';
const MODIFIED_FBS_DIRNAME = '.modified-fbs';

const FLATC_COMMON_OPTION = [
  '--gen-object-api',
  '--no-cpp-direct-copy',
  '--no-prefix',
  '--scoped-enums',
  '--natural-utf8',
  '--reflect-types',
  '--force-empty',
  '--force-empty-vectors',
].join(' ');

const LANGUAGES = {
  cpp: {
    export_dir: `${EXPORT_DIRNAME}/cpp`,
    fbs_dir: `${MODIFIED_FBS_DIRNAME}/cpp`,
    protocol_path: `${REPO_PATH}/engine/cpp/src/include/Internal/Protocol`,
    protocol_delete_path: `${REPO_PATH}/engine/cpp/src/include/Internal/Protocol`,
  },
  csharp: {
    export_dir: `${EXPORT_DIRNAME}/csharp`,
    fbs_dir: `${MODIFIED_FBS_DIRNAME}/csharp`,
    protocol_path: `${REPO_PATH}/engine/unity/Runtime/Public/Protocol/FlatBufferGenerated`,
    protocol_delete_path: `${REPO_PATH}/engine/unity/Runtime/Public/Protocol/FlatBufferGenerated`,
  },
  typescript: {
    export_dir: `${EXPORT_DIRNAME}/typescript`,
    fbs_dir: `${MODIFIED_FBS_DIRNAME}/typescript`,
    protocol_path: `${REPO_PATH}/client/typescript/gamium/src/common/protocols/generated`,
    protocol_delete_path: `${REPO_PATH}/client/typescript/gamium/src/common/protocols/generated`,
  },
  python: {
    export_dir: `${EXPORT_DIRNAME}/python`,
    fbs_dir: `${MODIFIED_FBS_DIRNAME}/python`,
    protocol_path: `${REPO_PATH}/client/python/gamium`,
    protocol_delete_path: `${REPO_PATH}/client/python/gamium/Protocol`,
  },
};

const DOCKER_WORK_PATH = '/app/host';
const DOCKER_IMAGE_NAME = 'flatbuffer-exporter';
const DOCKER_CONTAINER_NAME = 'flatbuffer-exporter-container';

async function prepare(): Promise<void> {
  for (const lang of Object.keys(LANGUAGES)) {
    const prop = LANGUAGES[lang as keyof typeof LANGUAGES];
    await filesystem.deleteDirs([prop.export_dir]);
    await filesystem.createDirs([prop.export_dir]);

    await filesystem.deleteDirs([prop.fbs_dir]);
    await filesystem.copyDir(`${PROTOCOL_PATH}/${FBS_DIRNAME}`, `${PROTOCOL_PATH}/${prop.fbs_dir}`);

    await filesystem.deleteDirs([prop.protocol_delete_path]);
  }
}

function buildExporter(): Promise<void> {
  return buildToolsProcess.createProcess(`docker build --platform linux/amd64 -t ${DOCKER_IMAGE_NAME} .`);
}

async function runExporter(): Promise<void> {
  try {
    await buildToolsProcess.createProcess(`docker rm -f ${DOCKER_CONTAINER_NAME}`);
  } catch (error) {
    console.log(`Container ${DOCKER_CONTAINER_NAME} kill error ignored ${error}.`);
  }
  await buildToolsProcess.createProcess(
    `docker run -di --volume=${PROTOCOL_PATH}:${DOCKER_WORK_PATH} --workdir=${DOCKER_WORK_PATH} --name=${DOCKER_CONTAINER_NAME} ${DOCKER_IMAGE_NAME} bash`,
  );
}

function formatFbslist(fbslist: string[]): Promise<void> {
  for (const fbs of fbslist) {
    formatFbs(fbs);
  }
  return Promise.resolve();
}

async function exportCpp(fbslist: string[]): Promise<void> {
  fbslist = fbslist.map((fbs) => {
    return fbs.replace(`${FBS_DIRNAME}/`, `${LANGUAGES.cpp.fbs_dir}/`);
  });
  return buildToolsProcess.createProcess(
    `docker exec ${DOCKER_CONTAINER_NAME} /bin/bash --login -c ` +
      `"source /root/.bashrc && flatc --cpp -I ${LANGUAGES.cpp.fbs_dir} -o ${LANGUAGES.cpp.export_dir} ${FLATC_COMMON_OPTION} ${fbslist.join(' ')}"`,
  );
}

async function exportCsharp(fbslist: string[]): Promise<void> {
  fbslist = fbslist.map((fbs) => {
    return fbs.replace(`${FBS_DIRNAME}/`, `${LANGUAGES.csharp.fbs_dir}/`);
  });
  return buildToolsProcess.createProcess(
    `docker exec ${DOCKER_CONTAINER_NAME} /bin/bash --login -c ` +
      `"source /root/.bashrc && flatc --csharp -I ${LANGUAGES.csharp.fbs_dir} -o ${LANGUAGES.csharp.export_dir} ${FLATC_COMMON_OPTION} ${fbslist.join(' ')}"`,
  );
}

async function exportTypescript(fbslist: string[]): Promise<void> {
  fbslist = fbslist.map((fbs) => {
    return fbs.replace(`${FBS_DIRNAME}/`, `${LANGUAGES.typescript.fbs_dir}/`);
  });
  await buildToolsProcess.createProcess(
    `docker exec ${DOCKER_CONTAINER_NAME} /bin/bash --login -c ` +
      `"source /root/.bashrc &&flatc --ts -I ${LANGUAGES.typescript.fbs_dir} -o ${LANGUAGES.typescript.export_dir} ${FLATC_COMMON_OPTION} ${fbslist.join(
        ' ',
      )}"`,
  );
  return buildToolsProcess.createProcess(`prettier --loglevel warn --write ${LANGUAGES.typescript.export_dir}`);
}

async function exportPython(fbslist: string[]): Promise<void> {
  fbslist = fbslist.map((fbs) => {
    return fbs.replace(`${FBS_DIRNAME}/`, `${LANGUAGES.python.fbs_dir}/`);
  });
  for (const fbs of fbslist) {
    lowerGamiumNamespace(`${PROTOCOL_PATH}/${fbs}`);
  }
  return buildToolsProcess.createProcess(
    `docker exec ${DOCKER_CONTAINER_NAME} /bin/bash --login -c ` +
      `"source /root/.bashrc && flatc --python -I ${LANGUAGES.python.fbs_dir} -o ${LANGUAGES.python.export_dir} ${FLATC_COMMON_OPTION} ${fbslist.join(' ')}"`,
  );
}

async function formatTypescriptNamespace(): Promise<void> {
  shelljs.ls(`${LANGUAGES.typescript.export_dir}/*.ts`).forEach((file) => {
    shelljs.rm(file);
  });

  await typescript.createIndexTsInternal(LANGUAGES.typescript.export_dir, {
    dirPostFixExclude: [],
    filePostFixExclude: ['.d.ts'],
  });
  return Promise.resolve();
}

async function formatPythonNamespace(): Promise<void> {
  shelljs.ls(`${LANGUAGES.python.export_dir}/*.py`).forEach((file) => {
    shelljs.rm(file);
  });

  await python.createInitPyInternal(LANGUAGES.python.export_dir, {
    dirPostFixExclude: [],
    filePostFixExclude: ['__init__.py'],
  });
  return Promise.resolve();
}

async function copyToProjects(): Promise<void> {
  for (const lang of Object.keys(LANGUAGES)) {
    const prop = LANGUAGES[lang as keyof typeof LANGUAGES];
    await fsPromises.cp(prop.export_dir, prop.protocol_path, {
      recursive: true,
    });
  }
}

async function run(): Promise<void> {
  const fbslist = await filesystem.findFiles(FBS_DIRNAME, '.fbs');
  await time.checkTime('formatFbslist', formatFbslist(fbslist));

  await time.checkTime('prepare', prepare());
  await time.checkTime('buildExporter', buildExporter());
  await time.checkTime('runExporter', runExporter());
  await Promise.all([
    time.checkTime('exportCpp', exportCpp(fbslist)),
    time.checkTime('exportTypescript', exportTypescript(fbslist)),
    time.checkTime('exportCsharp', exportCsharp(fbslist)),
    time.checkTime('exportPython', exportPython(fbslist)),
  ]);

  await Promise.all([time.checkTime('createIndexTs', formatTypescriptNamespace()), time.checkTime('createInitPy', formatPythonNamespace())]);

  await time.checkTime('copyToProjects', copyToProjects());
}

async function main(): Promise<void> {
  await time.checkTime('run', run());
}

main().catch((reason) => {
  console.error(reason);
  process.exit(1);
});
