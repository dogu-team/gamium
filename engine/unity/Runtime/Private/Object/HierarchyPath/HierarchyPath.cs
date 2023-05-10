using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.UIElements;

namespace Gamium.Private.Object
{
    internal class HierarchyPath
    {
        public HierarchyPathNode[] nodes { get; private set; }

        public HierarchyPath(string path)
        {
            if (null == path)
            {
                Gamium.Private.Util.Logger.Warn("HierarchyPath.ctor path is null");
            }
            if (!path.StartsWith('/'))
            {
                return;
            }

            path = path.TrimStart('/');
            var splited = path.Split('/');
            nodes = new HierarchyPathNode[splited.Length];
            for (int i = 0; i < nodes.Length; i++)
            {
                nodes[i] = new HierarchyPathNode(splited[i]);
            }
        }

        public HierarchyPath(GameObject go)
        {
            nodes = FindGameObjectPath(go).ToArray();
        }

        public HierarchyPath(VisualElement root, VisualElement target)
        {
            nodes = FindVisualElementPath(root, target).ToArray();
        }

        public bool IsEmpty()
        {
            return nodes == null || 0 == nodes.Length;
        }

        public override string ToString()
        {
            return "/" + string.Join("/", nodes.Select(n => n.ToString()));
        }

        private static List<HierarchyPathNode> FindGameObjectPath(GameObject go)
        {
            List<HierarchyPathNode> ret = new List<HierarchyPathNode>();
            if (null == go)
            {
                return ret;
            }

            ret.Add(new HierarchyPathNode(go));
            var parent = go.transform.parent;
            while (null != parent)
            {
                ret.Add(new HierarchyPathNode(parent.gameObject));
                parent = parent.parent;
            }

            ret.Reverse();
            return ret;
        }


        private static List<HierarchyPathNode> FindVisualElementPath(VisualElement source, VisualElement target)
        {
            List<HierarchyPathNode> ret = new List<HierarchyPathNode>();
            if (null == source || null == target)
            {
                return ret;
            }

            ret.Add(new HierarchyPathNode(target));
            var parent = target.hierarchy.parent;
            while (null != parent)
            {
                ret.Add(new HierarchyPathNode(parent));
                parent = parent.hierarchy.parent;
            }

            ret.Reverse();
            return ret;
        }
    }
}
