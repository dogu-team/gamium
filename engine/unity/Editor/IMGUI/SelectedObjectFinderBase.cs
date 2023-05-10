using System;
using System.Collections.Generic;

namespace Gamium.Editor.IMGUI
{
    internal abstract class SelectedObjectFinderBase
    {
        public abstract void Init(List<Type> types);
        public abstract void Update();
        public abstract string GetHierarchyPath();

        public void Repaint()
        {
            if (false == GamiumEditor.isEnable) return;
            GamiumEditor.window?.Repaint();
        }
    }
}
