import fsPromises from 'fs/promises';
import path from 'path';
import shelljs from 'shelljs';
import * as filesystem from './filesystem';
import { formatFbs } from './flatbufferFormatter';
import * as buildToolsProcess from './process';
import * as time from './time';
import * as typescript from './typescript';

const REPO_DIR = path.resolve(__dirname, '..', '..');
const PROTOCOL_DIR = path.resolve(REPO_DIR, 'protocol');
const FBS_DIR = 'fbs';

const EXPORT_DIR = '.export';
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
  cpp: { export_dir: `${EXPORT_DIR}/cpp`, protocol_dir: `${REPO_DIR}/engine/cpp/src/include/Internal/Protocol` },
  csharp: { export_dir: `${EXPORT_DIR}/csharp`, protocol_dir: `${REPO_DIR}/engine/unity/Runtime/Public/Protocol/FlatBufferGenerated` },
  typescript: { export_dir: `${EXPORT_DIR}/typescript`, protocol_dir: `${REPO_DIR}/client/typescript/gamium/src/common/protocols/generated` },
  python: { export_dir: `${EXPORT_DIR}/python`, protocol_dir: `${REPO_DIR}/client/python/gamium/protocols/generated` },
};

const DOCKER_WORK_DIR = '/app/host';
const DOCKER_IMAGE_NAME = 'flatbuffer-exporter';
const DOCKER_CONTAINER_NAME = 'flatbuffer-exporter-container';

async function prepare(): Promise<void> {
  for (const lang of Object.keys(LANGUAGES)) {
    const prop = LANGUAGES[lang as keyof typeof LANGUAGES];
    await filesystem.deleteDirs([prop.export_dir]);
    await filesystem.createDirs([prop.export_dir]);

    await filesystem.deleteDirs([prop.protocol_dir]);
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
  return buildToolsProcess.createProcess(
    `docker run -di --volume=${PROTOCOL_DIR}:${DOCKER_WORK_DIR} --workdir=${DOCKER_WORK_DIR} --name=${DOCKER_CONTAINER_NAME} ${DOCKER_IMAGE_NAME} bash`,
  );
}

function formatFbslist(fbslist: string[]): Promise<void> {
  for (const fbs of fbslist) {
    formatFbs(fbs);
  }
  return Promise.resolve();
}

async function exportCpp(fbslist: string[]): Promise<void> {
  return buildToolsProcess.createProcess(
    `docker exec ${DOCKER_CONTAINER_NAME} /bin/bash --login -c ` +
      `"source /root/.bashrc && flatc --cpp -I ${FBS_DIR} -o ${LANGUAGES.cpp.export_dir} ${FLATC_COMMON_OPTION} ${fbslist.join(' ')}"`,
  );
}

async function exportCsharp(fbslist: string[]): Promise<void> {
  return buildToolsProcess.createProcess(
    `docker exec ${DOCKER_CONTAINER_NAME} /bin/bash --login -c ` +
      `"source /root/.bashrc && flatc --csharp -I ${FBS_DIR} -o ${LANGUAGES.csharp.export_dir} ${FLATC_COMMON_OPTION} ${fbslist.join(' ')}"`,
  );
}

async function exportTypescript(fbslist: string[]): Promise<void> {
  await buildToolsProcess.createProcess(
    `docker exec ${DOCKER_CONTAINER_NAME} /bin/bash --login -c ` +
      `"source /root/.bashrc &&flatc --ts -I ${FBS_DIR} -o ${LANGUAGES.typescript.export_dir} ${FLATC_COMMON_OPTION} ${fbslist.join(' ')}"`,
  );
  return buildToolsProcess.createProcess(`prettier --loglevel warn --write ${LANGUAGES.typescript.export_dir}`);
}

async function exportPython(fbslist: string[]): Promise<void> {
  return buildToolsProcess.createProcess(
    `docker exec ${DOCKER_CONTAINER_NAME} /bin/bash --login -c ` +
      `"source /root/.bashrc && flatc --python -I ${FBS_DIR} -o ${LANGUAGES.python.export_dir} ${FLATC_COMMON_OPTION} ${fbslist.join(' ')}"`,
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

async function copyToProjects(): Promise<void> {
  for (const lang of Object.keys(LANGUAGES)) {
    const prop = LANGUAGES[lang as keyof typeof LANGUAGES];
    await fsPromises.cp(prop.export_dir, prop.protocol_dir, {
      recursive: true,
    });
  }
}

async function run(): Promise<void> {
  await time.checkTime('prepare', prepare());
  await time.checkTime('buildExporter', buildExporter());
  await time.checkTime('runExporter', runExporter());
  const fbslist = await filesystem.findFiles(FBS_DIR, '.fbs');
  await time.checkTime('formatFbslist', formatFbslist(fbslist));
  await Promise.all([
    time.checkTime('exportCpp', exportCpp(fbslist)),
    time.checkTime('exportTypescript', exportTypescript(fbslist)),
    time.checkTime('exportCsharp', exportCsharp(fbslist)),
    time.checkTime('exportPython', exportPython(fbslist)),
  ]);

  await time.checkTime('createIndexTs', formatTypescriptNamespace());
  await time.checkTime('copyToProjects', copyToProjects());
}

async function main(): Promise<void> {
  await time.checkTime('run', run());
}

main().catch((reason) => {
  console.error(reason);
  process.exit(1);
});
