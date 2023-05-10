using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine.UIElements;

namespace Gamium.Private.Object
{
    internal static class VisualElementExtensions
    {
        internal static VisualElement[] GetChildrenRecursive(this VisualElement visualElement)
        {
            var children = visualElement.hierarchy.Children();
            if (children == null || children.Count() == 0)
            {
                return new VisualElement[0];
            }

            var result = new List<VisualElement>();
            foreach (var child in children)
            {
                result.Add(child);
                result.AddRange(child.GetChildrenRecursive());
            }

            return result.ToArray();
        }

        internal static bool IncludesOther(this VisualElement visualElement, VisualElement other)
        {
            if (visualElement == other)
            {
                return true;
            }

            var children = visualElement.GetChildrenRecursive();
            foreach (var child in children)
            {
                if (child == other)
                {
                    return true;
                }
            }

            return false;
        }

        internal static uint GetIndexFromParent(this VisualElement visualElement)
        {
            if (null == visualElement.hierarchy.parent)
            {
                return 1;
            }

            uint index = 0;
            foreach (var child in visualElement.hierarchy.parent.hierarchy.Children())
            {
                if (child.name == visualElement.name)
                {
                    index += 1;
                    if (child == visualElement)
                    {
                        return index;
                    }
                }
            }

            throw new Exception("VisualElement not found in parent");
        }
    }
}
