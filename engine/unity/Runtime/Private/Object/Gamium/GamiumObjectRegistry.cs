using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UIElements;

namespace Gamium.Private.Object
{
    internal static class GamiumObjectRegistry
    {
        private const string UIElementsUtilityName = "UnityEngine.UIElements.UIElementsUtility";
        private static Type UIElementsUtilityType;
        private static MethodInfo UIElementsUtility_GetPanelsIteratorMethodInfo;


        internal static VisualElementGamiumObject[] EmptyVisualElements = new VisualElementGamiumObject[] { };

        internal static void Setup(List<Type> types)
        {
            foreach (var type in types)
            {
                var fullname = type.Namespace + "." + type.Name;
                if (fullname == UIElementsUtilityName) UIElementsUtilityType = type;
            }

            if (null != UIElementsUtilityType)
            {
                UIElementsUtility_GetPanelsIteratorMethodInfo = UIElementsUtilityType.GetMethod("GetPanelsIterator",
                    BindingFlags.Static | BindingFlags.NonPublic | BindingFlags.Public);
            }
        }

        internal static IEnumerable<GamiumObject> GetRoots()
        {
            List<GamiumObject> rootObjects = SceneManager.GetActiveScene().GetRootGameObjects()
                .Select(g => new GameObjectGamiumObject(g) as GamiumObject).ToList();
            // add Don't Destroy On Load objects
            rootObjects.AddRange(ServerComponent.Behaviour.GameObjectInstance.scene.GetRootGameObjects()
                .Select(g => new GameObjectGamiumObject(g)));

            var panel = GetVisualElementRootPanel();
            if (null != panel)
            {
                rootObjects.Add(new VisualElementGamiumObject(panel.visualTree, panel.visualTree));
            }


            return rootObjects;
        }

        internal static IPanel GetVisualElementRootPanel()
        {
            if (UIElementsUtilityType != null
                && UIElementsUtility_GetPanelsIteratorMethodInfo != null)
            {
                var iterator = (IDictionaryEnumerator)UIElementsUtility_GetPanelsIteratorMethodInfo.Invoke(null, null);
                while (iterator.MoveNext())
                {
                    var panel = iterator.Value as IPanel;
                    if (panel.contextType == ContextType.Player)
                    {
                        return panel;
                    }
                }
            }

            return null;
        }


        internal static VisualElementGamiumObject[] GetVisualElementInGameObject(GameObject go)
        {
            var document = go.GetComponent<UIDocument>();
            if (document == null)
            {
                return EmptyVisualElements;
            }

            return new VisualElementGamiumObject[]
                { new VisualElementGamiumObject(document.rootVisualElement, document.rootVisualElement) };
        }
    }
}
