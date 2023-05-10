using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Gamium.Extensions;
using Gamium.Private;
using Gamium.Private.Debug;
using Gamium.Private.Object;
using Gamium.Private.Util;
using Gamium.Protocol.Packets;
using Gamium.Protocol.Types;
using Private.Profile;
using UnityEngine;
using GamiumVector3 = Gamium.Protocol.Types.Vector3;
using Logger = Gamium.Private.Util.Logger;

namespace Gamium
{
    internal static class InternalCommandHandler
    {
        internal static void Setup()
        {
            PacketTypes.hello.SetInternalHandler(HandleHello);
            PacketTypes.queryScreen.SetInternalHandler(HandleQueryScreen);
            PacketTypes.findObjects.SetInternalHandler(HandleFindObjects);
            PacketTypes.queryObjectInteractable.SetInternalHandler(HandleQueryObjectInteractable);
            PacketTypes.actions.SetInternalHandler(HandleActions);
            PacketTypes.executeRpc.SetInternalHandler(HandleExecuteRpc);
            PacketTypes.inspectObjectOnScreen.SetInternalHandler(InspectorCommandHandler.HandleInspectObjectOnScreen);
            PacketTypes.inspectObjectWithId.SetInternalHandler(InspectorCommandHandler.HandleInspectObjectWithId);
            PacketTypes.dumpObjectsHierarchy.SetInternalHandler(InspectorCommandHandler.HandleDumpObjectHierarchy);
            PacketTypes.changeConfiguration.SetInternalHandler(HandleChangeConfiguration);
            PacketTypes.queryProfile.SetInternalHandler(HandleQueryProfile);

            Logger.Verbose($"InternalCommandHandler Setup complete");
        }

        private static Task<PacketResult<HelloResultT>> HandleHello(HelloParamT param)
        {
            var envs = new List<EnvT>();
            try
            {
                foreach (var key in Server.instance._envs.Keys)
                {
                    envs.Add(new EnvT
                    {
                        Key = key,
                        Value = Server.instance._envs[key]
                    });
                }
            }
            catch (Exception e)
            {
                Logger.Error($"{e}");
            }

            var framesFromStart = Time.frameCount - Server.instance._startFrame;
            var secondsFromStart = Time.realtimeSinceStartup - Server.instance._startTime;
            return Task.FromResult(new PacketResult<HelloResultT>(new HelloResultT
            {
                AppName = Application.productName,
                AppVersion = Application.version,
                GamiumVersion = Server.instance.GetVersion(),
                FramesFromStart = (ulong)framesFromStart,
                SecondsFromStart = secondsFromStart,
                ClientSequence = (uint)Server.instance._clientSequence,
                Envs = envs
            }));
        }

        private static Task<PacketResult<QueryScreenResultT>> HandleQueryScreen(QueryScreenParamT param)
        {
            return Task.FromResult(new PacketResult<QueryScreenResultT>(new QueryScreenResultT
            {
                Width = Screen.width,
                Height = Screen.height
            }));
        }


        private static Task<PacketResult<FindObjectsResultT>> HandleFindObjects(FindObjectsParamT req)
        {
            var err = GamiumObjectCollector.Finds(req.Locator, out var gamiumObjects);
            if (!err.IsSuccess())
            {
                return Task.FromResult(new PacketResult<FindObjectsResultT>(err));
            }

            if (0 == gamiumObjects.Length)
            {
                return Task.FromResult(new PacketResult<FindObjectsResultT>(ErrorCode.ObjectNotFound,
                    $"FindObjects failed. By:{req.Locator.By}, Str:{req.Locator.Str} Not found"));
            }

            List<ObjectInfoT> infos = new List<ObjectInfoT>();
            for (int i = 0; i < gamiumObjects.Length; i++)
            {
                err = gamiumObjects[i].ToObjectInfo(out var info);
                if (!err.IsSuccess())
                {
                    return Task.FromResult(new PacketResult<FindObjectsResultT>(err));
                }

                infos.Add(info);
            }

            return Task.FromResult(new PacketResult<FindObjectsResultT>(new FindObjectsResultT
            {
                Infos = infos,
            }));
        }

        private static async Task<PacketResult<ActionsResultT>> HandleActions(ActionsParamT req)
        {
            ActionsResultT ret = new ActionsResultT();
            ret.Results = new List<ActionResultT>();

            InputModule.PrepareInput(out var context);
            using var _ = new Defer(() => { InputModule.CleanupInput(context); });

            for (var i = 0; i < req.Actions.Count; i++)
            {
                var action = req.Actions[i];
                if (!ActionsTypes.mappings.ContainsKey(action.Type))
                {
                    return new PacketResult<ActionsResultT>(ErrorCode.InternalError,
                        $"Actions failed. ${action.Type} not handleable");
                }

                var mapping = ActionsTypes.mappings[action.Type];
                var actionResult = await mapping.HandleInternal(action);
                if (null == actionResult.Error)
                {
                    actionResult.Error = ErrorResultExtensions.None;
                }

                if (!actionResult.Error.IsSuccess())
                {
                    return new PacketResult<ActionsResultT>(actionResult.Error.Code,
                        $"Actions failed. index:${i}, type:${action.Type}, error:${actionResult.Error.Reason}");
                }

                ret.Results.Add(actionResult);
            }

            return new PacketResult<ActionsResultT>(ret);
        }


        private static async Task<PacketResult<QueryObjectInteractableResultT>> HandleQueryObjectInteractable(
            QueryObjectInteractableParamT req)
        {
            var err = GamiumObjectCollector.FindWithObjectId(req.ObjectId, out var go);
            if (!err.IsSuccess())
            {
                return (new PacketResult<QueryObjectInteractableResultT>(err));
            }

            var errorResult = await go.IsInteractable(req);
            if (errorResult.IsSuccess())
            {
                return (new PacketResult<QueryObjectInteractableResultT>(
                    new QueryObjectInteractableResultT()
                    {
                        IsInteractable = true
                    }));
            }

            return (new PacketResult<QueryObjectInteractableResultT>(errorResult));
        }

        private static Task<PacketResult<ExecuteRpcResultT>> HandleExecuteRpc(
            ExecuteRpcParamT req)
        {
            var ret = Executer.Do(req);
            if (null != ret.error && ret.error.Code != ErrorCode.None)
            {
                return Task.FromResult(new PacketResult<ExecuteRpcResultT>(ret.error.Code, ret.error.Reason));
            }

            return Task.FromResult(new PacketResult<ExecuteRpcResultT>(
                new ExecuteRpcResultT()
                {
                    Document = ret.document
                }));
        }

        private static Task<PacketResult<ChangeConfigurationResultT>> HandleChangeConfiguration(
            ChangeConfigurationParamT req)
        {
            if (null != req.Config.ShowDebugUi)
            {
                Visual.shouldShow = req.Config.ShowDebugUi.Value;
            }

            if (null != req.Config.InspectIgnoreBigObject)
            {
                GamiumObjectPicker.ignoreBigObject = req.Config.InspectIgnoreBigObject.Value;
            }

            return Task.FromResult(new PacketResult<ChangeConfigurationResultT>(
                new ChangeConfigurationResultT()
                {
                }));
        }

        private static Task<PacketResult<QueryProfileResultT>> HandleQueryProfile(QueryProfileParamT req)
        {
            return Task.FromResult(new PacketResult<QueryProfileResultT>(
                new QueryProfileResultT()
                {
                    Fps = Profiler.profiler.Fps
                }
            ));
        }
    }
}
