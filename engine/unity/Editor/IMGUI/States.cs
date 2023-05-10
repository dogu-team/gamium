using System.Collections.Generic;

namespace Gamium.Editor.IMGUI
{
    internal static class States
    {
        internal static Dictionary<string, object> dict;

        static States()
        {
            dict = new Dictionary<string, object>();
        }

        internal static void Set<T>(string key, T value)
        {
            if (dict.ContainsKey(key))
            {
                dict[key] = value;
            }
            else
            {
                dict.Add(key, value);
            }
        }

        internal static T Get<T>(string key, T defaultValue)
        {
            if (dict.ContainsKey(key))
            {
                return (T)dict[key];
            }
            else
            {
                return defaultValue;
            }
        }
    }
}
