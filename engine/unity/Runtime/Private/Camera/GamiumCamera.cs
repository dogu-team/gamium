namespace Gamium.Private
{
    internal static class GamiumCamera
    {
        public static UnityEngine.Camera Get()
        {
            if (UnityEngine.Camera.current != null)
            {
                return UnityEngine.Camera.current;
            }

            var mainCam = UnityEngine.Camera.main;
            if (mainCam != null)
            {
                return mainCam;
            }

            return null;
        }
    }
}
