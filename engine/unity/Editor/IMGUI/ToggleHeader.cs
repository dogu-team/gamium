using System;
using UnityEditor;

namespace Gamium.Editor.IMGUI
{
    internal class ToggleHeader
    {
        string name = "";
        private string Name => $"ToggleHeader_{name}";

        internal ToggleHeader(string name, Action body, bool isOpen = true)
        {
            this.name = name;

            var foldOut = States.Get(Name, isOpen);
            foldOut = EditorGUILayout.Foldout(foldOut, name);
            States.Set(Name, foldOut);
            if (foldOut)
            {
                body?.Invoke();
            }
        }
    }
}
