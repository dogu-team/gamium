import { node_package } from '@dogu-dev-private/build-tools';
import path from 'path';
import { CodeGenMarkdown } from '../src/codegen-markdown';
import { CodeGenSyncer } from '../src/codegen-syncer';
import { CodeGenTypescript } from '../src/codegen-typescript';

(async () => {
  const codeFilePath = path.resolve(node_package.findRootWorkspace(), 'packages/typescript-dev-private/docs-gen/test/sample/sample-class-b.ts');
  const mdFilePath = path.resolve(node_package.findRootWorkspace(), 'packages/typescript-dev-private/docs-gen/test/sample-class-b.md');
  const ts = new CodeGenTypescript(codeFilePath);
  const md = new CodeGenMarkdown(mdFilePath);

  await ts.parse();
  await md.parse();

  const syncer = new CodeGenSyncer(ts, md);
  await syncer.sync();
})();
