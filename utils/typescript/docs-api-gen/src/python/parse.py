import ast
import json
from typing import List, Union
import click
from markdown_util import make_typed_code_block
from markdown_tag import TagsMap, generate_subtag


class CodeGenElem:
    def __init__(self, tag: dict, text: str):
        self.tag = tag
        self.text = text

    def to_dict(self):
        return {"tag": self.tag, "text": self.text}


class CodeGenElemData:
    def __init__(self, category: str, elems: List[CodeGenElem]):
        self.category = category  # "class" | "interface" | "enum"
        self.elems = elems

    def to_dict(self):
        return {"category": self.category, "elems": [elem.to_dict() for elem in self.elems]}


class GenerateOption:
    def __init__(self, class_excludes: List[str], interface_excludes: List[str], methods_excludes: List[str], properties_excludes: List[str]):
        self.class_excludes = class_excludes
        self.interface_excludes = interface_excludes
        self.methods_excludes = methods_excludes
        self.properties_excludes = properties_excludes


class GenerateContext:
    def __init__(self, file_contents: str, option: GenerateOption):
        self.file_contents = file_contents
        self.lines = file_contents.split("\n")
        self.option = option


def generate_elem_from_class(class_def: ast.ClassDef, context: GenerateContext) -> List[CodeGenElem]:
    if class_def.name in context.option.class_excludes:
        return []

    ret: List[CodeGenElem] = []
    ret.append(CodeGenElem(TagsMap.H1, class_def.name))
    ret.append(CodeGenElem(TagsMap.DIVIDER, ""))

    init_function = [func for func in class_def.body if isinstance(func, ast.FunctionDef) and func.name == "__init__"]
    if 0 < len(init_function):
        property_elems = generate_elem_from_init_function(init_function[0], context)
        if 0 < len(property_elems):
            ret.append(CodeGenElem(TagsMap.H2, "Properties"))
            ret.extend(property_elems)

    functions = [func for func in class_def.body if isinstance(func, ast.FunctionDef)]
    functions = [x for x in functions if 0 < len(x.name)]
    functions.sort(key=lambda func: func.name)
    function_elems = []
    for func in functions:
        function_elems.extend(generate_elem_from_function(func, context))

    if len(function_elems) > 0:
        ret.append(CodeGenElem(TagsMap.H2, "Methods"))
        ret.extend(function_elems)

    return ret


def generate_elem_from_function(func_def: ast.FunctionDef, context: GenerateContext) -> List[CodeGenElem]:
    if func_def.name in context.option.methods_excludes:
        return []
    if func_def.name.startswith("_"):
        return []
    tags: List[str] = []
    tags.append(generate_subtag("public"))

    if len(func_def.decorator_list) > 0:
        for decorator in func_def.decorator_list:
            if isinstance(decorator, ast.Name) and decorator.id == "staticmethod":
                tags.append(generate_subtag("static"))
            if isinstance(decorator, ast.Name) and decorator.id == "abstractmethod":
                tags.append(generate_subtag("abstract"))
    ret: List[CodeGenElem] = []
    ret.append(CodeGenElem(TagsMap.H3, func_def.name))
    if 0 < len(tags):
        ret.append(CodeGenElem(TagsMap.CUSTOM_CHILD, " ".join(tags)))

    param_elems = [x for arg in func_def.args.args for x in generate_elem_from_arg(arg, context)]
    return_elems = generate_elem_from_return(func_def.returns, context)
    if 0 < len(param_elems):
        ret.append(CodeGenElem(TagsMap.H5, "Arguments"))
        ret.extend(param_elems)
    if 0 < len(return_elems):
        ret.append(CodeGenElem(TagsMap.H5, "Return"))
        ret.extend(return_elems)

    ret.append(CodeGenElem(TagsMap.DIVIDER, ""))

    return ret


def generate_elem_from_arg(arg_def: ast.arg, context: GenerateContext) -> List[CodeGenElem]:
    if arg_def.arg == "self":
        return []
    annotation = arg_def.annotation
    annotation_text = context.lines[annotation.lineno - 1][annotation.col_offset : annotation.end_col_offset]
    return [CodeGenElem(TagsMap.UL, f"{arg_def.arg} {make_typed_code_block(annotation_text)}")]


def generate_elem_from_return(expr: ast.expr | None, context: GenerateContext) -> List[CodeGenElem]:
    if None == expr:
        return []
    if isinstance(expr, ast.Constant):
        expr_text = context.lines[expr.lineno - 1][expr.col_offset : expr.end_col_offset]
        return [CodeGenElem(TagsMap.UL, make_typed_code_block(expr_text))]
    if isinstance(expr, ast.Name):
        return [CodeGenElem(TagsMap.UL, make_typed_code_block(expr.id))]
    if isinstance(expr, ast.Subscript):
        text = context.lines[expr.lineno - 1][expr.col_offset : expr.end_col_offset]
        return [CodeGenElem(TagsMap.UL, make_typed_code_block(text))]

    raise Exception("Not implemented")


def generate_elem_from_init_function(func_def: ast.FunctionDef, context: GenerateContext) -> List[CodeGenElem]:
    if func_def.name != "__init__":
        return []
    ret: List[CodeGenElem] = []

    args = [arg for arg in func_def.args.args if arg.arg != "self"]
    assigns = [assign for assign in func_def.body if isinstance(assign, ast.Assign)]
    for arg in args:
        match_assign = [assign for assign in assigns if isinstance(assign.targets[0], ast.Attribute) and assign.targets[0].attr == arg.arg]
        if 0 < len(match_assign):
            ret.extend(generate_elem_from_assign(match_assign[0], arg, context))

    return ret


def generate_elem_from_assign(assign_def: ast.Assign, arg_def: ast.arg, context: GenerateContext) -> List[CodeGenElem]:
    ret: List[CodeGenElem] = []
    if len(assign_def.targets) < 1:
        return []
    attr: ast.Attribute = assign_def.targets[0]
    if attr.value.id != "self":
        return []
    if attr.attr.startswith("_"):
        return []
    annotation = arg_def.annotation
    annotation_text = context.lines[annotation.lineno - 1][annotation.col_offset : annotation.end_col_offset]
    ret.append(CodeGenElem(TagsMap.H4, f"{attr.attr} {make_typed_code_block(annotation_text)}"))
    ret.append(CodeGenElem(TagsMap.DIVIDER, ""))
    return ret


# @click.command()
# @click.option("--file_path", default=None, type=str, help="Path to the file to parse")
# @click.option("--output_path", default=None, type=str, help="Path to the file to parse")
# @click.option("--class_exclude", "-s", type=str, multiple=True, help="List of class name strings")
# @click.option("--interface_exclude", "-s", type=str, multiple=True, help="List of interface name strings")
# @click.option("--methods_exclude", "-s", type=str, multiple=True, help="List of method name strings")
# @click.option("--properties_exclude", "-s", type=str, multiple=True, help="List of property name strings")
def parse(file_path, output_path, class_exclude, interface_exclude, methods_exclude, properties_exclude):
    if file_path is None:
        raise Exception("file_path is required")

    print(f"file_path: {file_path}")
    print(f"class_exclude: {class_exclude}")
    print(f"interface_exclude: {interface_exclude}")
    print(f"methods_exclude: {methods_exclude}")
    print(f"properties_exclude: {properties_exclude}")

    contents = open(file_path).read()
    context: GenerateContext = GenerateContext(contents, GenerateOption(class_exclude, interface_exclude, methods_exclude, properties_exclude))
    parsed = ast.parse(contents)
    ret: List[CodeGenElemData] = []
    for part in parsed.body:
        if isinstance(part, ast.ClassDef):
            ret.append(CodeGenElemData("class", generate_elem_from_class(part, context)))
        if isinstance(part, ast.alias):
            pass

    # write ret to tmp.json
    with open(output_path, "w") as file:
        json.dump({"root": [x.to_dict() for x in ret]}, file, indent=2)


# if __name__ == "__main__":
#     parse()
parse(
    "/Users/jenkins/projects/gamium/client/python/gamium/gamium/locator/locator.py",
    "/Users/jenkins/projects/gamium/utils/typescript/docs-api-gen/tmp.json",
    [],
    [],
    [],
    [],
)
