using System.Collections;
using Gamium.Private;
using Gamium.Protocol;
using Gamium.Protocol.Packets;
using Gamium.Protocol.Types;
using NUnit.Framework;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.TestTools;

namespace Gamium
{
    [TestFixture]
    public class ObjectsTest
    {
        private SocketClient _client;
        private Server _server;

        [SetUp]
        public void Setup()
        {
            var server = GameObject.Find("GamiumEngine");
            if (null != server)
            {
                var serverComp = server.GetComponent<ServerComponent.Behaviour>();
                _server = serverComp._server;
            }
            else
            {
                var serverBuilder = new ServerBuilder()
                    .SetConfig(new ServerConfig
                    {
                        port = 50061,
                        isVerbose = true
                    });
                _server = serverBuilder._server;
                serverBuilder.Run();
            }

            _client = new SocketClient("127.0.0.1", 50061);
            _client.Connect();
        }

        [UnityTest]
        public IEnumerator FindAnyObject()
        {
            var newGo = new GameObject("Hello");
            var resTask = _client.SendRequest(_server, ParamUnion.FromPackets_FindObjectsParam(new FindObjectsParamT
            {
                Locator = new ObjectLocatorT
                {
                    By = ObjectLocatorBy.Path,
                    Str = "Hello"
                }
            }));
            WaitUntil waitUntil = new WaitUntil(() => resTask.IsCompleted);
            yield return waitUntil;
            var resT = resTask.Result;
            Assert.AreEqual(resT.Error.Code, ErrorCode.None, $"Error: {resT.Error.Reason}");
            var findObjectsRes = resT.Result.AsPackets_FindObjectsResult();
            Assert.NotZero(findObjectsRes.Infos.Count,
                $"Expected to find at least one object, but found {findObjectsRes.Infos.Count}");

            yield return null;
        }
    }
}
