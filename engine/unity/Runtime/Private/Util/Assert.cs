using System;

namespace Gamium.Private.Util
{
    internal static class Assert
    {
        public static void IsTrue(bool condition, string message = null)
        {
            if (!condition)
            {
                throw new Exception(message);
            }
        }
    }
}
