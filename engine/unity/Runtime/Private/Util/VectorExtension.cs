using Gamium.Protocol.Types;

namespace Gamium.Private.Util
{
    internal static class UnityVector2Extension
    {
        internal static Vector2T ToGamium(this UnityEngine.Vector2 v)
        {
            return new Vector2T
            {
                X = v.x,
                Y = v.y,
            };
        }
    }

    internal static class GamiumVector2TExtension
    {
        internal static UnityEngine.Vector2 ToUnity(this Vector2T v)
        {
            return new UnityEngine.Vector2
            {
                x = v.X,
                y = v.Y,
            };
        }
    }


    internal static class UnityVector3Extension
    {
        internal static Vector3T ToGamium(this UnityEngine.Vector3 v)
        {
            return new Vector3T
            {
                X = v.x,
                Y = v.y,
                Z = v.z
            };
        }

        internal static UnityEngine.Vector3 XZPlane(this UnityEngine.Vector3 v)
        {
            return new UnityEngine.Vector3(v.x, 0, v.z);
        }
    }

    internal static class GamiumVector3TExtension
    {
        internal static UnityEngine.Vector3 ToUnity(this Vector3T v)
        {
            return new UnityEngine.Vector3
            {
                x = v.X,
                y = v.Y,
                z = v.Z
            };
        }
    }


    internal static class UnityVector4Extension
    {
        internal static Vector4T ToGamium(this UnityEngine.Vector4 v)
        {
            return new Vector4T
            {
                X = v.x,
                Y = v.y,
                Z = v.z,
                W = v.w
            };
        }
    }

    internal static class UnityQuaternionExtension
    {
        internal static Vector4T ToGamium(this UnityEngine.Quaternion v)
        {
            return new Vector4T
            {
                X = v.x,
                Y = v.y,
                Z = v.z,
                W = v.w
            };
        }
    }


    internal static class GamiumVector4TExtension
    {
        internal static UnityEngine.Vector4 ToUnity(this Vector4T v)
        {
            return new UnityEngine.Vector4
            {
                x = v.X,
                y = v.Y,
                z = v.Z,
                w = v.W
            };
        }
    }
}
