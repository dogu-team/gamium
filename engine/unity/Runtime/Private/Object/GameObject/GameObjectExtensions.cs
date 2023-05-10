using System;
using System.Linq;
using Gamium.Extensions;
using Gamium.Private.Util;
using Gamium.Protocol.Types;
using UnityEngine;
using Vector2 = UnityEngine.Vector2;
using Vector3 = UnityEngine.Vector3;
using Vector4 = UnityEngine.Vector4;

namespace Gamium.Private.Object
{
    internal static class GameObjectExtensions
    {
        private static Vector3[] screenSpaceCorners = new Vector3[8];

        internal static GameObject[] GetChildren(this GameObject go)
        {
            GameObject[] children = new GameObject[go.transform.childCount];
            for (int i = 0; i < go.transform.childCount; i++)
            {
                children[i] = go.transform.GetChild(i).gameObject;
            }

            return children;
        }

        internal static GameObject[] GetChildrenRecursive(this GameObject go)
        {
            return go.GetComponentsInChildren<Transform>().Select((transform => transform.gameObject))
                .ToArray();
        }


        internal static bool IncludesOther(this GameObject go, GameObject candidates)
        {
            if (go.GetInstanceID() == candidates.GetInstanceID())
            {
                return true;
            }

            var children = go.GetChildrenRecursive();
            foreach (var child in children)
            {
                if (child.GetInstanceID() == candidates.GetInstanceID())
                {
                    return true;
                }
            }

            return false;
        }

        #region Screen

        internal static ErrorResultT GetScreenPositionAndRectSize(this GameObject go, out Vector3 pos,
            out Vector2 rectSize)
        {
            ErrorResultT err = ErrorResultExtensions.None;
            Vector3 screenPosition = Vector3.zero;
            pos = Vector3.zero;
            rectSize = Vector4.zero;
            if (null == go || null == go.transform)
            {
                return new ErrorResultT
                {
                    Code = ErrorCode.ObjectNotFound, Reason = $"GameObject({new HierarchyPath(go)}) not found "
                };
            }

            var rect = go.GetComponent<RectTransform>();
            if (rect)
            {
                err = GetRectTransformScreenPositionAndRectSize(rect, ref screenPosition, ref rectSize);
                if (!err.IsSuccess())
                {
                    return err;
                }
            }
            else
            {
                err = FindCamera(go, out var camera);
                if (!err.IsSuccess())
                {
                    return err;
                }

                screenPosition = camera.WorldToScreenPoint(go.transform.position);
                go.GetRendererRect(out var renderRect);
                rectSize = renderRect.size;
                var skinMesh = go.GetComponentInChildren<SkinnedMeshRenderer>();
                if (skinMesh)
                {
                    screenPosition = camera.WorldToScreenPoint(skinMesh.bounds.center);
                    var skinMeshRect = skinMesh.bounds.BoundsInScreen(camera);
                    rectSize = skinMeshRect.size;
                }
            }

            screenPosition = new Vector3(Mathf.Clamp(screenPosition.x, 0.0f, Screen.width),
                Mathf.Clamp(screenPosition.y, 0.0f, Screen.height), screenPosition.z);
            if (rectSize == Vector2.zero)
            {
                rectSize = new Vector2(3, 3);
            }

            pos = screenPosition;

            return ErrorResultExtensions.None;
        }

        private static ErrorResultT GetRectTransformScreenPositionAndRectSize(RectTransform rect,
            ref Vector3 screenPosition,
            ref Vector2 rectSize)
        {
            Vector3[] fourCornersArray = new Vector3[4];
            rect.GetWorldCorners(fourCornersArray);
            var worldPosition = Vector3.zero;
            var vMin = new Vector3(float.MaxValue, float.MaxValue, float.MaxValue);
            var vMax = new Vector3(float.MinValue, float.MinValue, float.MinValue);
            foreach (var corner in fourCornersArray)
            {
                worldPosition += corner / 4;
                vMin = Vector3.Min(corner, vMin);
                vMax = Vector3.Max(corner, vMax);
            }

            var err = FindCanvas(rect.gameObject, out var canvas);
            if (!err.IsSuccess())
            {
                return err;
            }

            switch (canvas.renderMode)
            {
                case RenderMode.ScreenSpaceOverlay:
                {
                    screenPosition = worldPosition;
                    rectSize = new Vector2(vMax.x - vMin.x, vMax.y - vMin.y);
                    break;
                }
                case RenderMode.ScreenSpaceCamera:
                {
                    screenPosition = canvas.worldCamera.WorldToScreenPoint(worldPosition);
                    var screenMin = canvas.worldCamera.WorldToScreenPoint(vMin);
                    var screenMax = canvas.worldCamera.WorldToScreenPoint(vMax);
                    rectSize = new Vector2(screenMax.x - screenMin.x, screenMax.y - screenMin.y);
                    break;
                }
                case RenderMode.WorldSpace:
                {
                    err = FindCamera(rect.gameObject, out var camera);
                    if (!err.IsSuccess())
                    {
                        return err;
                    }

                    screenPosition = camera.WorldToScreenPoint(rect.gameObject.transform.position);
                    var screenMin = canvas.worldCamera.WorldToScreenPoint(vMin);
                    var screenMax = canvas.worldCamera.WorldToScreenPoint(vMax);
                    rectSize = new Vector2(screenMax.x - screenMin.x, screenMax.y - screenMin.y);
                    break;
                }
            }

            return ErrorResultExtensions.None;
        }

        internal static bool GetRendererRect(this GameObject go, out Rect rect)
        {
            var renderer = go.GetComponent<Renderer>();
            if (null == renderer)
            {
                rect = Rect.zero;
                return false;
            }

            // http://answers.unity.com/answers/1628573/view.html
            rect = GetRendererBoundsInScreenSpace(renderer);
            return true;
        }


        private static Rect GetRendererBoundsInScreenSpace(Renderer r)
        {
            Bounds bigBounds = r.bounds;
            return bigBounds.BoundsInScreen(GamiumCamera.Get());
        }

        #endregion

        private static ErrorResultT FindCamera(this GameObject go, out Camera cam)
        {
            cam = null;
            var parentCameras = go.transform.GetComponentsInParent<Camera>();
            if (1 < parentCameras.Length)
            {
                return new ErrorResultT
                {
                    Code = ErrorCode.ObjectMultipleComponentFound,
                    Reason =
                        $"The parents of GameObject(path:{new HierarchyPath(go)}) have multiple cameras(len:{parentCameras.Length}."
                };
            }
            else if (1 == parentCameras.Length)
            {
                cam = parentCameras[0];
                return ErrorResultExtensions.None;
            }

            if (null != Camera.main)
            {
                cam = Camera.main;
                return ErrorResultExtensions.None;
            }

            var cameras = Camera.allCameras;
            if (0 == Camera.allCameras.Length)
            {
                return new ErrorResultT
                {
                    Code = ErrorCode.ObjectComponentNotFound,
                    Reason = $"No camera found in GameObject(path:{new HierarchyPath(go)})."
                };
            }

            cam = cameras[0];
            return ErrorResultExtensions.None;
        }

        private static ErrorResultT FindCanvas(this GameObject go, out Canvas canvas)
        {
            canvas = null;
            var parentCanvasList = go.transform.GetComponentsInParent<Canvas>(true);
            if (0 == parentCanvasList.Length)
            {
                return new ErrorResultT
                {
                    Code = ErrorCode.ObjectComponentNotFound,
                    Reason = $"No canvas found in GameObject(path:{new HierarchyPath(go)})."
                };
            }

            canvas = parentCanvasList[0];
            return ErrorResultExtensions.None;
        }

        internal static uint GetIndexFromParent(this GameObject go)
        {
            GameObject[] childs;
            if (null == go.transform.parent)
            {
                childs = go.scene.GetRootGameObjects();
            }
            else
            {
                childs = go.transform.parent.gameObject.GetChildren();
            }


            uint index = 0;
            foreach (var child in childs)
            {
                if (child.name == go.name)
                {
                    index += 1;
                    if (child == go)
                    {
                        return index;
                    }
                }
            }

            throw new Exception("GameObject not found in parent");
        }
    }
}
