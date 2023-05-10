using System;
using UnityEditor;

namespace Gamium.Editor
{
    public class Builder
    {
        public static Action onBeforeBuildPlayer;

        private static void PerformCommandLineBuild()
        {
            var argParser = new ArgumentParser();
            argParser.Parse(System.Environment.GetCommandLineArgs());

            PerformBuild(argParser);
        }

        internal static void PerformBuild(ArgumentParser argParser)
        {
            onBeforeBuildPlayer?.Invoke();
            BuildPipeline.BuildPlayer(BuildConfig.ToOption(argParser));
        }
    }
}
