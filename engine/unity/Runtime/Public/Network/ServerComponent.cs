using System.Threading.Tasks;
using Gamium.Private;
using UnityEngine;
using Logger = Gamium.Private.Util.Logger;

namespace Gamium
{
    public class ServerComponent
    {
        public class Behaviour : MonoBehaviour
        {
            private float logTime = 0;

            internal async Task Run(Server server)
            {
                DontDestroyOnLoad(gameObject);
                GameObjectInstance = gameObject;
                Logger.isVerbose = server._config.isVerbose;


                _server = server;
            }

            private void RunServer()
            {
                if (null == _server)
                {
                    Logger.Warn("GamiumEngine RunServer Failed: Server is null");
                    return;
                }
                
                if (_server._state == ServerState.Starting)
                {
                    Logger.Warn("GamiumEngine RunServer Failed: Server is already starting");
                    return;
                }

                if (_server._state == ServerState.Running)
                {
                    return;
                }

                _server.Start().ContinueWith((task) =>
                    {
                        if (task.IsFaulted || task.IsCanceled || null != task.Exception || 0 != task.Result)
                        {
                            Logger.Error(
                                $"GamiumEngine Start Failed: {task.Result} {_server.GetLastErrorMessage()}");
                        }
                    }
                );
            }

            private void StopServer()
            {
                if (null == _server)
                {
                    Logger.Warn("GamiumEngine StopServer Failed: Server is null");
                    return;
                }

                if (_server._state == ServerState.Stop)
                {
                    return;
                }
                _server.Stop();
            }

            internal void Update()
            {
                if (null == _server) return;
                if (_server._state != ServerState.Running)
                {
                    RunServer();
                }

                logTime += Time.deltaTime;

                int updateRet = _server.Update();
                if (0 != updateRet)
                {
                    Logger.Error(
                        $"GamiumEngine Update Failed: {updateRet} {_server.GetLastErrorMessage()}");
                }

                if (10.0f <= logTime)
                {
                    Logger.Verbose($"GamiumEngine Update {_server._state}");
                    logTime = 0;
                }
            }

            private void OnApplicationPause(bool pause)
            {
                Logger.Verbose($"GamiumEngine OnApplicationPause server: {null != _server}, pause:{pause}");
                if (null == _server) return;

                if (false == pause)
                {
                    RunServer();
                }
                else
                {
                    StopServer();
                }
            }


            private void OnApplicationQuit()
            {
                Logger.Verbose($"GamiumEngine OnApplicationQuit server: {null != _server}");

                if (null == _server) return;
                StopServer();
            }

            internal Server _server;
            internal static GameObject GameObjectInstance;
        }
    }
}