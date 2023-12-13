import { program } from 'commander';
import path from 'path';
import fs from 'fs';

const ROOT_PATH = path.resolve(__dirname, '..', '..', '..', '..');
const UNITY_SERVER_VERSION_FILE_PATH = path.resolve(ROOT_PATH, 'engine/unity/Runtime/Private/Network/Server.cs');
const UNITY_SERVER_PACKAGE_VERSION_FILE_PATH = path.resolve(ROOT_PATH, 'engine/unity/package.json');
const UNITY_SERVER_DOCS_GITREF_VERSION_FILE_PATH = path.resolve(ROOT_PATH, 'docs/docs/docs/engine/unity/project-configuration.mdx');
const PYTHON_CLIENT_VERSION_FILE_PATH = path.resolve(ROOT_PATH, 'client/python/gamium/pyproject.toml');
const TYPESCRIPT_CLIENT_VERSION_FILE_PATH = path.resolve(ROOT_PATH, 'client/typescript/gamium/package.json');

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
  const contents = fs.readFileSync(UNITY_SERVER_PACKAGE_VERSION_FILE_PATH, 'utf-8');

  const regex = /"version": "(\d+\.\d+\.\d+)",/;
  const match = contents.match(regex);
  if (!match) {
    throw new Error('Could not find version in Unity Server Package');
  }
  const oldVersion = match[1];
  const newContents = contents.replace(oldVersion, version);
  fs.writeFileSync(UNITY_SERVER_PACKAGE_VERSION_FILE_PATH, newContents);
  console.log('Updated Unity Server Package version');
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
  const contents = fs.readFileSync(PYTHON_CLIENT_VERSION_FILE_PATH, 'utf-8');

  const regex = /version = "(\d+\.\d+\.\d+)"/;
  const match = contents.match(regex);
  if (!match) {
    throw new Error('Could not find version in Python Client');
  }
  const oldVersion = match[1];
  const newContents = contents.replace(oldVersion, version);
  fs.writeFileSync(PYTHON_CLIENT_VERSION_FILE_PATH, newContents);
  console.log('Updated Python Client version');
}

function changeTypescriptClientVersion(version: string) {
  const contents = fs.readFileSync(TYPESCRIPT_CLIENT_VERSION_FILE_PATH, 'utf-8');

  const regex = /"version": "(\d+\.\d+\.\d+)",/;
  const match = contents.match(regex);
  if (!match) {
    throw new Error('Could not find version in Typescript Client');
  }
  const oldVersion = match[1];
  const newContents = contents.replace(oldVersion, version);
  fs.writeFileSync(TYPESCRIPT_CLIENT_VERSION_FILE_PATH, newContents);
  console.log('Updated Typescript Client version');
}

program.name('version');

program
  .command('upgrade')
  .argument('<version>', 'version to upgrade to')
  .action((version) => {
    console.log(`Upgrading to ${version}`);
    changeUnityServerVersion(version);
    changeUnityServerPackageVersion(version);
    changeUnityServerDocsPackageVersion(version);
    changePythonClientVersion(version);
    changeTypescriptClientVersion(version);
  });

program.parse();
