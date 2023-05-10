using Gamium.Editor;
using NUnit.Framework;

namespace Gamium
{
    public class BuildTest
    {
        [Test]
        public void BuildAndroid()
        {
            var argParser = new ArgumentParser();
            argParser.Parse(new string[]
            {
                "-buildTarget",
                "android",
                "-outputName",
                "testBuild.apk"
            });

            Builder.PerformBuild(argParser);
        }

        [Test]
        public void BuildWindows()
        {
            var argParser = new ArgumentParser();
            argParser.Parse(new string[]
            {
                "-buildTarget",
                "standalonewindows64",
                "-outputName",
                "testBuild.exe"
            });

            Builder.PerformBuild(argParser);
        }

        [Test]
        public void BuildMacOS()
        {
            var argParser = new ArgumentParser();
            argParser.Parse(new string[]
            {
                "-buildTarget",
                "standaloneosx",
                "-outputName",
                "testBuild"
            });

            Builder.PerformBuild(argParser);
        }
    }
}
