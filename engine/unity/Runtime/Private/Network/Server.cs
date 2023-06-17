using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Threading.Tasks;
using Gamium.Private.Debug;
using Gamium.Protocol;
using Gamium.Protocol.Types;
using Google.FlatBuffers;
using Private.Profile;
using UnityEngine;
using Logger = Gamium.Private.Util.Logger;

namespace Gamium.Private
{
    internal enum ServerState
    {
        Stop,
        Starting,
        Running,
    }
    internal class Server
    {
        public Server()
        {
            try
            {
                var envs = Environment.GetEnvironmentVariables();
                foreach (var key in envs.Keys)
                {
                    _envs.Add(key.ToString(), envs[key].ToString());
                }
            }
            catch (Exception e)
            {
                Logger.Warn($"Environments query failed: {e}");
            }

            Logger.Verbose($"Environments : {string.Join(", ", _envs.Select(pair => $" {pair.Key}={pair.Value}"))}");
            
            _stateHandlers[0] = new InternalEventHandler();
        }

        public void SetStateHandler(IEventHandler eventHandler)
        {
            _stateHandlers[1] = eventHandler;
        }

        public void SetConfig(ServerConfig config)
        {
            _config = config;
            AfterSetConfig();
        }

        public async Task<int> Start()
        {
            Logger.Verbose($"GamiumEngine start try {_config.port}");
            _state = ServerState.Starting;

            _selector = new Selector(_config.port);
            _selector._onAccept = (sockInfo) => OnAccept(sockInfo);
            _selector._onClose = (sockInfo) => OnClose(sockInfo);

            _startFrame = Time.frameCount;
            _startTime = Time.realtimeSinceStartup;
            _clientSequence = 0;


            if (null == instance) instance = this;

            _selector._onRecv = (sock, bytes, len) =>
            {
                HandleOnRecv(sock, bytes, len).ContinueWith(task =>
                {
                    if (task.IsFaulted || task.IsCanceled || null != task.Exception)
                    {
                        Logger.Error(
                            $"GamiumEngine HandleOnRecv failed. fault:{task.IsFaulted}, cancel:{task.IsCanceled}, exception:{task.Exception}");
                    }
                });
            };

            int initRet = await _selector.Start();
            if (0 != initRet)
            {
                return initRet;
            }

            _state = ServerState.Running;
            Logger.Verbose($"GamiumEngine on {_config.port}, version: {GetVersion()}");

            return 0;
        }

        public void Stop()
        {
            Logger.Verbose($"GamiumEngine stop {_config.port}");
            _state = ServerState.Stop;
            _selector.Stop();
        }

        public int Update()
        {
            if (_state != ServerState.Running)
            {
                return 0;
            }
            Profiler.profiler.Update();
            Input.storage.Update();
            foreach (var stateHandler in _stateHandlers)
            {
                stateHandler?.Update();
            }

            Inspector.Update();

            int ret = _selector.Update();
            if (0 != ret) return ret;
            return 0;
        }

        public string GetVersion()
        {
            return "2.0.2";
        }

        public string GetLastErrorMessage()
        {
            return GetErrorMessage();
        }

        private void OnAccept(ClientSession clientSession)
        {
            Logger.Verbose($"GamiumEngine.OnAccept");
            _clientSequence += 1;
            _eventContext.lastConnectedAddr = clientSession._remoteAddr;
            _eventContext.lastConnectedPort = clientSession._remotePort;

            foreach (var stateHandler in _stateHandlers)
            {
                stateHandler?.OnAccept(_eventContext);
            }
        }

        private void OnClose(ClientSession clientSession)
        {
            Logger.Verbose($"GamiumEngine.OnClose");
            _eventContext.lastClosedAddr = clientSession._remoteAddr;
            _eventContext.lastClosedPort = clientSession._remotePort;

            foreach (var stateHandler in _stateHandlers)
            {
                stateHandler?.OnClose(_eventContext);
            }
        }


        private string GetErrorMessage()
        {
            return "";
        }

        private static async Task HandleOnRecv(Socket sock, byte[] buffer, int bufferLen)
        {
            if (0 == bufferLen)
            {
                return;
            }

            await instance.handleCommand(sock, buffer);
        }


        private async Task handleCommand(Socket sock, byte[] packetbuffer)
        {
            var reqT = RequestT.DeserializeFromBinary(packetbuffer);
            if (!PacketTypes.mappings.ContainsKey(reqT.Param.Type))
            {
                Logger.Error($"GamiumEngine.handleCommand ${reqT.Param.Type} not handleable");
                return;
            }


            Logger.Verbose($"GamiumEngine.handleCommand Seq:{reqT.Seq}, Type:{reqT.Param.Type} start >> ");

            var mapping = PacketTypes.mappings[reqT.Param.Type];
            var responseT = new ResponseT
            {
                Seq = reqT.Seq,
            };

            try
            {
                var packetResult = await mapping.HandleInternal(reqT);
                responseT.Error = null != packetResult.error
                    ? packetResult.error
                    : new ErrorResultT { Code = ErrorCode.None, Reason = "" };
                responseT.Result = packetResult.value;
            }
            catch (Exception e)
            {
                responseT.Error = new ErrorResultT { Code = ErrorCode.InternalError, Reason = $"Exception: {e}" };
                responseT.Result = new ResultUnion
                {
                    Type = (Result)reqT.Param.Type
                };
            }

            var fbb = new FlatBufferBuilder(0x10000);
            Response.FinishSizePrefixedResponseBuffer(fbb, Response.Pack(fbb, responseT));
            var buffer = fbb.DataBuffer.ToSizedArray();
            _selector.Send(sock, buffer, buffer.Length);

            Logger.Verbose($"GamiumEngine.handleCommand Seq:{reqT.Seq}, Type:{reqT.Param.Type} end << ");
        }

        private void AfterSetConfig()
        {
            if (null != _config.inputMappings)
            {
                Input.storage = new GamiumOldInputStorage(_config.inputMappings);
            }
            
            if (_envs.ContainsKey("GAMIUM_SERVER_PORT"))
            {
                if (int.TryParse(_envs["GAMIUM_SERVER_PORT"], out var port))
                {
                    _config.port = port;
                }
            }

            Visual.shouldShow = _config.showVisualDebug;
        }

        static internal Server instance;
        internal long _startFrame { get; private set; }
        internal float _startTime { get; private set; }
        internal ulong _clientSequence { get; private set; }
        internal Dictionary<string, string> _envs = new Dictionary<string, string>();
        internal ServerState _state { get; private set; }

        Selector _selector;

        // Config
        internal ServerConfig _config = new ServerConfig();

        IEventHandler[] _stateHandlers = new IEventHandler[] { null, null };

        // EventContext
        EventContext _eventContext = new EventContext();
    }
}
