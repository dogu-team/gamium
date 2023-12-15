import { program } from 'commander';
import path from 'path';
import fs from 'fs';
import {
  changePackageJsonDependenciesVersion,
  changePackageJsonMainVersion,
  changePyProjectTomlVersion,
  changePythonRequirementsVersion,
} from './change-version';

const INVALID_PATH = 'INVALID_PATH';

const ROOT_PATH = path.resolve(__dirname, '..', '..', '..', '..');
const UNITY_SERVER_VERSION_FILE_PATH = path.resolve(ROOT_PATH, 'engine/unity/Runtime/Private/Network/Server.cs');
const UNITY_SERVER_PACKAGE_VERSION_FILE_PATH = path.resolve(ROOT_PATH, 'engine/unity/package.json');
const UNITY_SERVER_DOCS_GITREF_VERSION_FILE_PATH = path.resolve(ROOT_PATH, 'docs/docs/docs/engine/unity/project-configuration.mdx');
const PYTHON_CLIENT_VERSION_FILE_PATH = path.resolve(ROOT_PATH, 'client/python/gamium/pyproject.toml');
const TYPESCRIPT_CLIENT_VERSION_FILE_PATH = path.resolve(ROOT_PATH, 'client/typescript/gamium/package.json');

const GAMIUM_UNITY_SAMPLES_PATH = process.env.GAMIUM_UNITY_SAMPLES_PATH ?? INVALID_PATH;
const GAMIUM_UNITY_SAMPLES_PYTHON_REQUIREMENTS_PATH = path.resolve(GAMIUM_UNITY_SAMPLES_PATH, 'client/python/requirements.txt');
const GAMIUM_UNITY_SAMPLES_TYPESCRIPT_PACKAGEJSON_PATH = path.resolve(GAMIUM_UNITY_SAMPLES_PATH, 'client/typescript/package.json');

const DOGU_ROUTINE_EXAMPLES_PATH = process.env.DOGU_ROUTINE_EXAMPLES_PATH ?? INVALID_PATH;
const DOGU_ROUTINE_EXAMPLES_PYTHON_REQUIREMENTS_PATH = path.resolve(DOGU_ROUTINE_EXAMPLES_PATH, 'gamium/python/pytest/requirements.txt');
const DOGU_ROUTINE_EXAMPLES_TYPESCRIPT_PACKAGEJSON_PATH = path.resolve(DOGU_ROUTINE_EXAMPLES_PATH, 'gamium/typescript/jest/package.json');

function changeUnityServerVersion(version: string) {
  const contents = fs.readFileSync(UNITY_SERVER_VERSION_FILE_PATH, 'utf-8');

  const regex = /private readonly string Version = "(\d+\.\d+\.\d+)";/;
  const match = contents.match(regex);
  if (!match) {
    throw new Error('Could not find version in Unity Server');
  }
  const oldVersion = match[1];
  const newContents = contents.replace(oldVersion, version);
  fs.writeFileSync(UNITY_SERVER_VERSION_FILE_PATH, newContents);
  console.log('Updated Unity Server version');
}

function changeUnityServerPackageVersion(version: string) {
  changePackageJsonMainVersion(UNITY_SERVER_PACKAGE_VERSION_FILE_PATH, version);
}

function changeUnityServerDocsPackageVersion(version: string) {
  const contents = fs.readFileSync(UNITY_SERVER_DOCS_GITREF_VERSION_FILE_PATH, 'utf-8');

  const regex = /"com.dogu.gamium.engine.unity": ".*",/;
  const match = contents.match(regex);
  if (!match) {
    throw new Error('Could not find version in Unity Server Package');
  }
  const oldVersion = match[0];
  const newVersionLine = `"com.dogu.gamium.engine.unity": "https://github.com/dogu-team/gamium.git?path=/engine/unity#${version}",`;
  const newContents = contents.replace(oldVersion, newVersionLine);
  fs.writeFileSync(UNITY_SERVER_DOCS_GITREF_VERSION_FILE_PATH, newContents);
  console.log('Updated Unity Server docs version');
}

function changePythonClientVersion(version: string) {
  changePyProjectTomlVersion(PYTHON_CLIENT_VERSION_FILE_PATH, version);
}

function changeTypescriptClientVersion(version: string) {
  changePackageJsonMainVersion(TYPESCRIPT_CLIENT_VERSION_FILE_PATH, version);
}

program.name('version');

program
  .command('upgrade')
  .argument('<version>', 'version to upgrade to')
  .action((version) => {
    console.log(`>> Upgrading to ${version} << `);
    changeUnityServerVersion(version);
    changeUnityServerPackageVersion(version);
    changeUnityServerDocsPackageVersion(version);
    changePythonClientVersion(version);
    changeTypescriptClientVersion(version);

    if (INVALID_PATH === GAMIUM_UNITY_SAMPLES_PATH) {
      console.warn('[WARNING] GAMIUM_UNITY_SAMPLES_PATH is not set, skipping, please set it to upgrade the samples');
    } else {
      changePythonRequirementsVersion(GAMIUM_UNITY_SAMPLES_PYTHON_REQUIREMENTS_PATH, 'gamium', version);
      changePackageJsonDependenciesVersion(GAMIUM_UNITY_SAMPLES_TYPESCRIPT_PACKAGEJSON_PATH, 'gamium', version);
    }

    if (INVALID_PATH === DOGU_ROUTINE_EXAMPLES_PATH) {
      console.warn('[WARNING] DOGU_ROUTINE_EXAMPLES_PATH is not set, skipping, please set it to upgrade the examples');
    } else {
      changePythonRequirementsVersion(DOGU_ROUTINE_EXAMPLES_PYTHON_REQUIREMENTS_PATH, 'gamium', version);
      changePackageJsonDependenciesVersion(DOGU_ROUTINE_EXAMPLES_TYPESCRIPT_PACKAGEJSON_PATH, 'gamium', version);
    }
  });

program.parse();
