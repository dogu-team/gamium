using System;
using Gamium.Private.Editor;
using UnityEditor;
using UnityEngine;

namespace Gamium.Editor.IMGUI
{
    internal class PositionPicker
    {
        private PickPositionIndicator.Behavior pickPositionIndicator;
        private bool pickPositionOn;


        internal void Init()
        {
            SceneView.duringSceneGui -= OnSceneGUI;
            SceneView.duringSceneGui += OnSceneGUI;
            EditorApplication.playModeStateChanged += ModeStateChanged;
            UnloadPickPositionIndicator();
        }

        internal void Draw()
        {
            Document.Header3(new Document.HeaderParam
            {
                text = "Position Picker",
                description = "Utility to find world position of a point in the scene view.\n" +
                              "Raycast is used to find the position.\n" +
                              "so collider is required on plane.",
            });

            pickPositionOn = Document.Toggle(new Document.ToggleParam
            {
                key = "On / Off",
                defaultValue = true,
                description = "Press Shift+Alt key when mouse is on Scene view",
            });
        }

        void OnSceneGUI(SceneView sceneView)
        {
            if (false == GamiumEditor.isEnable) return;
            if (null == Event.current) return;
            UpdatePickTransform();
            if (!pickPositionOn) return;

            if (Event.current.modifiers != (EventModifiers.Alt | EventModifiers.Shift))
            {
                return;
            }

            Ray ray = HandleUtility.GUIPointToWorldRay(Event.current.mousePosition);
            RaycastHit hit;
            if (false == Physics.Raycast(ray, out hit, Mathf.Infinity, Physics.AllLayers))
            {
                Gamium.Private.Util.Logger.WarnThrottle($"Gamium Editor nothing hitted. Check collider is on plane.", 3.0f);
                return;
            }

            // Debug.DrawLine(hit.point - ray.direction, hit.point + ray.direction, Color.red, 2);

            LoadPickPositionIndicator();
            pickPositionIndicator.transform.position = hit.point;
            Selection.activeGameObject = pickPositionIndicator.gameObject;

            GamiumEditor.window?.Repaint();
        }

        void UpdatePickTransform()
        {
            if (null == pickPositionIndicator)
            {
                return;
            }

            if (Selection.activeGameObject != pickPositionIndicator.gameObject)
            {
                UnloadPickPositionIndicator();
                return;
            }

            if (pickPositionIndicator.transform.hasChanged)
            {
                GamiumEditor.window?.Repaint();
            }
        }

        void ModeStateChanged(PlayModeStateChange state)
        {
            if (state == PlayModeStateChange.ExitingEditMode)
            {
                UnloadPickPositionIndicator();
            }
        }

        private void LoadPickPositionIndicator()
        {
            if (null != pickPositionIndicator)
            {
                return;
            }

            pickPositionIndicator = GameObject.FindObjectOfType<PickPositionIndicator.Behavior>();
            if (null == pickPositionIndicator)
            {
                var go = new GameObject("GamiumPickPositionIndicator");
                pickPositionIndicator = go.AddComponent<PickPositionIndicator.Behavior>();
            }

            pickPositionIndicator.tag = "EditorOnly";
            var transform = pickPositionIndicator.transform;
            transform.position = Vector3.zero;
            transform.rotation = Quaternion.identity;
            transform.localScale = Vector3.one;
        }

        private void UnloadPickPositionIndicator()
        {
            pickPositionIndicator = GameObject.FindObjectOfType<PickPositionIndicator.Behavior>();
            if (null == pickPositionIndicator)
            {
                return;
            }

            GameObject.DestroyImmediate(pickPositionIndicator.gameObject);
        }
    }
}
