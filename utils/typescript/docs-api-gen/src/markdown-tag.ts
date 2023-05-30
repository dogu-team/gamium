import fs from 'fs';
import path from 'path';
export interface MarkdownTag {
  prefix: string;
  depth: number | 'childOfBefore';
}

// export const Tags: MarkdownTag[] = [H1, H2, H3, H4, H5, UL, UL2, DIVIDER, CUSTOM_CHILD];
const tagsJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'res/markdown-tags.json'), 'utf8'));
export const TagsMap: { [key: string]: MarkdownTag } = tagsJson;
console.log(`Markdown Tags: ${TagsMap}`);

export function parseTag(prefix: string, verbose: string): MarkdownTag {
  const ret = Object.values(TagsMap).find((t) => t.prefix === prefix);
  if (!ret) {
    throw new Error(`Unknown tag: ${prefix}, verbose: ${verbose}`);
  }
  return ret;
}

export function generateSubtag(tag: string): string {
  return `<code style={{ position:'relative', top:'-20px', fontSize:'70%'}} children='${tag}'/>`;
}
