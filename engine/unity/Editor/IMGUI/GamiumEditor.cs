using System;
using System.Runtime.CompilerServices;
using Gamium.Private.Object;
using UnityEngine;
using UnityEditor;
using Transform = UnityEngine.Transform;

[assembly: InternalsVisibleTo("com.dogu.gamium.engine.unity.tests.editor")]

namespace Gamium.Editor.IMGUI
{
    internal class GamiumEditor : EditorWindow
    {
        private static SelectedGameObjectGUI selectedGameObjectGUI = new SelectedGameObjectGUI();
        private static PositionPicker positionPicker = new PositionPicker();
        internal static bool isEnable;
        internal static GamiumEditor window;

        [MenuItem("Window/GamiumEditor")]
        static void OpenWindow()
        {
            Init();
            window.Show();
        }

        private void OnEnable()
        {
            isEnable = true;
        }

        private void OnDisable()
        {
            isEnable = false;
        }

        void Update()
        {
            if (null == window)
            {
                return;
            }

            selectedGameObjectGUI.Update();
        }

        void OnGUI()
        {
            if (null == window)
            {
                Init();
            }

            selectedGameObjectGUI.Draw();
            positionPicker.Draw();

            // var controlRect = EditorGUILayout.GetControlRect();
            var rect = new Rect(0, 0, window.position.width, window.position.height);
            StatusBar.Draw(rect);
        }


        static void Init()
        {
            selectedGameObjectGUI.Init();
            positionPicker.Init();
            window = (GamiumEditor)EditorWindow.GetWindow(typeof(GamiumEditor), false, "Gamium");
        }
    }
}
