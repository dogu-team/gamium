using System.Threading;
using UnityEngine;

namespace Gamium.Private.Util
{
    internal static class GamiumThread
    {
        private static int mainThreadId = 0;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        private static void OnLoad()
        {
            mainThreadId = Thread.CurrentThread.ManagedThreadId;
        }

        internal static int CurrentThreadId()
        {
            return Thread.CurrentThread.ManagedThreadId;
        }

        internal static bool IsMainThread()
        {
            return mainThreadId == CurrentThreadId();
        }
    }
}
