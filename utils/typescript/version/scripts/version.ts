import { program } from 'commander';
import path from 'path';
import fs from 'fs';

const ROOT_PATH = path.resolve(__dirname, '..', '..', '..', '..');
const UNITY_SERVER_VERSION_FILE_PATH = path.resolve(ROOT_PATH, 'engine/unity/Runtime/Private/Network/Server.cs');
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
    changePythonClientVersion(version);
    changeTypescriptClientVersion(version);
  });

program.parse();
