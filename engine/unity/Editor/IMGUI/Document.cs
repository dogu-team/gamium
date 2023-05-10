using System;
using Gamium.Private.Util;
using UnityEditor;
using UnityEngine;

namespace Gamium.Editor.IMGUI
{
    internal static class Document
    {
        internal class HeaderParam
        {
            public string text;
            public string description;
        }

        internal static void Header3(HeaderParam param)
        {
            GUILayout.Label(new GUIContent(param.text, param.description), Styles.Text_Header3,
                new GUILayoutOption[] { GUILayout.ExpandWidth(true) });
        }

        internal class FieldParam
        {
            public string key;
            public string value;
            public string description;
        }

        internal static void Field(FieldParam param)
        {
            EditorGUILayout.BeginHorizontal();
            using var deferH = new Defer(() => { EditorGUILayout.EndHorizontal(); });

            GUILayout.Space(10.0f);
            {
                EditorGUILayout.BeginVertical();
                using var deferV = new Defer(() => { EditorGUILayout.EndVertical(); });

                {
                    EditorGUILayout.BeginHorizontal();
                    using var defer0 = new Defer(() => { EditorGUILayout.EndHorizontal(); });

                    GUILayout.Label(new GUIContent(param.key, param.description),
                        new GUILayoutOption[] { GUILayout.Width(110) });
                    if (GUILayout.Button(new GUIContent(param.value, "Press here to copy"), Styles.Text_Button))
                    {
                        EditorGUIUtility.systemCopyBuffer = param.value;
                        StatusBar.Verbose($"\"{param.value}\" copied to clipboard");
                    }
                }
            }
        }

        internal class ToggleParam
        {
            public string key;
            public bool defaultValue;
            public string description;
        }

        internal static bool Toggle(ToggleParam param)
        {
            EditorGUILayout.BeginHorizontal();
            using var deferH = new Defer(() => { EditorGUILayout.EndHorizontal(); });

            GUILayout.Space(10.0f);
            {
                EditorGUILayout.BeginVertical();
                using var deferV = new Defer(() => { EditorGUILayout.EndVertical(); });

                {
                    var toggleKey = $"DocumentToggle_{param.key}";
                    var toggle = States.Get(toggleKey, param.defaultValue);
                    EditorGUILayout.BeginHorizontal();
                    using var defer0 = new Defer(() => { EditorGUILayout.EndHorizontal(); });

                    GUILayout.Label(new GUIContent(param.key, param.description),
                        new GUILayoutOption[] { GUILayout.Width(100) });
                    toggle = GUILayout.Toggle(toggle, new GUIContent("", param.description));
                    States.Set(toggleKey, toggle);
                    return toggle;
                }
            }
        }
    }
}
