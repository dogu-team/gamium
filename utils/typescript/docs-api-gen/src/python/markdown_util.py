import re


def make_typed_code_block(param: str):
    ret = ""
    is_bracket_open = False
    param = param.replace("\r", "")
    param = param.replace("\n", "")
    param = param.replace('"', "")
    param = re.sub(r"\s+", " ", param)
    for elem in param:
        if not elem.isalnum():
            if is_bracket_open:
                ret += "`"
                is_bracket_open = False
            ret += elem
            continue
        if not is_bracket_open:
            ret += "`"
            is_bracket_open = True
        ret += elem
    if is_bracket_open:
        ret += "`"
    return ret
