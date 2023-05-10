using System;
using System.Linq;
using Gamium.Private;
using UnityEditor;
using UnityEngine;

namespace Gamium.Editor.IMGUI
{
    internal class SelectedGameObjectGUI
    {
        private Action selectionChangeAction;
        private string pickedPositionObject;
        private SelectedObjectFinderBase visualElementFinder = new SelectedVisualElementFinder();
        private SelectedObjectFinderBase gameObjectFinder = new SelectedGameObjectFinder();


        internal void Init()
        {
            var types = AppDomain.CurrentDomain.GetAssemblies().ToList()
                .SelectMany((a) => Codebase.GetTypes(a)).ToList();
            visualElementFinder.Init(types);
            gameObjectFinder.Init(types);
        }

        internal void Update()
        {
            visualElementFinder.Update();
            gameObjectFinder.Update();
        }

        internal void Draw()
        {
            Document.Header3(new Document.HeaderParam
            {
                text = "Selected Object",
                description = "Selected Object in hierarchy window",
            });

            Document.Field(new Document.FieldParam
            {
                key = "GameObject Path",
                value = gameObjectFinder.GetHierarchyPath(),
                description = "HierarchyPath of selected GameObject",
            });
            
            Document.Field(new Document.FieldParam
            {
                key = "UIElement Path",
                value = visualElementFinder.GetHierarchyPath(),
                description = "HierarchyPath of selected ui element in UI Toolkit Debugger",
            });


            var position = Selection.activeGameObject == null
                ? Vector3.zero
                : Selection.activeGameObject.transform.position;
            var positionString =
                $"({Math.Round(position.x * 100) / 100}, {Math.Round(position.y * 100) / 100}, {Math.Round(position.z * 100) / 100})";
            Document.Field(new Document.FieldParam
            {
                key = "World Position",
                value = positionString,
                description = "World position of selected GameObject"
            });
        }
    }
}
