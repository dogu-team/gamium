import fs from 'fs';
import { CodeGenElem, elemToString, escapeCodeAndLink } from './codegen-elem';
import { CodeGenElemTreeNode } from './codegen-elemtree';
import { CodeGenMarkdown, MarkdownLines } from './codegen-markdown';
import { CodeGenTypeMdxMapper } from './codegen-type-mdx-mapper';
import { CodeGenTypescript } from './codegen-typescript';

export class CodeGenSyncer {
  constructor(private readonly nodes: CodeGenElemTreeNode[], private readonly md: CodeGenMarkdown, private readonly typeMdxMapper: CodeGenTypeMdxMapper) {}

  async sync(): Promise<void> {
    const fileHeader = this.getFileHeaders(this.md.lines);
    const newLines = this.generateMd(this.md.nodes, this.nodes, this.md.lines);
    const contents = [...fileHeader, ...newLines].join('\n').replaceAll('\n\n\n', '\n\n');
    await fs.promises.writeFile(this.md.filePath, contents);
  }

  private findMatchedElemInTree(tree: CodeGenElemTreeNode[], elem: CodeGenElem): CodeGenElemTreeNode | undefined {
    for (const e of tree) {
      if (JSON.stringify(e.elem.tag) === JSON.stringify(elem.tag) && escapeCodeAndLink(e.elem.text) === escapeCodeAndLink(elem.text)) {
        return e;
      }
      const found = this.findMatchedElemInTree(e.children, elem);
      if (found) {
        return found;
      }
    }
  }

  private getFileHeaders(lines: MarkdownLines): string[] {
    const firstElemLineIdx = lines.findIndex((l) => {
      return typeof l !== 'string';
    });
    if (firstElemLineIdx !== -1) {
      return lines.slice(0, firstElemLineIdx).map((l) => (typeof l === 'string' ? l : l.text));
    }

    return lines.map((l) => (typeof l === 'string' ? l : l.text));
  }

  private generateMd(befTree: CodeGenElemTreeNode[], curTree: CodeGenElemTreeNode[], lines: MarkdownLines): string[] {
    const newLines: string[] = [];
    for (const curNode of curTree) {
      const befNode = this.findMatchedElemInTree(befTree, curNode.elem);
      const follwedLines: string[] = [];
      const befNodeChildren: CodeGenElemTreeNode[] = [];
      if (befNode) {
        const elemLineIdx = lines.findIndex((l) => {
          return l === befNode.elem;
        });
        if (elemLineIdx === -1) {
          throw new Error(`elem not found in lines: ${befNode.elem.tag.prefix} ${befNode.elem.text}`);
        }
        let nextElemLineIdx = lines.findIndex((l, i) => {
          return i > elemLineIdx && typeof l !== 'string';
        });
        if (nextElemLineIdx === -1) {
          nextElemLineIdx = lines.length;
        }
        follwedLines.push(...lines.slice(elemLineIdx + 1, nextElemLineIdx).map((l) => (typeof l === 'string' ? l : l.text)));
        befNodeChildren.push(...befNode.children);
      }
      newLines.push(
        elemToString(curNode.elem, {
          mapper: this.typeMdxMapper,
          mdFilePath: this.md.filePath,
        }),
      );
      newLines.push('');
      if (0 < follwedLines.length) {
        newLines.push(...follwedLines);
      }
      const childLines = this.generateMd(befNodeChildren, curNode.children, lines);
      if (0 < childLines.length) {
        newLines.push(...childLines);
      }
    }
    return newLines;
  }
}
