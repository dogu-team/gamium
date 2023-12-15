import path from 'path';
import fs from 'fs';

export function changePackageJsonMainVersion(path: string, version: string): void {
  const contents = fs.readFileSync(path, 'utf-8');

  const regex = /"version": "(\d+\.\d+\.\d+)",/;
  const match = contents.match(regex);
  if (!match) {
    throw new Error(`Could not find version in ${path}`);
  }
  const oldVersion = match[1];
  const newContents = contents.replace(oldVersion, version);
  fs.writeFileSync(path, newContents);
  console.log(`Updated ${path} version`);
}

export function changePyProjectTomlVersion(path: string, version: string): void {
  const contents = fs.readFileSync(path, 'utf-8');

  const regex = /version = "(\d+\.\d+\.\d+)"/;
  const match = contents.match(regex);
  if (!match) {
    throw new Error(`Could not find version in ${path}`);
  }
  const oldVersion = match[1];
  const newContents = contents.replace(oldVersion, version);
  fs.writeFileSync(path, newContents);
  console.log(`Updated ${path} version`);
}

export function changePythonRequirementsVersion(path: string, key: string, version: string): void {
  const contents = fs.readFileSync(path, 'utf-8');

  const regex = new RegExp(`${key}==\\d+\\.\\d+\\.\\d+`);
  const match = contents.match(regex);

  if (!match) {
    throw new Error(`Could not find ${key} in ${path}`);
  }

  const oldVersion = match[0];
  const newContents = contents.replace(oldVersion, `${key}==${version}`);
  fs.writeFileSync(path, newContents);
  console.log(`Updated ${path} version`);
}

export function changePackageJsonDependenciesVersion(path: string, key: string, version: string): void {
  const contents = fs.readFileSync(path, 'utf-8');

  const regex = new RegExp(`"${key}": "\\d+\\.\\d+\\.\\d+"`);
  const match = contents.match(regex);
  if (!match) {
    throw new Error(`Could not find ${key} in ${path}`);
  }

  const oldVersion = match[0];
  const newContents = contents.replace(oldVersion, `"${key}": "${version}"`);
  fs.writeFileSync(path, newContents);
  console.log(`Updated ${path} version`);
}
