import { node_package } from '@dogu-dev-private/build-tools';
import { CodeGenMarkdown, CodeGenSyncer, CodeGenTypeMdxMapper, CodeGenTypescript, TypescriptGenerateOption } from '@dogu-dev-private/docs-gen';
import fs from 'fs';
import path from 'path';

interface FileToMd {
  codeFilePath: string;
  mdFilePath: string;
  option?: Partial<TypescriptGenerateOption>;
}

const workspacePath = node_package.findRootWorkspace();
const projectPath = path.resolve(__dirname, '..');
const gamiumProtocolPath = path.resolve(workspacePath, 'packages/typescript/gamium-protocol/src/gamium/gamium/protocol');
const classesMdxDirectory = path.resolve(workspacePath, 'publics/dogu-docs/docs/gamium/gamium-client/api/classes');
const typesMdxDirectory = path.resolve(workspacePath, 'publics/dogu-docs/docs/gamium/gamium-client/api/types');
const enumsMdxDirectory = path.resolve(workspacePath, 'publics/dogu-docs/docs/gamium/gamium-client/api/enums');

const optionFiles = fs.readdirSync(path.resolve(projectPath, 'src/options')).filter((file) => file !== 'index.ts');

const fileToMdList: FileToMd[] = [
  {
    codeFilePath: path.resolve(projectPath, 'src/gamium-client.ts'),
    mdFilePath: path.resolve(workspacePath, classesMdxDirectory, 'gamium-client.mdx'),
    option: {
      methodsExlude: ['connect', 'disconnect', 'inspector', 'hello', 'sleep'],
      propertiesExlude: ['logger'],
    },
  },
  {
    codeFilePath: path.resolve(projectPath, 'src/ui/ui.ts'),
    mdFilePath: path.resolve(workspacePath, classesMdxDirectory, 'ui.mdx'),
  },
  {
    codeFilePath: path.resolve(projectPath, 'src/object/player.ts'),
    mdFilePath: path.resolve(workspacePath, classesMdxDirectory, 'player.mdx'),
  },
  {
    codeFilePath: path.resolve(projectPath, 'src/object/ui-element.ts'),
    mdFilePath: path.resolve(workspacePath, classesMdxDirectory, 'ui-element.mdx'),
  },
  {
    codeFilePath: path.resolve(projectPath, 'src/actions/action-chain.ts'),
    mdFilePath: path.resolve(workspacePath, classesMdxDirectory, 'action-chain.mdx'),
  },
  {
    codeFilePath: path.resolve(projectPath, 'src/locator/locator.ts'),
    mdFilePath: path.resolve(workspacePath, typesMdxDirectory, 'locator.mdx'),
  },
  {
    codeFilePath: path.resolve(projectPath, 'src/locator/rpc-locator.ts'),
    mdFilePath: path.resolve(workspacePath, typesMdxDirectory, 'rpc-locator.mdx'),
  },
  {
    codeFilePath: path.resolve(projectPath, 'src/locator/by.ts'),
    mdFilePath: path.resolve(workspacePath, classesMdxDirectory, 'by.mdx'),
  },
  {
    codeFilePath: path.resolve(projectPath, 'src/actions/key-by.ts'),
    mdFilePath: path.resolve(workspacePath, classesMdxDirectory, 'key-by.mdx'),
  },
  {
    codeFilePath: path.resolve(projectPath, 'src/locator/rpc-by.ts'),
    mdFilePath: path.resolve(workspacePath, classesMdxDirectory, 'rpc-by.mdx'),
  },
  {
    codeFilePath: path.resolve(projectPath, 'src/until.ts'),
    mdFilePath: path.resolve(workspacePath, classesMdxDirectory, 'until.mdx'),
  },
  {
    codeFilePath: path.resolve(projectPath, 'src/errors/gamium-error.ts'),
    mdFilePath: path.resolve(workspacePath, classesMdxDirectory, 'gamium-error.mdx'),
    option: {
      classExlude: [],
      interfaceExlude: [],
      methodsExlude: ['setCause'],
    },
  },

  ...optionFiles.map((file) => ({
    codeFilePath: path.resolve(projectPath, 'src/options', file),
    mdFilePath: path.resolve(workspacePath, typesMdxDirectory, camelToDashcase(file.replace('.ts', '.mdx'))),
  })),
  // {
  //   codeFilePath: path.resolve(projectPath, 'src/protocols/vector2.ts'),
  //   mdFilePath: path.resolve(workspacePath, classesMdxDirectory, 'vector2.mdx'),
  // },
  // {
  //   codeFilePath: path.resolve(projectPath, 'src/protocols/vector3.ts'),
  //   mdFilePath: path.resolve(workspacePath, classesMdxDirectory, 'vector3.mdx'),
  // },
  // {
  //   codeFilePath: path.resolve(projectPath, 'src/protocols/vector4.ts'),
  //   mdFilePath: path.resolve(workspacePath, classesMdxDirectory, 'vector4.mdx'),
  // },
  // {
  //   codeFilePath: path.resolve(projectPath, 'src/protocols/objectInfo.ts'),
  //   mdFilePath: path.resolve(workspacePath, classesMdxDirectory, 'object-info.mdx'),
  // },
  // {
  //   codeFilePath: path.resolve(projectPath, 'src/protocols/actionResult.ts'),
  //   mdFilePath: path.resolve(workspacePath, classesMdxDirectory, 'action-result.mdx'),
  // },
  // {
  //   codeFilePath: path.resolve(projectPath, 'src/protocols/errorResult.ts'),
  //   mdFilePath: path.resolve(workspacePath, classesMdxDirectory, 'error-result.mdx'),
  // },
  // {
  //   codeFilePath: path.resolve(projectPath, 'src/protocols/queryScreenResult.ts'),
  //   mdFilePath: path.resolve(workspacePath, classesMdxDirectory, 'query-screen-result.mdx'),
  // },
  // {
  //   codeFilePath: path.resolve(projectPath, 'src/protocols/queryProfileResult.ts'),
  //   mdFilePath: path.resolve(workspacePath, classesMdxDirectory, 'query-profile-result.mdx'),
  // },
  {
    codeFilePath: path.resolve(gamiumProtocolPath, 'types/object-type.ts'),
    mdFilePath: path.resolve(workspacePath, enumsMdxDirectory, 'object-type.mdx'),
  },
  {
    codeFilePath: path.resolve(gamiumProtocolPath, 'types/unity/unity-keyboard.ts'),
    mdFilePath: path.resolve(workspacePath, enumsMdxDirectory, 'unity-keyboard.mdx'),
  },
  {
    codeFilePath: path.resolve(gamiumProtocolPath, 'types/unity/unity-key-code.ts'),
    mdFilePath: path.resolve(workspacePath, enumsMdxDirectory, 'unity-key-code.mdx'),
  },
  {
    codeFilePath: path.resolve(gamiumProtocolPath, 'types/unity/unity-key-code.ts'),
    mdFilePath: path.resolve(workspacePath, enumsMdxDirectory, 'unity-key-code.mdx'),
  },
  {
    codeFilePath: path.resolve(gamiumProtocolPath, 'types/object-locator-by.ts'),
    mdFilePath: path.resolve(workspacePath, enumsMdxDirectory, 'object-locator-by.mdx'),
  },
  {
    codeFilePath: path.resolve(gamiumProtocolPath, 'types/input-key-by.ts'),
    mdFilePath: path.resolve(workspacePath, enumsMdxDirectory, 'input-key-by.mdx'),
  },
  {
    codeFilePath: path.resolve(gamiumProtocolPath, 'types/execute-rpc-by.ts'),
    mdFilePath: path.resolve(workspacePath, enumsMdxDirectory, 'execute-rpc-by.mdx'),
  },
  {
    codeFilePath: path.resolve(gamiumProtocolPath, 'packets/actions/move-player-by.ts'),
    mdFilePath: path.resolve(workspacePath, enumsMdxDirectory, 'move-player-by.mdx'),
  },
  {
    codeFilePath: path.resolve(gamiumProtocolPath, 'types/error-code.ts'),
    mdFilePath: path.resolve(workspacePath, enumsMdxDirectory, 'error-code.mdx'),
  },
];

(async () => {
  const typeMdx = new CodeGenTypeMdxMapper([classesMdxDirectory, typesMdxDirectory, enumsMdxDirectory]);
  await typeMdx.parse();
  for (const fileToMd of fileToMdList) {
    const ts = new CodeGenTypescript(fileToMd.codeFilePath, fileToMd.option);
    const md = new CodeGenMarkdown(fileToMd.mdFilePath);

    await ts.parse();
    await md.parse();

    const syncer = new CodeGenSyncer(ts, md, typeMdx);
    await syncer.sync();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

function camelToDashcase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}
