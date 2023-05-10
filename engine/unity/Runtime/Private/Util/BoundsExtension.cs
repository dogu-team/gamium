using UnityEngine;

namespace Gamium.Private.Util
{
    internal static class BoundsExtension
    {
        private static Vector3[] screenSpaceCorners = new Vector3[8];

        internal static UnityEngine.Vector3[] ToCorners(this Bounds b)
        {
            var points = new UnityEngine.Vector3[8];
            points[0] = b.min;
            points[1] = b.max;
            points[2] = new UnityEngine.Vector3(points[0].x, points[0].y, points[1].z);
            points[3] = new UnityEngine.Vector3(points[0].x, points[1].y, points[0].z);
            points[4] = new UnityEngine.Vector3(points[1].x, points[0].y, points[0].z);
            points[5] = new UnityEngine.Vector3(points[0].x, points[1].y, points[1].z);
            points[6] = new UnityEngine.Vector3(points[1].x, points[0].y, points[1].z);
            points[7] = new UnityEngine.Vector3(points[1].x, points[1].y, points[0].z);
            return points;
        }


        internal static Rect BoundsInScreen(this Bounds b, Camera theCamera)
        {
            screenSpaceCorners[0] = theCamera.WorldToScreenPoint(new Vector3(b.center.x + b.extents.x,
                b.center.y + b.extents.y, b.center.z + b.extents.z));
            screenSpaceCorners[1] = theCamera.WorldToScreenPoint(new Vector3(b.center.x + b.extents.x,
                b.center.y + b.extents.y, b.center.z - b.extents.z));
            screenSpaceCorners[2] = theCamera.WorldToScreenPoint(new Vector3(b.center.x + b.extents.x,
                b.center.y - b.extents.y, b.center.z + b.extents.z));
            screenSpaceCorners[3] = theCamera.WorldToScreenPoint(new Vector3(b.center.x + b.extents.x,
                b.center.y - b.extents.y, b.center.z - b.extents.z));
            screenSpaceCorners[4] = theCamera.WorldToScreenPoint(new Vector3(b.center.x - b.extents.x,
                b.center.y + b.extents.y, b.center.z + b.extents.z));
            screenSpaceCorners[5] = theCamera.WorldToScreenPoint(new Vector3(b.center.x - b.extents.x,
                b.center.y + b.extents.y, b.center.z - b.extents.z));
            screenSpaceCorners[6] = theCamera.WorldToScreenPoint(new Vector3(b.center.x - b.extents.x,
                b.center.y - b.extents.y, b.center.z + b.extents.z));
            screenSpaceCorners[7] = theCamera.WorldToScreenPoint(new Vector3(b.center.x - b.extents.x,
                b.center.y - b.extents.y, b.center.z - b.extents.z));

            // Now find the min/max X & Y of these screen space corners.
            float min_x = screenSpaceCorners[0].x;
            float min_y = screenSpaceCorners[0].y;
            float max_x = screenSpaceCorners[0].x;
            float max_y = screenSpaceCorners[0].y;

            for (int i = 1; i < 8; i++)
            {
                if (screenSpaceCorners[i].x < min_x)
                {
                    min_x = screenSpaceCorners[i].x;
                }

                if (screenSpaceCorners[i].y < min_y)
                {
                    min_y = screenSpaceCorners[i].y;
                }

                if (screenSpaceCorners[i].x > max_x)
                {
                    max_x = screenSpaceCorners[i].x;
                }

                if (screenSpaceCorners[i].y > max_y)
                {
                    max_y = screenSpaceCorners[i].y;
                }
            }

            return Rect.MinMaxRect(min_x, min_y, max_x, max_y);
        }
    }
}
