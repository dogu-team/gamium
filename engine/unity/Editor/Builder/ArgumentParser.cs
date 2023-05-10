using System.Collections.Generic;

namespace Gamium.Editor
{
    internal class ArgumentParser
    {
        private Dictionary<string, string> argDict = new Dictionary<string, string>();

        public void Parse(string[] args)
        {
            for (int i = 0; i < args.Length - 1; i++)
            {
                var cur = args[i];
                var next = args[i + 1];
                if (cur.StartsWith("-"))
                {
                    argDict.Add(cur.Remove(0, 1), next);
                }
            }
        }

        public string GetValue(string key)
        {
            if (argDict.ContainsKey(key))
            {
                return argDict[key];
            }

            return string.Empty;
        }
    }
}
