using System.Net;
using System.Net.Sockets;

namespace Gamium.Private
{
    internal class ClientSession
    {
        private ClientSession()
        {
        }

        internal ClientSession(Socket socket)
        {
            _socket = socket;
            if (socket.LocalEndPoint is IPEndPoint localEndPoint)
            {
                _localAddr = localEndPoint.Address.ToString();
                _localPort = localEndPoint.Port.ToString();
            }

            if (socket.RemoteEndPoint is IPEndPoint remoteEndPoint)
            {
                _remoteAddr = remoteEndPoint.Address.ToString();
                _remotePort = remoteEndPoint.Port.ToString();
            }
        }

        internal ClientSession Copy()
        {
            var ret = new ClientSession();
            ret._socket = _socket;
            ret._localAddr = _localAddr;
            ret._localPort = _localPort;
            ret._remoteAddr = _remoteAddr;
            ret._remotePort = _remotePort;
            return ret;
        }

        internal Socket _socket;
        internal string _localAddr;
        internal string _localPort;
        internal string _remoteAddr;
        internal string _remotePort;
        internal SizePrefixedRecvQueue _recvQueue = new SizePrefixedRecvQueue();
    }
}
