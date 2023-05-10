using System.Threading.Tasks;
using Gamium.Extensions;
using Gamium.Private;
using Gamium.Private.Actions;
using Gamium.Private.Object;
using Gamium.Private.Util;
using Gamium.Protocol.Packets;
using Gamium.Protocol.Packets.Actions;
using Gamium.Protocol.Types;
using UnityEditor;
using UnityEngine;
using Logger = Gamium.Private.Util.Logger;

namespace Gamium
{
    internal static class ActionsHandler
    {
        internal static void Setup()
        {
            ActionsTypes.sleep.SetInternalHandler(HandleSleep);
            ActionsTypes.inputKey.SetInternalHandler(HandleInputKey);
            ActionsTypes.inputMouse.SetInternalHandler(HandleInputMouse);
            ActionsTypes.inputSetText.SetInternalHandler(HandleInputSetText);
            ActionsTypes.movePlayer.SetInternalHandler(MovePlayerHandler.Handle);
            ActionsTypes.appQuit.SetInternalHandler(HandleAppQuit);

            Logger.Verbose($"ActionsHandler Setup complete");
        }


        private static async Task<ActionResultT> HandleSleep(SleepParamT param)
        {
            await Task.Delay((int)param.Ms);
            return new ActionResultT { Error = ErrorResultExtensions.None };
        }

        private static Task<ActionResultT> HandleInputKey(InputKeyParamT param)
        {
            switch (param.Press)
            {
                case InputKeyPressType.UP:
                {
                    param.Codes.ForEach(code => InputModule.OnPressUpKey(code));
                    break;
                }
                case InputKeyPressType.DOWN:
                {
                    param.Codes.ForEach(code => InputModule.OnPressDownKey(code));
                    break;
                }
            }

            return Task.FromResult(new ActionResultT { Error = ErrorResultExtensions.None });
        }


        private static async Task<ActionResultT> HandleInputMouse(InputMouseParamT param)
        {
            var err = await InputModule.ProcessInput(param);
            if (!err.IsSuccess())
            {
                return (new ActionResultT { Error = err });
            }


            return (new ActionResultT { Error = ErrorResultExtensions.None });
        }

        private static async Task<ActionResultT> HandleInputSetText(InputSetTextParamT param)
        {
            var err = GamiumObjectCollector.FindWithObjectId(param.ObjectId, out var go);
            if (!err.IsSuccess())
            {
                return (new ActionResultT { Error = err });
            }

            err = go.SetText(param.Text);
            if (!err.IsSuccess())
            {
                return (new ActionResultT { Error = err });
            }

            await Task.Yield();

            return (new ActionResultT { Error = ErrorResultExtensions.None });
        }

        private static Task<ActionResultT> HandleAppQuit(AppQuitParamT param)
        {
            TaskManager.Behaviour.RunNextTime(
                () =>
                {
                    if (Application.isEditor)
                    {
#if  UNITY_EDITOR
                        EditorApplication.isPlaying = false;
#endif
                    }
                    else
                    {
                        Application.Quit(param.ExitCode);
                    }
                }, param.DelayMs * 0.001f);
            return Task.FromResult(new ActionResultT { Error = ErrorResultExtensions.None });
        }
    }
}
