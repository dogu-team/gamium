using System.Threading.Tasks;
using Gamium.Extensions;
using Gamium.Private.Debug;
using Gamium.Private.Util;
using Gamium.Protocol.Packets;
using Gamium.Protocol.Types;
using UnityEngine;
using UnityEngine.EventSystems;
using Vector3 = UnityEngine.Vector3;

namespace Gamium.Private.Object
{
    internal static class GameObjectInteractability
    {
        private static Vector3[] WorldCorners = new Vector3[4];

        internal static async Task<ErrorResultT> IsInteractable(QueryObjectInteractableParamT param, GameObject go)
        {
            if (null == go)
            {
                return new ErrorResultT
                    { Code = ErrorCode.ObjectNotFound, Reason = $"GameObject({param.ObjectId}) not found " };
            }

            if (!go.activeInHierarchy)
            {
                return new ErrorResultT
                {
                    Code = ErrorCode.ObjectIsNotActive, Reason = $"GameObject({param.ObjectId}) not active"
                };
            }

            var err = go.GetScreenPositionAndRectSize(out var screenPos, out var rectSize);
            if (!err.IsSuccess())
            {
                return err;
            }

            Visual.ShowText(screenPos, 0.5f, "?");
            Visual.ShowRect(screenPos, rectSize, 0.5f);


            if (param.CheckMoving)
            {
                var befScreenPos = screenPos;
                await Task.Delay(100);
                err = go.GetScreenPositionAndRectSize(out screenPos, out rectSize);
                if (!err.IsSuccess())
                {
                    return err;
                }

                if (befScreenPos != screenPos)
                {
                    return new ErrorResultT
                    {
                        Code = ErrorCode.ObjectIsMoving, Reason = $"GameObject({param.ObjectId}) is moving"
                    };
                }
            }

            if (go.GetComponent<RectTransform>())
            {
                return IsInteractableUGUI(param, go, screenPos);
            }

            if (GamiumCamera.Get() == null)
            {
                return new ErrorResultT
                {
                    Code = ErrorCode.ObjectComponentNotFound,
                    Reason = $"Camera not found. current:{Camera.current}, main:{Camera.main}"
                };
            }

            return IsInteractableGO(param, go, screenPos);
        }


        private static ErrorResultT IsInteractableUGUI(QueryObjectInteractableParamT param, GameObject go,
            Vector3 screenPos)
        {
            var pointerData = new PointerEventData(GamiumEventSystem.Behaviour.instance.Current())
            {
                position = screenPos
            };
            if (GetUGUIRect(go, out Rect uirect))
            {
                if (uirect.size.x == 0 || uirect.size.y == 0)
                {
                    return new ErrorResultT
                    {
                        Code = ErrorCode.ObjectSizeIsZero,
                        Reason =
                            $"GameObject({param.ObjectId}) ugui rect size is zero x:{uirect.size.x} y:{uirect.size.y}"
                    };
                }
            }

            if (param.CheckRaycast)
            {
                return IsGraphicRaycastable(param, go, pointerData);
            }

            return ErrorResultExtensions.None;
        }

        private static ErrorResultT IsInteractableGO(QueryObjectInteractableParamT param, GameObject go,
            Vector3 screenPos)
        {
            var cam = GamiumCamera.Get();
            if (go.GetRendererRect(out Rect rendererRect))
            {
                if (rendererRect.size.x == 0 || rendererRect.size.y == 0)
                {
                    return new ErrorResultT
                    {
                        Code = ErrorCode.ObjectSizeIsZero,
                        Reason =
                            $"GameObject({param.ObjectId}) rendererRect size is zero x:{rendererRect.size.x} y:{rendererRect.size.y}"
                    };
                }
            }

            var ray3dSucceed = RaycastUtil.RaycastPhysics3D(screenPos, out RaycastHit hit3d);
            if (ray3dSucceed)
            {
                if (go.IncludesOther(hit3d.transform.gameObject))
                {
                    return ErrorResultExtensions.None;
                }
            }

            var ray2dSucced = RaycastUtil.RaycastPhysics2D(screenPos, out RaycastHit2D hit2d);
            if (ray2dSucced)
            {
                if (go.IncludesOther(hit2d.transform.gameObject))
                {
                    return ErrorResultExtensions.None;
                }
            }

            if (!ray3dSucceed && !ray2dSucced)
            {
                return new ErrorResultT
                {
                    Code = ErrorCode.ObjectNothingRaycasted,
                    Reason = $"GameObject({param.ObjectId}) isn't interactable. because nothing raycasted"
                };
            }

            var ray3dGoPath = ray3dSucceed ? new HierarchyPath(hit3d.transform.gameObject).ToString() : "null";
            var ray2dGoPath = ray2dSucced ? new HierarchyPath(hit2d.transform.gameObject).ToString() : "null";

            return new ErrorResultT
            {
                Code = ErrorCode.ObjectRaycastedIsAnother,
                Reason =
                    $"GameObject({param.ObjectId}) isn't interactable. " +
                    $"because another gameobject3d(path:{ray3dGoPath}), gameobject2d(path:{ray2dGoPath}) raycasted"
            };
        }


        private static bool GetUGUIRect(GameObject go, out Rect rect)
        {
            var rectTransform = go.GetComponent<RectTransform>();
            if (null == rectTransform)
            {
                rect = Rect.zero;
                return false;
            }

            // http://answers.unity.com/answers/1628573/view.html
            Bounds bounds = GetRectTransformBounds(rectTransform);
            rect = new Rect(bounds.min, bounds.size);

            // Gizmos.color = Color.red;
            // Gizmos.DrawWireCube(bounds.center, bounds.size);
            // Gizmos.DrawGUITexture(rect, DebugUtil.Tex);
            return true;
        }

        private static ErrorResultT IsGraphicRaycastable(QueryObjectInteractableParamT param, GameObject go,
            PointerEventData pointerData)
        {
            var raycast = RaycastUtil.RaycastEventSystem(pointerData);
            if (null == raycast.gameObject)
            {
                return new ErrorResultT
                {
                    Code = ErrorCode.ObjectNothingRaycasted,
                    Reason = $"GameObject({param.ObjectId}) isn't interactable. because nothing raycasted"
                };
            }

            if (!go.IncludesOther(raycast.gameObject))
            {
                return new ErrorResultT
                {
                    Code = ErrorCode.ObjectRaycastedIsAnother,
                    Reason =
                        $"GameObject({param.ObjectId}) isn't interactable. because another gameobject(path:{new HierarchyPath(raycast.gameObject)}) raycasted"
                };
            }

            return ErrorResultExtensions.None;
        }


        private static Bounds GetRectTransformBounds(RectTransform transform)
        {
            transform.GetWorldCorners(WorldCorners);
            Bounds bounds = new Bounds(WorldCorners[0], Vector3.zero);
            for (int i = 1; i < 4; ++i)
            {
                bounds.Encapsulate(WorldCorners[i]);
            }

            return bounds;
        }
    }
}
