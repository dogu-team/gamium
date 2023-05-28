import json
import os
from typing import Union


class DotDict(dict):
    def __getattr__(self, attr):
        if attr in self:
            return self[attr]
        raise AttributeError(f"'DotDict' object has no attribute '{attr}'")

    def __setattr__(self, attr, value):
        self[attr] = value


dirpath = os.path.dirname(os.path.abspath(__file__))

with open(os.path.join(dirpath, "..", "res/markdown-tags.json"), "r") as file:
    tags_json = json.load(file)

TagsMap = DotDict(tags_json)


def parse_tag(prefix, verbose):
    ret = next((t for t in TagsMap.values() if t["prefix"] == prefix), None)
    if not ret:
        raise ValueError(f"Unknown tag: {prefix}, verbose: {verbose}")
    return ret


def generate_subtag(tag):
    return f"<code style={{{{ position:'relative', top:'-20px', fontSize:'70%'}}}} children='{tag}'/>"
