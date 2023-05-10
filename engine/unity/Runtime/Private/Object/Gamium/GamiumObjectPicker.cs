using System;
using System.Collections.Generic;
using System.Linq;
using Gamium.Extensions;
using Gamium.Private.Util;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UIElements;

namespace Gamium.Private.Object
{
    internal static class GamiumObjectPicker
    {
        internal static bool ignoreBigObject = true;

        private static List<Func<GameObject, bool>> IsTargetFiltersGo = new List<Func<GameObject, bool>>
        {
            FilterBigGo
        };

        internal static GamiumObject RayGamiumObject(Vector3 screenPos, out Vector3 hitPoint)
        {
            List<GamiumObject> results = RayGamiumObjects(screenPos, out hitPoint);
            if (results.Count == 0)
            {
                return null;
            }

            return results[0];
        }


        internal static List<GamiumObject> RayGamiumObjects(Vector3 screenPos, out Vector3 hitPoint)
        {
            List<GamiumObject> results = new List<GamiumObject>();

            RayVisualElements(screenPos, out var rootElem, out var visualElements);
            if (null != rootElem)
            {
                results.AddRange(visualElements.Select(e => new VisualElementGamiumObject(e, rootElem)));
            }

            var gos = RayGameObjects(screenPos, out hitPoint);
            results.AddRange(gos.Select(go => new GameObjectGamiumObject(go)));

            return results;
        }


        internal static void RayVisualElement(Vector2 screenPos, out VisualElement root,
            out VisualElement result)
        {
            RayVisualElements(screenPos, out root, out var elems);
            if (null == root || elems.Count == 0)
            {
                result = null;
            }

            result = elems[0];
        }

        internal static void RayVisualElements(Vector2 screenPos, out VisualElement root,
            out List<VisualElement> results)
        {
            var rootPanel = GamiumObjectRegistry.GetVisualElementRootPanel();
            root = null;
            results = new List<VisualElement>();
            if (null == rootPanel)
            {
                return;
            }

            root = rootPanel.visualTree;

            var screenToPanelRatio = rootPanel.ScreenToPanelRatio(out var panelSize);
            rootPanel.PickAll(
                new Vector2(screenPos.x * screenToPanelRatio.x, panelSize.y - screenPos.y * screenToPanelRatio.y),
                results);
        }

        internal static GameObject RayGameObject(Vector3 screenPos, out Vector3 hitPoint)
        {
            var gos = RayGameObjects(screenPos, out hitPoint);
            if (gos.Count == 0)
            {
                return null;
            }

            foreach (var go in gos)
            {
                var filtered = IsTargetFiltersGo.Any(filter => !filter(go));
                if (filtered)
                {
                    continue;
                }

                return go;
            }

            return null;
        }


        private static List<GameObject> RayGameObjects(Vector3 screenPos, out Vector3 hitPoint)
        {
            hitPoint = Vector3.zero;
            var pointerData = new PointerEventData(GamiumEventSystem.Behaviour.instance.Current())
            {
                position = screenPos
            };

            List<GameObject> gos = new List<GameObject>();


            var raycasts = RaycastUtil.RaycastEventSystemAll(pointerData);
            foreach (var raycast in raycasts)
            {
                if (null != raycast.gameObject)
                {
                    gos.Add(raycast.gameObject);
                }
            }

            RaycastUtil.RaycastPhysics3DAll(screenPos, out var hit3ds);
            foreach (var hit3d in hit3ds)
            {
                hitPoint = hit3d.point;
                if (null != hit3d.transform.gameObject)
                {
                    gos.Add(hit3d.transform.gameObject);
                }
            }

            RaycastUtil.RaycastPhysics2DAll(screenPos, out var hit2ds);
            foreach (var hit2d in hit2ds)
            {
                hitPoint = hit2d.point;
                if (null != hit2d.collider.gameObject)
                {
                    gos.Add(hit2d.collider.gameObject);
                }
            }

            return gos;
        }

        private static bool FilterBigGo(GameObject go)
        {
            if (!ignoreBigObject)
            {
                return true;
            }

            var err = go.GetScreenPositionAndRectSize(out var screenPos, out var rectSize);
            if (!err.IsSuccess())
            {
                return true;
            }

            if ((Screen.width / 2 - 10) < rectSize.x && (Screen.height / 2 - 10) < rectSize.y)
            {
                return false;
            }

            return true;
        }
    }
}
