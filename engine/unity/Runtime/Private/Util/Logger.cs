using UnityEngine;

namespace Gamium.Private.Util
{
    internal class Logger
    {
        internal static bool isVerbose = true;
        internal static string latestThrottleMessage = string.Empty;
        internal static float latestThrottleTime = 0;

        internal static void Verbose(string str)
        {
            if (isVerbose) UnityEngine.Debug.Log(Prefixed(str));
        }

        internal static void Warn(string str)
        {
            UnityEngine.Debug.LogWarning(Prefixed(str));
        }

        internal static void WarnThrottle(string str, float delta)
        {
            var mesage = Prefixed(str);
            if (latestThrottleMessage == str && Time.realtimeSinceStartup - latestThrottleTime < delta)
            {
                return;
            }

            UnityEngine.Debug.LogWarning(mesage);
            latestThrottleMessage = str;
            latestThrottleTime = Time.realtimeSinceStartup;
        }


        internal static void Error(string str)
        {
            UnityEngine.Debug.LogError(Prefixed(str));
        }

        internal static void Assert(bool cond, string str)
        {
            UnityEngine.Debug.Assert(cond, Prefixed(str));
        }

        private static string Prefixed(string str)
        {
            return $"[Gamium] {str}";
        }
    }
}
