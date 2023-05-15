import { CodeGenElem } from './codegen-elem';

export interface CodeGenElemTreeNode {
  elem: CodeGenElem;
  children: CodeGenElemTreeNode[];
}

export function getAllChildren(node: CodeGenElemTreeNode): CodeGenElemTreeNode[] {
  const ret: CodeGenElemTreeNode[] = [];
  for (const c of node.children) {
    ret.push(c);
    ret.push(...getAllChildren(c));
  }
  return ret;
}

export function buildTree(elems: CodeGenElem[]): CodeGenElemTreeNode[] {
  const ret: CodeGenElemTreeNode[] = [];
  const pushNodeListForHistory: CodeGenElemTreeNode[] = [];
  // build nodes

  const push = (nodes: CodeGenElemTreeNode[], elem: CodeGenElem): void => {
    const pushNode: CodeGenElemTreeNode = {
      elem: elem,
      children: [],
    };

    nodes.push(pushNode);
    pushNodeListForHistory.push(pushNode);
  };

  for (const e of elems) {
    if (e.tag.depth === undefined) {
      continue;
    }
    if (e.tag.depth === 0) {
      push(ret, e);
    } else if (typeof e.tag.depth === 'number' && e.tag.depth > 0) {
      // find parent
      let parent: CodeGenElemTreeNode | undefined = undefined;
      for (const historyPushNode of pushNodeListForHistory.slice().reverse()) {
        if (historyPushNode.elem.tag.depth < e.tag.depth) {
          parent = historyPushNode;
          break;
        }
      }
      if (!parent) {
        throw new Error(`parent not found: ${e.tag.prefix}, ${e.text}`);
      }
      push(parent.children, e);
    } else if (e.tag.depth === 'childOfBefore') {
      const lastNode = pushNodeListForHistory[pushNodeListForHistory.length - 1];
      if (!lastNode) {
        throw new Error(`lastNode not found: ${e.tag.prefix}, ${e.text}`);
      }
      push(lastNode.children, e);
    }
  }

  return ret;
}
