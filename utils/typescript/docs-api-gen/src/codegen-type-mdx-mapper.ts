import fs from 'fs';
import { glob } from 'glob';
import path from 'path';

type TypeToMdxPath = Map<string, string>;
type TypeToExternalLink = Map<string, string>;

export class CodeGenTypeMdxMapper {
  private typeToMdxPath: TypeToMdxPath = new Map();
  private typeToExternalLink: TypeToExternalLink = new Map();
  constructor(private readonly mdxDirectories: string[], typeToExternalLink: Map<string, string>) {
    this.typeToExternalLink = typeToExternalLink;
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
