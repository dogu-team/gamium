using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using UnityEngine;
using UnityEngine.UIElements;

namespace Gamium.Private.Object
{
    internal struct HierarchyPathNode
    {
        public string nodeString;
        public string name;
        public uint oneBaseIndex; // zero means including all same name elements

        public HierarchyPathNode(string argNodeString)
        {
            nodeString = argNodeString;

            var match = Regex.Match(argNodeString, @"(.*)\[(\d+)\]$");
            if (match.Success)
            {
                name = match.Groups[1].Value;
                oneBaseIndex = uint.Parse(match.Groups[2].Value);
            }
            else
            {
                name = argNodeString;
                oneBaseIndex = 0;
            }
        }

        public HierarchyPathNode(GameObject go)
        {
            var index = go.GetIndexFromParent();
            if (0 == index)
            {
                nodeString = go.name;
            }
            else
            {
                nodeString = $"{go.name}[{index}]";
            }

            name = go.name;
            oneBaseIndex = index;
        }


        public HierarchyPathNode(VisualElement visualElement)
        {
            var index = visualElement.GetIndexFromParent();
            if (0 == index)
            {
                nodeString = visualElement.name;
            }
            else
            {
                nodeString = $"{visualElement.name}[{index}]";
            }

            name = visualElement.name;
            oneBaseIndex = index;
        }

        public override string ToString()
        {
            return nodeString;
        }

        public GamiumObject[] FilterMatch(IEnumerable<GamiumObject> argObjects)
        {
            var thisName = name;
            var matched = argObjects.Where(g => g.GetName() == thisName);
            if (oneBaseIndex > 0 && oneBaseIndex <= matched.Count())
            {
                return new GamiumObject[] { matched.ToArray()[oneBaseIndex - 1] };
            }
            else if (oneBaseIndex > 0 && oneBaseIndex >= matched.Count())
            {
                Util.Logger.Verbose(
                    $"Node:{nodeString} find failed. {oneBaseIndex} is out of range. {matched.Count()} matched. nothing returned");
                return new GamiumObject[0];
            }

            return matched.ToArray();
        }
    }
}
