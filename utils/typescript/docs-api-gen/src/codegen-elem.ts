import chalk from 'chalk';
import { CodeGenTypeMdxMapper } from './codegen-type-mdx-mapper';
import { MarkdownTag } from './markdown-tag';

export const CodeGenElemToken = '<s generated />';
export interface CodeGenElem {
  tag: MarkdownTag;
  text: string;
}

export type CodeGenElems = CodeGenElem[];
export type CodeGenElemData = {
  category: 'class' | 'interface' | 'enum';
  elems: CodeGenElems;
};

export function elemToString(elem: CodeGenElem, converter?: { mapper: CodeGenTypeMdxMapper; mdFilePath: string }): string {
  let text = elem.text;
  if (converter) {
    text = linkiFyCodeBlock(text, converter.mapper, converter.mdFilePath);
  }
  return `${elem.tag.prefix}${text} ${CodeGenElemToken}`;
}

export function makeTypedCodeBlock(param: string): string {
  let ret = '';
  let isBracketOpen = false;
  param = param.replaceAll('\r', '');
  param = param.replaceAll('\n', '');
  param = param.replaceAll(/\s+/g, ' ');
  for (let index = 0; index < param.length; index++) {
    const elem = param[index];
    if (!isAlphaNumeric(elem)) {
      if (isBracketOpen) {
        ret += '`';
        isBracketOpen = false;
      }
      ret += elem;
      continue;
    }
    if (!isBracketOpen) {
      ret += '`';
      isBracketOpen = true;
    }
    ret += elem;
  }
  if (isBracketOpen) {
    ret += '`';
  }
  return ret;
}

export function linkiFyCodeBlock(param: string, mapper: CodeGenTypeMdxMapper, mdFilePath: string): string {
  let ret = '';
  let bracketOpenIdx: number | null = null;
  for (let index = 0; index < param.length; index++) {
    const elem = param[index];
    if ('`' === elem) {
      if (bracketOpenIdx === null) {
        bracketOpenIdx = index;
      } else {
        const codeBlock = param.slice(bracketOpenIdx + 1, index);
        const link = mapper.getTypeToLink(codeBlock, mdFilePath);
        if (!link) {
          ret += '`' + codeBlock + '`';
          console.log(chalk.red(`[codegen-elem] link not found for ${codeBlock}`));
        } else {
          ret += `[\`${codeBlock}\`]( ${link.replace('.mdx', '')})`;
        }
        bracketOpenIdx = null;
      }
      continue;
    }
    if (bracketOpenIdx !== null) {
      continue;
    }

    ret += elem;
  }
  return ret;
}

export function escapeCodeAndLink(text: string): string {
  let ret = text;
  ret = ret.replaceAll('`', '');
  ret = ret.replaceAll('[', '');
  ret = ret.replaceAll(']', '');
  ret = ret.replaceAll(/\([^)]+\)/g, '');
  return ret;
}

function isAlphaNumeric(char: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(char);
}
