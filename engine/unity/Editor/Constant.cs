using System.IO;

namespace Gamium.Editor
{
    internal class Constant
    {
        internal static string PackagePath =
            Path.GetFullPath("Packages/com.gamium.unity.server.csharp").Replace("\\", "/");

        internal static string ProjectRootPath = Path.GetFullPath(".").Replace("\\", "/");
    }
}
