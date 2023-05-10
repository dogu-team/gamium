using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Sockets;
using System.Threading.Tasks;
using Gamium.Private.Util;

namespace Gamium.Private
{
    internal class Selector
    {
        public Action<ClientSession> _onAccept;
        public Action<ClientSession> _onClose;
        public Action<Socket, byte[], int> _onRecv;

        private int _port = 12240;
        private Socket _listenSock;
        private Dictionary<Socket, ClientSession> _sessions = new Dictionary<Socket, ClientSession>();


        public Selector(int port)
        {
            _port = port;
        }

        public async Task<int> Start()
        {
            Exception exception = null;
            for (int i = 0; i < 30; i++)
            {
                try
                {
                    var listenSock = new Socket(AddressFamily.InterNetwork,
                        SocketType.Stream, ProtocolType.Tcp);
                    listenSock.SetSocketOption(SocketOptionLevel.Socket, SocketOptionName.ReuseAddress, true);
                    listenSock.SetSocketOption(SocketOptionLevel.Socket, SocketOptionName.DontLinger, true);
                    // listenSock.SetSocketOption(SocketOptionLevel.Socket, SocketOptionName.NoDelay, true); nodelay throw 10013 Access denied error on android,
                    listenSock.SetSocketOption(SocketOptionLevel.Socket, SocketOptionName.KeepAlive, true);

                    IPEndPoint iep = new IPEndPoint(IPAddress.Any, _port);

                    listenSock.Blocking = false;
                    listenSock.Bind(iep);
                    listenSock.Listen(10);
                    _listenSock = listenSock;
                    break;
                }
                catch (Exception e)
                {
                    exception = e;
                    HandleCommonSocketException("Start", null, e);
                    await Task.Delay(3000);
                }
            }

            if (null == exception)
            {
                return 0;
            }

            return HandleCommonSocketException("Start", null, exception);
        }

        public void Stop()
        {
            foreach (var _client in _sessions)
            {
                _client.Key.Close();
            }

            _sessions.Clear();
            if (null != _listenSock)
            {
                _listenSock.Close();
            }
        }


        public int Update()
        {
            if (null == _listenSock)
            {
                return 0;
            }

            try
            {
                List<Socket> signaledSockList = new List<Socket>(_sessions.Keys);
                signaledSockList.Add(_listenSock);

                Socket.Select(signaledSockList, null, null, 10);

                foreach (Socket signaledSock in signaledSockList)
                {
                    if (_listenSock == signaledSock)
                    {
                        Accept(signaledSock);
                    }
                    else
                    {
                        Recv(signaledSock);
                    }
                }
            }
            catch (Exception e)
            {
                return HandleCommonSocketException("Select", null, e);
            }

            return 0;
        }

        private int Accept(Socket sock)
        {
            try
            {
                Socket client1 = _listenSock.Accept();

                client1.Blocking = false;
                IPEndPoint iep = (IPEndPoint)client1.RemoteEndPoint;

                Logger.Verbose($"Client {iep} is connected");
                var sockInfo = new ClientSession(client1);
                _sessions.Add(client1, sockInfo);

                _onAccept(sockInfo);
            }
            catch (Exception e)
            {
                return HandleCommonSocketException("Accept", sock, e);
            }

            return 0;
        }

        private int Close(Socket sock)
        {
            try
            {
                var sockInfo = _sessions[sock];
                var sockInfoCopy = sockInfo.Copy();
                Logger.Verbose($"Client {sockInfo._remoteAddr}:{sockInfo._remotePort} disconnected.");
                sock.Close();

                _sessions.Remove(sock);
                if (_sessions.Count == 0)
                {
                    Logger.Verbose("Last client disconnected, bye");
                }

                _onClose(sockInfoCopy);
            }
            catch (Exception e)
            {
                return HandleCommonSocketException("Close", sock, e);
            }

            return 0;
        }

        private int Recv(Socket sock)
        {
            try
            {
                var session = _sessions[sock];
                var socketError = session._recvQueue.Read(sock);
                if (socketError != SocketError.Success)
                {
                    Close(sock);
                    return 0;
                }

                while (session._recvQueue.Has())
                {
                    var data = session._recvQueue.Pop();
                    _onRecv(sock, data, data.Length);
                }
            }
            catch (Exception e)
            {
                SocketException se = e as SocketException;
                if (null != se)
                {
                    if (
                        SocketError.ConnectionReset == se.SocketErrorCode
                        || SocketError.ConnectionAborted == se.SocketErrorCode
                        || SocketError.Disconnecting == se.SocketErrorCode
                    )
                    {
                        Close(sock);
                        return 0;
                    }
                }

                return HandleCommonSocketException("Recv", sock, e);
            }

            return 0;
        }

        public int Send(Socket sock, byte[] bytes, int len)
        {
            if (!sock.Connected)
            {
                Logger.Warn($"Socket {sock.RemoteEndPoint} is not connected");
                return 0;
            }

            int sent = 0;
            int cnt = 0;
            try
            {
                while (sent < len)
                {
                    sent += sock.Send(bytes, len, SocketFlags.None);
                    ++cnt;
                    if (10000 < cnt)
                    {
                        Logger.Error($"Send Socket {sock} Too Many tries!!!");
                    }
                }
            }
            catch (Exception e)
            {
                return HandleCommonSocketException("Send", sock, e);
            }

            return 0;
        }

        int HandleCommonSocketException(string command, Socket sock, Exception e)
        {
            SocketException se = e as SocketException;
            if (null != se)
            {
                if (SocketError.WouldBlock == se.SocketErrorCode)
                {
                    return 0;
                }

                Logger.Warn($"{command} Socket {sock} Exception {se.ErrorCode}, {se.Message}");

                return se.ErrorCode;
            }

            Logger.Warn($"{command} Socket {sock} Failed {e}");
            return -1;
        }
    }
}
