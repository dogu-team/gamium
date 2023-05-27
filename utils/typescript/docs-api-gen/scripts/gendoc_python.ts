import { CodeGenMarkdown, CodeGenSyncer, CodeGenTypeMdxMapper, buildTree, PythonGenerateOption, CodeGenPython } from '../src';
import fs from 'fs';
import path from 'path';

interface FileToMd {
  codeFilePath: string;
  option?: Partial<PythonGenerateOption>;
}

const repoRootPath = path.resolve(__dirname, '..', '..', '..', '..');

const docsPath = path.resolve(repoRootPath, 'docs');
const docsApiPath = path.resolve(docsPath, 'docs/api/client/python');
const projectPath = path.resolve(repoRootPath, 'client', 'python', 'gamium');
const gamiumProtocolPath = path.resolve(projectPath, 'gamium/protocol/generated/gamium/protocol');
const classesMdxDirectory = path.resolve(docsApiPath, 'classes');
const typesMdxDirectory = path.resolve(docsApiPath, 'types');
const enumsMdxDirectory = path.resolve(docsApiPath, 'enums');

const optionFiles = fs.readdirSync(path.resolve(projectPath, 'gamium/options')).filter((file) => file !== 'index.ts');

const fileToMdList: FileToMd[] = [
  {
    codeFilePath: path.resolve(projectPath, 'gamium/gamium_client.py'),
    option: {
      methodsExclude: ['connect', 'disconnect', 'inspector', 'hello', 'sleep'],
      propertiesExclude: ['logger'],
    },
  },
];

const typeToExternalLink: Map<string, string> = new Map([
  ['str', 'https://docs.python.org/ko/3.9/library/stdtypes.html?highlight=str#str'],
  ['Optional', 'https://docs.python.org/ko/3.9/library/typing.html?highlight=optional#typing.Optional'],
  ['List', 'https://docs.python.org/ko/3.9/library/typing.html?highlight=optional#typing.List'],
  ['T', 'https://docs.python.org/ko/3.9/library/typing.html?highlight=optional#typing.TypeVar'],
]);

(async () => {
  const typeMdx = new CodeGenTypeMdxMapper([classesMdxDirectory, typesMdxDirectory, enumsMdxDirectory], typeToExternalLink);
  await typeMdx.parse();
  for (const fileToMd of fileToMdList) {
    const ts = new CodeGenPython(fileToMd.codeFilePath, fileToMd.option);

    const elemData = await ts.parse();
    for (const elemDatum of elemData) {
      const nodes = buildTree(elemDatum.elems);
      const category = mapCategory(elemDatum.category);
      if (!elemDatum.elems[0]) {
        console.warn(`file: ${fileToMd.codeFilePath}, category: ${category} has no elem`);
        continue;
      }
      const name = pascalToKebabCase(elemDatum.elems[0].text);

      const mdFilePath = path.resolve(docsApiPath, category, `${name}.mdx`);

      const md = new CodeGenMarkdown(mdFilePath);
      await md.parse();

      const syncer = new CodeGenSyncer(nodes, md, typeMdx);
      await syncer.sync();
    }
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

function camelToKebabCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function pascalToKebabCase(str: string): string {
  str = str.replace('UI', 'ui');
  str = str.replace(/^[A-Z]/, (letter) => letter.toLowerCase());
  return camelToKebabCase(str);
}

function mapCategory(str: string): string {
  if (str === 'class') {
    return 'classes';
  }
  throw new Error(`unknown category: ${str}`);
}
