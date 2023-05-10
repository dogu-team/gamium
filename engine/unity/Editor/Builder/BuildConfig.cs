using System;
using System.Collections.Generic;
using System.Linq;
using UnityEditor;
using UnityEngine;

namespace Gamium.Editor
{
    internal class BuildOption
    {
        public ScriptingImplementation scriptingImplementation;
        public int targetArch = 1;
        public bool isMTRendering;
        public bool isAutomaticGraphics;
        public GraphicsJobMode graphicsJobMode;
        public ShadowQuality shadowQuality;
    }

    internal class BuildConfig
    {
        private static Dictionary<BuildTarget, BuildOption> buildOptions = new Dictionary<BuildTarget, BuildOption>()
        {
            {
                BuildTarget.Android, new BuildOption()
                {
                    scriptingImplementation = ScriptingImplementation.IL2CPP,
                    isMTRendering = true,
                    isAutomaticGraphics = true,
                    graphicsJobMode = GraphicsJobMode.Native,
                    shadowQuality = ShadowQuality.HardOnly,
                }
            },
            {
                BuildTarget.iOS, new BuildOption()
                {
                    scriptingImplementation = ScriptingImplementation.IL2CPP,
                    isMTRendering = true,
                    isAutomaticGraphics = true,
                    graphicsJobMode = GraphicsJobMode.Native,
                    shadowQuality = ShadowQuality.HardOnly,
                }
            },
            {
                BuildTarget.StandaloneWindows, new BuildOption()
                {
                    scriptingImplementation = ScriptingImplementation.IL2CPP,
                    isMTRendering = true,
                    isAutomaticGraphics = true,
                    graphicsJobMode = GraphicsJobMode.Native,
                    shadowQuality = ShadowQuality.All,
                }
            },
            {
                BuildTarget.StandaloneWindows64, new BuildOption()
                {
                    scriptingImplementation = ScriptingImplementation.IL2CPP,
                    isMTRendering = true,
                    isAutomaticGraphics = true,
                    graphicsJobMode = GraphicsJobMode.Native,
                    shadowQuality = ShadowQuality.All,
                }
            },
            {
                BuildTarget.StandaloneOSX, new BuildOption()
                {
                    scriptingImplementation = ScriptingImplementation.IL2CPP,
                    isMTRendering = true,
                    isAutomaticGraphics = true,
                    graphicsJobMode = GraphicsJobMode.Native,
                    shadowQuality = ShadowQuality.All,
                }
            }
        };

        public static BuildPlayerOptions ToOption(ArgumentParser arguments)
        {
            var buildTarget = arguments.GetValue("buildTarget").ToLower();
            var outputRelativePath = arguments.GetValue("outputRelativePath").ToLower();

            var ret = new BuildPlayerOptions();
            ret.scenes = EditorBuildSettings.scenes
                .Where(scene => scene.enabled)
                .Select(scene => scene.path)
                .ToArray();

            ConvertPlatformToBuildTarget(buildTarget, ref ret);
            

            var buildOption = buildOptions[ret.target];
            PlayerSettings.defaultInterfaceOrientation = UIOrientation.LandscapeLeft;
            PlayerSettings.fullScreenMode = FullScreenMode.Windowed;
            PlayerSettings.defaultScreenWidth = 960;
            PlayerSettings.defaultScreenHeight = 540;
            PlayerSettings.SetArchitecture(ret.targetGroup, buildOption.targetArch);
            PlayerSettings.SetScriptingBackend(ret.targetGroup, buildOption.scriptingImplementation);
            if (false == Application.isBatchMode)
                PlayerSettings.SetScriptingBackend(ret.targetGroup, ScriptingImplementation.Mono2x);
            PlayerSettings.MTRendering = buildOption.isMTRendering;
            PlayerSettings.SetMobileMTRendering(ret.targetGroup, buildOption.isMTRendering);
            PlayerSettings.graphicsJobMode = buildOption.graphicsJobMode;
            PlayerSettings.SetUseDefaultGraphicsAPIs(ret.target, buildOption.isAutomaticGraphics);
            PlayerSettings.runInBackground = true;
            QualitySettings.shadows = buildOption.shadowQuality;
            QualitySettings.vSyncCount = 0;
            Application.targetFrameRate = 60;
            AddDefineSymbol(ret.targetGroup, "USE_GAMIUM");

            ret.scenes.ToList().ForEach(x => Debug.Log($"Gamium.Editor.BuildConfig Scene : {x}"));

            ret.locationPathName = $"{Constant.ProjectRootPath}/{outputRelativePath}";

            return ret;
        }

        private static void ConvertPlatformToBuildTarget(string buildTarget, ref BuildPlayerOptions ret)
        {
            BuildTarget target;
            if (false == Enum.TryParse(buildTarget, true, out target))
            {
                Debug.LogError($"Invalid BuildTarget {buildTarget}");
                return;
            }

            //https://forum.unity.com/threads/buildtargetgroup-buildtarget-the-difference-between-the-two.473364/
            ret.target = target;
            ret.targetGroup = ConvertBuildTarget(ret.target);
        }

        static BuildTargetGroup ConvertBuildTarget(BuildTarget buildTarget)
        {
            switch (buildTarget)
            {
                case BuildTarget.iOS:
                    return BuildTargetGroup.iOS;
                case BuildTarget.StandaloneOSX:
                case BuildTarget.StandaloneWindows:
                case BuildTarget.StandaloneWindows64:
                case BuildTarget.StandaloneLinux64:
                    return BuildTargetGroup.Standalone;
                case BuildTarget.Android:
                    return BuildTargetGroup.Android;
                case BuildTarget.WebGL:
                    return BuildTargetGroup.WebGL;
                case BuildTarget.WSAPlayer:
                    return BuildTargetGroup.WSA;
                case BuildTarget.PS4:
                    return BuildTargetGroup.PS4;
                case BuildTarget.PS5:
                    return BuildTargetGroup.PS5;
                case BuildTarget.XboxOne:
                    return BuildTargetGroup.XboxOne;
                case BuildTarget.tvOS:
                    return BuildTargetGroup.tvOS;
                case BuildTarget.Switch:
                    return BuildTargetGroup.Switch;
                case BuildTarget.NoTarget:
                default:
                    return BuildTargetGroup.Standalone;
            }
        }

        private static void AddDefineSymbol(BuildTargetGroup buildTargetGroup, string symbol)
        {
            string definesString = PlayerSettings.GetScriptingDefineSymbolsForGroup(buildTargetGroup);
            List<string> allDefines = definesString.Split(';').ToList();
            if (!allDefines.Contains(symbol))
            {
                allDefines.Add(symbol);
            }

            PlayerSettings.SetScriptingDefineSymbolsForGroup(
                EditorUserBuildSettings.selectedBuildTargetGroup,
                string.Join(";", allDefines.ToArray()));
        }
    }
}
