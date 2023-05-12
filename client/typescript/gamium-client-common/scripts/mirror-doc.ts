import {
  CodeGenMarkdown,
  CodeGenSyncer,
  CodeGenTypeMdxMapper,
  CodeGenTypescript,
  TypescriptGenerateOption,
} from "@dogu/docs-gen";
import { buildTree } from "@dogu/docs-gen/build/src/codegen-elemtree";
import fs from "fs";
import path from "path";

interface FileToMd {
  codeFilePath: string;
  option?: Partial<TypescriptGenerateOption>;
}
if (!process.env.DOGU_DOCS_PATH) {
  throw new Error("DOGU_DOCS_PATH is not defined");
}

const doguDocsPath = process.env.DOGU_DOCS_PATH as string;
const doguDocsApiPath = path.resolve(
  doguDocsPath,
  "docs/gamium/gamium-client/api"
);
const projectPath = path.resolve(__dirname, "..");
const gamiumProtocolPath = path.resolve(
  projectPath,
  "src/protocols/generated/gamium/protocol"
);
const classesMdxDirectory = path.resolve(
  doguDocsPath,
  "docs/gamium/gamium-client/api/classes"
);
const typesMdxDirectory = path.resolve(
  doguDocsPath,
  "docs/gamium/gamium-client/api/types"
);
const enumsMdxDirectory = path.resolve(
  doguDocsPath,
  "docs/gamium/gamium-client/api/enums"
);

const optionFiles = fs
  .readdirSync(path.resolve(projectPath, "src/options"))
  .filter((file) => file !== "index.ts");

const fileToMdList: FileToMd[] = [
  {
    codeFilePath: path.resolve(projectPath, "src/gamium-client.ts"),
    option: {
      methodsExlude: ["connect", "disconnect", "inspector", "hello", "sleep"],
      propertiesExlude: ["logger"],
    },
  },
  {
    codeFilePath: path.resolve(projectPath, "src/ui/ui.ts"),
  },
  {
    codeFilePath: path.resolve(projectPath, "src/object/player.ts"),
  },
  {
    codeFilePath: path.resolve(projectPath, "src/object/ui-element.ts"),
  },
  {
    codeFilePath: path.resolve(projectPath, "src/actions/action-chain.ts"),
  },
  {
    codeFilePath: path.resolve(projectPath, "src/locator/locator.ts"),
  },
  {
    codeFilePath: path.resolve(projectPath, "src/locator/rpc-locator.ts"),
  },
  {
    codeFilePath: path.resolve(projectPath, "src/locator/by.ts"),
  },
  {
    codeFilePath: path.resolve(projectPath, "src/actions/key-by.ts"),
  },
  {
    codeFilePath: path.resolve(projectPath, "src/locator/rpc-by.ts"),
  },
  {
    codeFilePath: path.resolve(projectPath, "src/until.ts"),
  },
  {
    codeFilePath: path.resolve(projectPath, "src/errors/gamium-error.ts"),
    option: {
      classExlude: [],
      interfaceExlude: [],
      methodsExlude: ["setCause"],
    },
  },

  ...optionFiles.map((file) => ({
    codeFilePath: path.resolve(projectPath, "src/options", file),
  })),
  {
    codeFilePath: path.resolve(projectPath, "src/protocols/types.ts"),
    option: {
      classExlude: [],
      interfaceExlude: [
        "ObjectHierarchyNode",
        "ObjectsHierarchy",
        "InspectObjectOnScreenResult",
      ],
      methodsExlude: [],
    },
  },
  {
    codeFilePath: path.resolve(gamiumProtocolPath, "types/object-type.ts"),
  },
  {
    codeFilePath: path.resolve(
      gamiumProtocolPath,
      "types/unity/unity-keyboard.ts"
    ),
  },
  {
    codeFilePath: path.resolve(
      gamiumProtocolPath,
      "types/unity/unity-key-code.ts"
    ),
  },
  {
    codeFilePath: path.resolve(
      gamiumProtocolPath,
      "types/unity/unity-key-code.ts"
    ),
  },
  {
    codeFilePath: path.resolve(
      gamiumProtocolPath,
      "types/object-locator-by.ts"
    ),
  },
  {
    codeFilePath: path.resolve(gamiumProtocolPath, "types/input-key-by.ts"),
  },
  {
    codeFilePath: path.resolve(gamiumProtocolPath, "types/execute-rpc-by.ts"),
  },
  {
    codeFilePath: path.resolve(
      gamiumProtocolPath,
      "packets/actions/move-player-by.ts"
    ),
  },
  {
    codeFilePath: path.resolve(gamiumProtocolPath, "types/error-code.ts"),
  },
];

(async () => {
  const typeMdx = new CodeGenTypeMdxMapper([
    classesMdxDirectory,
    typesMdxDirectory,
    enumsMdxDirectory,
  ]);
  await typeMdx.parse();
  for (const fileToMd of fileToMdList) {
    const ts = new CodeGenTypescript(fileToMd.codeFilePath, fileToMd.option);

    const elemData = await ts.parse();
    for (const elemDatum of elemData) {
      const nodes = buildTree(elemDatum.elems);
      const category = mapCategory(elemDatum.category);
      if (!elemDatum.elems[0]) {
        console.warn(
          `file: ${fileToMd.codeFilePath}, category: ${category} has no elem`
        );
        continue;
      }
      const name = pascalToKebabCase(elemDatum.elems[0].text);

      const mdFilePath = path.resolve(doguDocsApiPath, category, `${name}.mdx`);

      const md = new CodeGenMarkdown(mdFilePath);
      await md.parse();

      const syncer = new CodeGenSyncer(nodes, md, typeMdx);
      await syncer.sync();
    }
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

function camelToKebabCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function pascalToKebabCase(str: string): string {
  str = str.replace("UI", "ui");
  str = str.replace(/^[A-Z]/, (letter) => letter.toLowerCase());
  return camelToKebabCase(str);
}

function mapCategory(str: string): string {
  if (str === "class") {
    return "classes";
  }
  if (str === "interface") {
    return "types";
  }
  if (str === "enum") {
    return "enums";
  }
  throw new Error(`unknown category: ${str}`);
}
