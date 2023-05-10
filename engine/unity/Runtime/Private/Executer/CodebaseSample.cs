using System.Collections.Generic;
using Gamium.Private.Util;

namespace Gamium.Private
{
    internal static class CodebaseSample
    {
#pragma warning disable CS0414
        private static double field1 = 10.0f;
#pragma warning restore CS0414
        private static double[] field2 = new double[2] { 1.0f, 2.0f };

        private static Dictionary<string, string> field3 = new Dictionary<string, string>
        {
            { "hello", "nice" }
        };

        private static int property1 { get; set; }

        private static int[] property2
        {
            get => new int[] { };
        }

        private static void CallEmptyParam()
        {
            Logger.Verbose($"CodebaseSample.CallEmptyParam");
        }

        public static void CallParam1(double param1)
        {
            Logger.Verbose($"CodebaseSample.CallParam1: {param1}");
        }

        private static void CallParam2(double param1, double param2)
        {
            Logger.Verbose($"CodebaseSample.CallParam2: {param1}, {param2}");
        }

        public static long CallParamReturn(double param1, double param2)
        {
            Logger.Verbose($"CodebaseSample.CallParam2: {param1}, {param2}");
            return 1;
        }

        public static double CallParamReturn2(double param1)
        {
            return param1;
        }

        public static Dictionary<string, object> CallParamReturn3(double param1, double param2)
        {
            Logger.Verbose($"CodebaseSample.CallParam2: {param1}, {param2}");
            return new Dictionary<string, object>
            {
                { "intMin", int.MinValue },
                { "intMax", int.MaxValue },
                { "double1", 0.123456 },
                { "double2", 1.0 },
                { "double3", 1000.0 },
                { "double4", 1234567890.0 },
                { "double5", 1234567890.12345 },
                { "hello", "nice" },
                {
                    "nestedDict", new Dictionary<string, object>
                    {
                        {
                            "hello", "nice2"
                        }
                    }
                },
                {
                    "nestedArray", new string[]
                    {
                        "hello", "nice2"
                    }
                }
            };
            ;
        }
    }
}
