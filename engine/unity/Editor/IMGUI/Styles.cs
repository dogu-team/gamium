using UnityEngine;

namespace Gamium.Editor.IMGUI
{
    internal static class Styles
    {
        public static GUIStyle Text_Header3;
        public static GUIStyle Text_Button;
        public static GUIStyle Label_StatusBar;
        public static GUILayoutOption Label_StatusBarOption;

        static Styles()
        {
            Text_Header3 = new GUIStyle(GUI.skin.label);
            Text_Header3.alignment = TextAnchor.MiddleLeft;
            Text_Header3.fontStyle = FontStyle.Bold;
            Text_Header3.fontSize = 13;

            Text_Button = new GUIStyle(GUI.skin.button);
            Text_Button.alignment = TextAnchor.MiddleLeft;
            Text_Button.wordWrap = true;

            Label_StatusBar = new GUIStyle(GUI.skin.box);
            Label_StatusBar.alignment = TextAnchor.MiddleLeft;
            Label_StatusBar.wordWrap = true;
            
            Label_StatusBarOption = GUILayout.ExpandWidth(true);
        }
    }
}
