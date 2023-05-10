using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.EventSystems;

namespace Gamium.Private.Util
{
    internal static class RaycastUtil
    {
        internal static RaycastResult RaycastEventSystem(PointerEventData pointerData)
        {
            return FindFirstRaycast(RaycastEventSystemAll(pointerData));
        }

        internal static RaycastResult[] RaycastEventSystemAll(PointerEventData pointerData)
        {
            List<RaycastResult> raycastResults = new List<RaycastResult>();
            GamiumEventSystem.Behaviour.instance.Current().RaycastAll(pointerData, raycastResults);
            raycastResults = raycastResults.Where(r =>
            {
                if (null == r.gameObject)
                {
                    return false;
                }

                if (null != r.gameObject.transform.parent)
                {
                    //
                    return r.gameObject.transform.parent.gameObject != GamiumEventSystem.Behaviour.instance.gameObject;
                }

                return r.gameObject != GamiumEventSystem.Behaviour.instance.gameObject;
            }).ToList();
            return raycastResults.ToArray();
        }


        internal static bool RaycastPhysics3D(Vector3 screenPos, out RaycastHit hit3d)
        {
            var cam = GamiumCamera.Get();
            var ray = cam.ScreenPointToRay(screenPos);
            var ray3dResult = Physics.Raycast(ray, out hit3d, Mathf.Infinity, cam.cullingMask & cam.eventMask);
            if (ray3dResult && hit3d.transform)
            {
                return true;
            }

            return false;
        }

        internal static void RaycastPhysics3DAll(Vector3 screenPos, out RaycastHit[] hit3ds)
        {
            var cam = GamiumCamera.Get();
            var ray = cam.ScreenPointToRay(screenPos);
            hit3ds = Physics.RaycastAll(ray, Mathf.Infinity, cam.cullingMask & cam.eventMask);
        }


        internal static bool RaycastPhysics2D(Vector3 screenPos, out RaycastHit2D hit2d)
        {
            var cam = GamiumCamera.Get();
            Vector2 pos = cam.ScreenToWorldPoint(screenPos);
            Ray2D ray2d = new Ray2D(pos, Vector2.zero);
            hit2d = Physics2D.Raycast(ray2d.origin, ray2d.direction, Mathf.Infinity, cam.cullingMask & cam.eventMask);
            if (hit2d.collider)
            {
                return true;
            }

            return false;
        }

        internal static void RaycastPhysics2DAll(Vector3 screenPos, out RaycastHit2D[] hit2ds)
        {
            var cam = GamiumCamera.Get();
            Vector2 pos = cam.ScreenToWorldPoint(screenPos);
            Ray2D ray2d = new Ray2D(pos, Vector2.zero);
            hit2ds = Physics2D.RaycastAll(ray2d.origin, ray2d.direction, Mathf.Infinity,
                cam.cullingMask & cam.eventMask);
        }

        internal static RaycastResult FindFirstRaycast(IList<RaycastResult> candidates)
        {
            var candidatesCount = candidates.Count;
            for (var i = 0; i < candidatesCount; ++i)
            {
                if (candidates[i].gameObject == null)
                    continue;

                return candidates[i];
            }

            return new RaycastResult();
        }
    }
}
