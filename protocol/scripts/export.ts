import fsPromises from "fs/promises";
import { cwd } from "process";
import shelljs from "shelljs";
import path from "path";
import { formatFbs } from "./flatbufferFormatter";
import * as filesystem from "./filesystem";
import * as buildToolsProcess from "./process";
import * as time from "./time";
import * as typescript from "./typescript";

const REPO_DIR = path.resolve(__dirname, "..", "..");
const PROTOCOL_DIR = path.resolve(REPO_DIR, "protocol");
const FBS_DIR = "fbs";

const EXPORT_DIR = ".export";
const EXPORT_CPP_DIR = `${EXPORT_DIR}/cpp`;
const EXPORT_CSHARP_DIR = `${EXPORT_DIR}/csharp`;
const EXPORT_TS_DIR = `${EXPORT_DIR}/typescript`;

const DOCKER_WORK_DIR = "/app/host";
const DOCKER_IMAGE_NAME = "flatbuffer-exporter";
const DOCKER_CONTAINER_NAME = "flatbuffer-exporter-container";

// const DEST_CPP_GAMIUM_PROTOCOL_DIR = `${CURRENT_DIR}/../../packages/cpp/gamium-engine/src/include/Internal/Protocol`;
const DEST_CSHARP_GAMIUM_PROTOCOL_DIR = `${REPO_DIR}/engine/unity/Runtime/Public/Protocol/FlatBufferGenerated`;
const DEST_TS_GAMIUM_PROTOCOL_DIR = `${REPO_DIR}/client/typescript/gamium-protocol/src/gamium`;

const FLATC_COMMON_OPTION =
  " --gen-object-api" +
  " --no-cpp-direct-copy --no-prefix --scoped-enums" +
  " --natural-utf8 --reflect-types --force-empty --force-empty-vectors";

async function prepare(): Promise<void> {
  await filesystem.deleteDirs([
    EXPORT_DIR,
    EXPORT_CPP_DIR,
    EXPORT_CSHARP_DIR,
    EXPORT_TS_DIR,
    DEST_CSHARP_GAMIUM_PROTOCOL_DIR,
    DEST_TS_GAMIUM_PROTOCOL_DIR,
  ]);
  await filesystem.createDirs([
    EXPORT_CPP_DIR,
    EXPORT_CSHARP_DIR,
    EXPORT_TS_DIR,
  ]);
}

function buildExporter(): Promise<void> {
  return buildToolsProcess.createProcess(
    `docker build --platform linux/amd64 -t ${DOCKER_IMAGE_NAME} .`
  );
}

async function runExporter(): Promise<void> {
  try {
    await buildToolsProcess.createProcess(
      `docker rm -f ${DOCKER_CONTAINER_NAME}`
    );
  } catch (error) {
    console.log(
      `Container ${DOCKER_CONTAINER_NAME} kill error ignored ${error}.`
    );
  }
  return buildToolsProcess.createProcess(
    `docker run -di --volume=${PROTOCOL_DIR}:${DOCKER_WORK_DIR} --workdir=${DOCKER_WORK_DIR} --name=${DOCKER_CONTAINER_NAME} ${DOCKER_IMAGE_NAME} bash`
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
      `"source /root/.bashrc && flatc --cpp -I ${FBS_DIR} -o ${EXPORT_CPP_DIR} ${FLATC_COMMON_OPTION} ${fbslist.join(
        " "
      )}"`
  );
}

async function exportCsharp(fbslist: string[]): Promise<void> {
  return buildToolsProcess.createProcess(
    `docker exec ${DOCKER_CONTAINER_NAME} /bin/bash --login -c ` +
      `"source /root/.bashrc && flatc --csharp -I ${FBS_DIR} -o ${EXPORT_CSHARP_DIR} ${FLATC_COMMON_OPTION} ${fbslist.join(
        " "
      )}"`
  );
}

async function exportTypescript(fbslist: string[]): Promise<void> {
  await buildToolsProcess.createProcess(
    `docker exec ${DOCKER_CONTAINER_NAME} /bin/bash --login -c ` +
      `"source /root/.bashrc &&flatc --ts -I ${FBS_DIR} -o ${EXPORT_TS_DIR} ${FLATC_COMMON_OPTION} ${fbslist.join(
        " "
      )}"`
  );
  return buildToolsProcess.createProcess(
    `prettier --loglevel warn --write ${EXPORT_TS_DIR}`
  );
}

async function formatTypescriptNamespace(): Promise<void> {
  shelljs.ls(`${EXPORT_TS_DIR}/*.ts`).forEach((file) => {
    shelljs.rm(file);
  });

  await typescript.createIndexTsInternal(EXPORT_TS_DIR, {
    dirPostFixExclude: [],
    filePostFixExclude: [".d.ts"],
  });
  return Promise.resolve();
}

async function copyToProjects(): Promise<void> {
  await fsPromises.cp(EXPORT_CSHARP_DIR, DEST_CSHARP_GAMIUM_PROTOCOL_DIR, {
    recursive: true,
  });
  await fsPromises.cp(EXPORT_TS_DIR, DEST_TS_GAMIUM_PROTOCOL_DIR, {
    recursive: true,
  });
}

async function run(): Promise<void> {
  await time.checkTime("prepare", prepare());
  await time.checkTime("buildExporter", buildExporter());
  await time.checkTime("runExporter", runExporter());
  const fbslist = await filesystem.findFiles(FBS_DIR, ".fbs");
  await time.checkTime("formatFbslist", formatFbslist(fbslist));
  await Promise.all([
    time.checkTime("exportCpp", exportCpp(fbslist)),
    time.checkTime("exportTypescript", exportTypescript(fbslist)),
    time.checkTime("exportCsharp", exportCsharp(fbslist)),
  ]);

  await time.checkTime("createIndexTs", formatTypescriptNamespace());
  await time.checkTime("copyToProjects", copyToProjects());
}

async function main(): Promise<void> {
  await time.checkTime("run", run());
}

main().catch((reason) => {
  console.error(reason);
  process.exit(1);
});
