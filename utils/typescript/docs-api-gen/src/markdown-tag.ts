export const H1: MarkdownTag = {
  prefix: '# ',
  depth: 0,
};

export const H2: MarkdownTag = {
  prefix: '## ',
  depth: 1,
};

export const H3: MarkdownTag = {
  prefix: '### ',
  depth: 2,
};

export const H4: MarkdownTag = {
  prefix: '#### ',
  depth: 3,
};

export const H5: MarkdownTag = {
  prefix: '##### ',
  depth: 4,
};

export const UL: MarkdownTag = {
  prefix: '- ',
  depth: 'childOfBefore',
};

export const UL2: MarkdownTag = {
  prefix: '  - ',
  depth: 'childOfBefore',
};

export const DIVIDER: MarkdownTag = {
  prefix: '<hr class="solid" /> ',
  depth: 'childOfBefore',
};

export const CUSTOM_CHILD: MarkdownTag = {
  prefix: '<s childtag /> ',
  depth: 'childOfBefore',
};

export interface MarkdownTag {
  prefix: string;
  depth: number | 'childOfBefore';
}

export const Tags: MarkdownTag[] = [H1, H2, H3, H4, H5, UL, UL2, DIVIDER, CUSTOM_CHILD];

export function parseTag(prefix: string, verbose: string): MarkdownTag {
  const ret = Tags.find((t) => t.prefix === prefix);
  if (!ret) {
    throw new Error(`Unknown tag: ${prefix}, verbose: ${verbose}`);
  }
  return ret;
}

export function generateSubtag(tag: string): string {
  return `<code style={{ position:'relative', top:'-20px', fontSize:'70%'}} children='${tag}'/>`;
}
