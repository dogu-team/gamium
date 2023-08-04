import path from 'path';
import { buildTree, CodeGenTypeMdxMapper } from '../src';
import { CodeGenMarkdown } from '../src/codegen-markdown';
import { CodeGenSyncer } from '../src/codegen-syncer';
import { CodeGenTypescript } from '../src/codegen-typescript';

(async () => {
  const codeFilePath = path.resolve(__dirname, 'sample/sample-class-b.ts');
  const mdFilePath = path.resolve(__dirname, 'sample-class-b.md');
  const ts = new CodeGenTypescript(codeFilePath);
  const typeMdx = new CodeGenTypeMdxMapper([__dirname, __dirname, __dirname], new Map<string, string>());

  const elemData = await ts.parse();
  for (const elemDatum of elemData) {
    const nodes = buildTree(elemDatum.elems);

    const md = new CodeGenMarkdown(mdFilePath);
    await md.parse();

    const syncer = new CodeGenSyncer(nodes, md, typeMdx);
    await syncer.sync();
  }
})();
