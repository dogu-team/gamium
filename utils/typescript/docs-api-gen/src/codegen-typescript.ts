import fs from 'fs';
import {
  AccessorDeclaration,
  ClassDeclaration,
  DeclarationVisibility,
  EnumDeclaration,
  InterfaceDeclaration,
  MethodDeclaration,
  ParameterDeclaration,
  PropertyDeclaration,
  TypeAliasDeclaration,
  TypescriptParser,
} from 'typescript-parser';
import { CodeGenElem, CodeGenElemData, CodeGenElems, makeTypedCodeBlock } from './codegen-elem';
import { buildTree, CodeGenElemTreeNode } from './codegen-elemtree';
import { generateSubtag, TagsMap } from './markdown-tag';

export interface TypescriptGenerateOption {
  classExclude: string[];
  interfaceExclude: string[];
  methodsExclude: string[];
  propertiesExclude: string[];
}

function defaultOption(): TypescriptGenerateOption {
  return {
    classExclude: [],
    interfaceExclude: [],
    methodsExclude: [],
    propertiesExclude: [],
  };
}

interface TypescriptGenerateContext {
  fileContents: string;
  option: TypescriptGenerateOption;
}

export class CodeGenTypescript {
  constructor(
    private readonly codeFilePath: string,
    private readonly option: Partial<TypescriptGenerateOption> = defaultOption(),
    public readonly elems: CodeGenElem[] = [],
    public readonly nodes: CodeGenElemTreeNode[] = [],
  ) {}

  async parse(): Promise<CodeGenElemData[]> {
    const codeElems = await CodeGenTypescript.parseCodeFile(this.codeFilePath, this.option);
    return codeElems;
  }

  private static async parseCodeFile(filePath: string, option: Partial<TypescriptGenerateOption>): Promise<CodeGenElemData[]> {
    const parser = new TypescriptParser();
    const parsed = await parser.parseFile(filePath, process.cwd());

    const ret: CodeGenElemData[] = [];
    const optionMixed = { ...defaultOption(), ...option };

    const context: TypescriptGenerateContext = {
      fileContents: fs.readFileSync(filePath, 'utf8'),
      option: optionMixed,
    };

    for (const decl of parsed.declarations) {
      if (!decl) {
        continue;
      }
      if (decl instanceof ClassDeclaration) {
        ret.push({
          category: 'class',
          elems: generateElemFromClass(decl, context),
        });
      }

      if (decl instanceof InterfaceDeclaration) {
        ret.push({
          category: 'interface',
          elems: generateElemFromInterface(decl, context),
        });
      }

      // if (decl instanceof TypeAliasDeclaration) {
      //   ret.push(...generateElemFromTypeAlias(decl, context));
      // }

      if (decl instanceof EnumDeclaration) {
        ret.push({
          category: 'enum',
          elems: generateElemFromEnum(decl, context),
        });
      }
    }
    return ret;
  }
}

function generateElemFromClass(classDecl: ClassDeclaration, context: TypescriptGenerateContext): CodeGenElems {
  if (context.option.classExclude.includes(classDecl.name)) {
    return [];
  }
  const ret: CodeGenElems = [];
  ret.push({
    tag: TagsMap.H1,
    text: classDecl.name,
  });
  ret.push({
    tag: TagsMap.DIVIDER,
    text: '',
  });
  let mutatedMethodDecls = classDecl.methods
    .sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    })
    .filter((m) => {
      // functino signature like => [util.inspect.custom](depth: unknown, opts: unknown): string
      if (!m.name || m.name === 'undefined') {
        return false;
      }
      return true;
    });

  if (0 < mutatedMethodDecls.length) {
    ret.push({
      tag: TagsMap.H2,
      text: 'Methods',
    });
    ret.push(...mutatedMethodDecls.map((m) => generateElemFromMethod(m, context)).flat());
  }
  const propElems = classDecl.properties.map((p) => generateElemFromProperty(p, context)).flat();
  const accessorElems = classDecl.accessors.map((p) => generateElemFromAccessor(p)).flat();
  const propAndAccessorElems = [...propElems, ...accessorElems];
  if (0 < propAndAccessorElems.length) {
    ret.push({
      tag: TagsMap.H2,
      text: 'Properties',
    });
    ret.push(...propAndAccessorElems);
  }
  return ret;
}

function generateElemFromMethod(methodDecl: MethodDeclaration, context: TypescriptGenerateContext): CodeGenElems {
  if (context.option.methodsExclude.includes(methodDecl.name)) {
    return [];
  }
  const tags: string[] = [];
  if (methodDecl.visibility === DeclarationVisibility.Private) {
    return [];
  } else {
    tags.push(generateSubtag('public'));
  }
  if (methodDecl.isStatic) {
    tags.push(generateSubtag('static'));
  }
  if (methodDecl.isAbstract) {
    tags.push(generateSubtag('abstract'));
  }
  if (methodDecl.isOptional) {
    tags.push(generateSubtag('optional'));
  }

  const ret: CodeGenElems = [
    {
      tag: TagsMap.H3,
      text: `${methodDecl.name}`,
    },
  ];
  if (0 < tags.length) {
    ret.push({
      tag: TagsMap.CUSTOM_CHILD,
      text: tags.join(' '),
    });
  }
  const paramElems = methodDecl.parameters.map((p) => generateElemFromParam(p)).flat();
  const returnElems = generateElemFromReturn(methodDecl.type);
  if (0 < paramElems.length) {
    ret.push({
      tag: TagsMap.H5,
      text: 'Arguments',
    });
    ret.push(...paramElems);
  }
  if (0 < returnElems.length) {
    ret.push({
      tag: TagsMap.H5,
      text: 'Returns',
    });
    ret.push(...returnElems);
  }
  ret.push({
    tag: TagsMap.DIVIDER,
    text: '',
  });
  return ret;
}

function generateElemFromParam(paramDecl: ParameterDeclaration): CodeGenElems {
  const ret: CodeGenElems = [];
  const childs: CodeGenElems = [];
  let type = paramDecl.type;
  if (paramDecl.type) {
    if (paramDecl.type.startsWith('{') && paramDecl.type.endsWith('}')) {
      type = 'object';
      const keyValueRegex = /([a-zA-Z0-9_]+): ([a-zA-Z0-9_]+)/g;
      const matches = paramDecl.type.matchAll(keyValueRegex);
      for (const match of matches) {
        childs.push({
          tag: TagsMap.UL2,
          text: `${match[1]} ${makeTypedCodeBlock(match[2])}`,
        });
      }
    }
  }
  ret.push({
    tag: TagsMap.UL,
    text: `${paramDecl.name} ${type ? makeTypedCodeBlock(type) : ''}`,
  });
  if (0 < childs.length) {
    ret.push(...childs);
  }
  return ret;
}

function generateElemFromReturn(returnType?: string): CodeGenElem[] {
  if (!returnType) {
    return [];
  }
  return [
    {
      tag: TagsMap.UL,
      text: makeTypedCodeBlock(returnType),
    },
  ];
}

function generateElemFromInterface(decl: InterfaceDeclaration, context: TypescriptGenerateContext): CodeGenElem[] {
  const ret: CodeGenElems = [];
  if (!decl.isExported) {
    return ret;
  }
  if (context.option.interfaceExclude.includes(decl.name)) {
    return [];
  }

  ret.push({
    tag: TagsMap.H1,
    text: decl.name,
  });
  const propElems = decl.properties.map((p) => generateElemFromProperty(p, context)).flat();
  if (0 < propElems.length) {
    ret.push({
      tag: TagsMap.H2,
      text: 'Properties',
    });

    ret.push(...propElems);
  }
  const methodElems = decl.methods.map((m) => generateElemFromMethod(m, context)).flat();
  if (0 < methodElems.length) {
    ret.push({
      tag: TagsMap.H2,
      text: 'Methods',
    });
    ret.push(...methodElems);
  }

  return ret;
}

function generateElemFromProperty(decl: PropertyDeclaration, context: TypescriptGenerateContext): CodeGenElem[] {
  if (decl.visibility !== DeclarationVisibility.Public) {
    return [];
  }

  if (context.option.propertiesExclude.includes(decl.name)) {
    return [];
  }

  return [
    {
      tag: TagsMap.H4,
      text: `${decl.name} ${decl.type ? makeTypedCodeBlock(decl.type) : ''}`,
    },
    {
      tag: TagsMap.DIVIDER,
      text: '',
    },
  ];
}

function generateElemFromAccessor(decl: AccessorDeclaration): CodeGenElem[] {
  if (decl.visibility !== DeclarationVisibility.Public) {
    return [];
  }

  return [
    {
      tag: TagsMap.H4,
      text: `${decl.name} ${decl.type ? makeTypedCodeBlock(decl.type) : ''}`,
    },
    {
      tag: TagsMap.DIVIDER,
      text: '',
    },
  ];
}

function generateElemFromTypeAlias(decl: TypeAliasDeclaration, context: TypescriptGenerateContext): CodeGenElem[] {
  const ret: CodeGenElems = [];
  if (!decl.isExported) {
    return [];
  }
  ret.push({
    tag: TagsMap.H1,
    text: decl.name,
  });

  const rightSide = context.fileContents.substring(decl.start!, decl.end).split('=')[1].trim().replace(';', '');

  ret.push({
    tag: TagsMap.H4,
    text: makeTypedCodeBlock(rightSide),
  });
  return ret;
}

function generateElemFromEnum(decl: EnumDeclaration, context: TypescriptGenerateContext): CodeGenElem[] {
  const ret: CodeGenElems = [];
  if (!decl.isExported) {
    return [];
  }
  ret.push({
    tag: TagsMap.H1,
    text: decl.name,
  });

  for (const member of decl.members) {
    ret.push({
      tag: TagsMap.H4,
      text: member,
    });
  }

  return ret;
}
