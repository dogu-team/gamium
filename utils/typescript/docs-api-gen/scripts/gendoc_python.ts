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
const gamiumProtocolPath = path.resolve(projectPath, 'gamium/protocol/generated');
const classesMdxDirectory = path.resolve(docsApiPath, 'classes');
const typesMdxDirectory = path.resolve(docsApiPath, 'types');
const enumsMdxDirectory = path.resolve(docsApiPath, 'enums');

const optionFiles = fs.readdirSync(path.resolve(projectPath, 'gamium/options')).filter((file) => file !== '__init__.py' && file.endsWith('.py'));

const fileToMdList: FileToMd[] = [
  {
    codeFilePath: path.resolve(projectPath, 'gamium/gamium_client.py'),
    option: {
      methodsExclude: ['connect', 'disconnect', 'inspector', 'hello', 'sleep', 'logger'],
      propertiesExclude: ['logger'],
    },
  },
  {
    codeFilePath: path.resolve(projectPath, 'gamium/ui/ui.py'),
  },
  {
    codeFilePath: path.resolve(projectPath, 'gamium/object/player.py'),
  },
  {
    codeFilePath: path.resolve(projectPath, 'gamium/object/ui_element.py'),
  },
  {
    codeFilePath: path.resolve(projectPath, 'gamium/actions/action_chain.py'),
  },
  {
    codeFilePath: path.resolve(projectPath, 'gamium/locator/locator.py'),
  },
  {
    codeFilePath: path.resolve(projectPath, 'gamium/locator/rpc_locator.py'),
  },
  {
    codeFilePath: path.resolve(projectPath, 'gamium/locator/by.py'),
  },
  {
    codeFilePath: path.resolve(projectPath, 'gamium/actions/key_by.py'),
  },
  {
    codeFilePath: path.resolve(projectPath, 'gamium/locator/rpc_by.py'),
  },
  {
    codeFilePath: path.resolve(projectPath, 'gamium/condition/until.py'),
  },
  {
    codeFilePath: path.resolve(projectPath, 'gamium/errors/gamium_error.py'),
  },

  ...optionFiles.map((file) => ({
    codeFilePath: path.resolve(projectPath, 'gamium/options', file),
  })),
  {
    codeFilePath: path.resolve(projectPath, 'gamium/protocol/types.py'),
    option: {
      classExclude: ['ObjectHierarchyNode', 'ObjectsHierarchy', 'InspectObjectOnScreenResult', 'HelloResult'],
    },
  },
  {
    codeFilePath: path.resolve(gamiumProtocolPath, 'Types/ObjectType.py'),
  },
  {
    codeFilePath: path.resolve(gamiumProtocolPath, 'Types/Unity/UnityKeyboard.py'),
  },
  {
    codeFilePath: path.resolve(gamiumProtocolPath, 'Types/Unity/UnityKeyCode.py'),
  },
  {
    codeFilePath: path.resolve(gamiumProtocolPath, 'Types/Unity/UnityKeyCode.py'),
  },
  {
    codeFilePath: path.resolve(gamiumProtocolPath, 'Types/ObjectLocatorBy.py'),
  },
  {
    codeFilePath: path.resolve(gamiumProtocolPath, 'Types/InputKeyBy.py'),
  },
  {
    codeFilePath: path.resolve(gamiumProtocolPath, 'Types/ExecuteRpcBy.py'),
  },
  {
    codeFilePath: path.resolve(gamiumProtocolPath, 'Packets/Actions/MovePlayerBy.py'),
  },
  {
    codeFilePath: path.resolve(gamiumProtocolPath, 'Types/ErrorCode.py'),
  },
];

const typeToExternalLink: Map<string, string> = new Map([
  ['int', 'https://docs.python.org/3.9/library/stdtypes.html?highlight=int#numeric-types-int-float-complex'],
  ['float', 'https://docs.python.org/3.9/library/stdtypes.html?highlight=int#numeric-types-int-float-complex'],
  ['str', 'https://docs.python.org/3.9/library/stdtypes.html?highlight=int#numeric-types-int-float-complex'],
  ['bool', 'https://docs.python.org/3.9/library/stdtypes.html?highlight=int#boolean-values'],
  ['List', 'https://docs.python.org/3.9/library/stdtypes.html?highlight=int#sequence-types-list-tuple-range'],
  ['Tuple', 'https://docs.python.org/3.9/library/stdtypes.html?highlight=int#sequence-types-list-tuple-range'],
  ['None', 'https://docs.python.org/3.9/library/constants.html?highlight=none#None'],
  ['Optional', 'https://docs.python.org/3.9/library/typing.html?highlight=optional#typing.Optional'],
  ['Union', 'https://docs.python.org/3.9/library/typing.html?highlight=optional#typing.Union'],
  ['Any', 'https://docs.python.org/3.9/library/typing.html?highlight=any#typing.Any'],
  ['T', 'https://docs.python.org/3.9/library/typing.html?highlight=optional#typing.TypeVar'],
]);

(async () => {
  const typeMdx = new CodeGenTypeMdxMapper([classesMdxDirectory, typesMdxDirectory, enumsMdxDirectory], typeToExternalLink);
  await typeMdx.parse();
  for (const fileToMd of fileToMdList) {
    const python = new CodeGenPython(fileToMd.codeFilePath, fileToMd.option);

    const elemData = await python.parse();
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
