import fs from 'fs';
import { glob } from 'glob';
import path from 'path';

type TypeToMdxPath = Map<string, string>;
type TypeToExternalLink = Map<string, string>;

export class CodeGenTypeMdxMapper {
  private typeToMdxPath: TypeToMdxPath = new Map();
  private typeToExternalLink: TypeToExternalLink = new Map();
  constructor(private readonly mdxDirectories: string[]) {
    this.typeToExternalLink.set('string', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String');
    this.typeToExternalLink.set('number', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number');
    this.typeToExternalLink.set('boolean', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean');
    this.typeToExternalLink.set('object', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object');
    this.typeToExternalLink.set('any', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object');
    this.typeToExternalLink.set('void', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined');
    this.typeToExternalLink.set('undefined', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined');
    this.typeToExternalLink.set('null', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null');
    this.typeToExternalLink.set('never', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined');
    this.typeToExternalLink.set('unknown', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object');
    this.typeToExternalLink.set('Promise', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise');
    this.typeToExternalLink.set('Partial', 'https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype');
    this.typeToExternalLink.set('Type', 'https://www.typescriptlang.org/docs/handbook/2/generics.html');
  }

  async parse(): Promise<void> {
    await this.generateTypeToMdxPath(this.mdxDirectories);
  }

  getTypeToLink(typeName: string, typeFilePath: string): string | undefined {
    const externalLink = this.typeToExternalLink.get(typeName);
    if (externalLink) {
      return externalLink;
    }
    const mdxPath = this.typeToMdxPath.get(typeName);
    if (mdxPath) {
      const relativePath = path.relative(path.dirname(typeFilePath), mdxPath);
      return relativePath;
    }

    return undefined;
  }

  private async generateTypeToMdxPath(mdxDirectories: string[]): Promise<void> {
    const titleRegex = /title:\s(?<typeName>[a-zA-Z0-9]+)/g;

    for (const dir of mdxDirectories) {
      const files = await glob(`${dir}/**/*.mdx`);
      const loadFile = async (f: string): Promise<void> => {
        const content = await fs.promises.readFile(f, 'utf-8');
        const lines = content.split('\n');
        for (const l of lines) {
          const match = titleRegex.exec(l);
          if (match?.groups && match.groups.typeName) {
            this.typeToMdxPath.set(match.groups.typeName, f);
            break;
          }
        }
      };
      await Promise.all(files.map(loadFile));
    }
  }
}
