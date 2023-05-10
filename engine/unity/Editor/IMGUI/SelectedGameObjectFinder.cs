using System;
using System.Collections.Generic;
using Gamium.Private.Object;
using UnityEditor;
using UnityEngine.UIElements;

namespace Gamium.Editor.IMGUI
{
    internal class SelectedGameObjectFinder : SelectedObjectFinderBase
    {
        private Action selectionChangeAction;

        public override void Init(List<Type> types)
        {
            selectionChangeAction = () => OnSelectionChange();
            Selection.selectionChanged -= selectionChangeAction;
            Selection.selectionChanged += selectionChangeAction;
        }

        public override void Update()
        {
        }

        public override string GetHierarchyPath()
        {
            if (null == Selection.activeGameObject)
            {
                return string.Empty;
            }

            return new HierarchyPath(Selection.activeGameObject).ToString();
        }

        void OnSelectionChange()
        {
            Repaint();
        }

    }
}
