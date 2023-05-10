using System;
using System.Net.Sockets;
using System.Threading.Tasks;
using Gamium.Private;
using Gamium.Private.Util;
using Gamium.Protocol;
using Google.FlatBuffers;
using UnityEditor.MemoryProfiler;

namespace Gamium
{
    internal class SocketClient
    {
        private string url;
        private int port;
        private Socket sock;
        private SizePrefixedRecvQueue recvQueue = new SizePrefixedRecvQueue();

        internal SocketClient(string url, int port)
        {
            this.url = url;
            this.port = port;
            this.sock = new Socket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
            this.sock.ReceiveTimeout = 1000;
        }

        internal void Connect()
        {
            sock.Connect(this.url, this.port);
        }

        internal async Task<ResponseT> SendRequest(Server server, ParamUnion paramUnion)
        {
            var seq = (uint)UnityEngine.Random.Range(0, 100000);
            var reqT = new RequestT
            {
                Seq = seq,
                Param = paramUnion
            };
            var fbb = new FlatBufferBuilder(0x10000);
            Request.FinishSizePrefixedRequestBuffer(fbb, Request.Pack(fbb, reqT));
            var bytes = fbb.DataBuffer.ToSizedArray();

            var sent = 0;
            while (sent < bytes.Length)
            {
                sent += sock.Send(bytes, sent, bytes.Length - sent, SocketFlags.None);
                await Task.Delay(1);
            }

            while (!recvQueue.Has())
            {
                server.Update();
                var socketError = recvQueue.Read(sock);
                if (socketError != SocketError.Success && socketError != SocketError.WouldBlock)
                {
                    Logger.Error($"Socket Error: {socketError}");
                    throw new Exception($"Socket Error: {socketError}");
                }

                await Task.Delay(1);
            }

            var resT = ResponseT.DeserializeFromBinary(recvQueue.Pop());
            if (resT.Seq != seq)
            {
                throw new Exception("Seq not match");
            }

            return resT;
        }
    }
}
