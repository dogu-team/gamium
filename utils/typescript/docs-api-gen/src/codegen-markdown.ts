import fs from "fs";
import { CodeGenElem, CodeGenElemToken } from "./codegen-elem";
import { buildTree, CodeGenElemTreeNode } from "./codegen-elemtree";
import { parseTag } from "./markdown-tag";

export type MarkdownLines = (CodeGenElem | string)[];

export class CodeGenMarkdown {
  constructor(
    public readonly filePath: string,
    public readonly lines: MarkdownLines = [],
    public readonly nodes: CodeGenElemTreeNode[] = []
  ) {}
  async parse(): Promise<void> {
    if (fs.existsSync(this.filePath) === false) {
      return;
    }
    console.log(`CodeGenMarkdown.parse: ${this.filePath}`);
    const contents = await fs.promises.readFile(this.filePath, "utf-8");
    const lines = contents.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      if (l.trim().endsWith(CodeGenElemToken)) {
        const name = l.replace(CodeGenElemToken, "").trim();

        let tagStr = name.match(/^<[^>]+>/g)?.[0];
        if (tagStr === undefined) {
          const splted = name.split(" ");
          tagStr = splted[0];
        }

        const tag = parseTag(
          `${tagStr} `,
          `file: ${this.filePath}, line:${i + 1}`
        );
        const text = name.replace(tagStr, "").trim();
        this.lines.push({
          tag: tag,
          text: text,
        });
      } else {
        this.lines.push(l);
      }
    }

    const elems = this.lines.filter((l) => {
      if (typeof l === "string") {
        return false;
      }
      if (l.tag.depth === undefined) {
        return false;
      }
      return true;
    }) as CodeGenElem[];
    const nodes = buildTree(elems);
    this.nodes.push(...nodes);
  }
}
