using UnityEngine;

namespace Private.Profile
{
    internal class Profiler
    {
        internal uint Fps { get; private set; }

        internal void Update()
        {
            Fps = (uint)(1f / Time.unscaledDeltaTime);
        }

        internal static Profiler profiler = new Profiler();
    }
}
