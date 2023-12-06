using System;
using System.Linq;
using Gamium.Extensions;
using Gamium.Private.Util;
using Gamium.Protocol.Types;
using UnityEngine;
using Vector2 = UnityEngine.Vector2;
using Vector3 = UnityEngine.Vector3;
using Vector4 = UnityEngine.Vector4;

namespace Gamium.Private.Object
{
    internal static class ObjectHierarchyNodeTExtensions
    {
        internal static uint GetIndexFromParent(this ObjectHierarchyNodeT node, ObjectHierarchyNodeT[] siblings)
        {
            uint index = 0;
            foreach (var sibling in siblings)
            {
                if (string.CompareOrdinal(sibling.Name, node.Name) == 0)
                {
                    index += 1;
                    if (sibling == node)
                    {
                        return index;
                    }
                }
            }

            throw new Exception("ObjectHierarchyNodeT not found in siblings");
        }
    }
}
