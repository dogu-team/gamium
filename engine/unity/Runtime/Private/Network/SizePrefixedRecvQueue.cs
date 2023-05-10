using System;
using System.Net.Sockets;
using Gamium.Private.Util;

namespace Gamium.Private
{
    internal class SizePrefixedRecvQueue
    {
        private const int GROW_SIZE = 65536;
        private byte[] _buffer = new byte[GROW_SIZE];

        private int _length = 0;
        private int _capacity = GROW_SIZE;

        public SocketError Read(Socket socket)
        {
            SocketError error = SocketError.Success;
            if (_capacity == _length)
            {
                var newBuffer = new byte[_capacity + GROW_SIZE];
                Array.Copy(_buffer, newBuffer, _length);
                _buffer = newBuffer;
                _capacity += GROW_SIZE;
            }

            var n = socket.Receive(_buffer, _length, _capacity - _length, SocketFlags.None, out error);
            if (error != SocketError.Success)
            {
                Logger.Error($"Gamium Socket read error: {error}");
                return error;
            }

            _length += n;
            return error;
        }

        public bool Has()
        {
            var size = GetSizePrefix();
            return _length >= (size + 4);
        }

        public byte[] Pop()
        {
            if (!Has())
            {
                Logger.Error($"Gamium Socket read pop error. no packet available");
                return new byte[0];
            }

            var size = GetSizePrefix();
            var result = new byte[size];
            Array.Copy(_buffer, 4, result, 0, size);
            _length -= (size + 4);
            Array.Copy(_buffer, size + 4, _buffer, 0, _length);
            return result;
        }

        private int GetSizePrefix()
        {
            return (int)ReadLittleEndian(0, sizeof(int));
        }

        private ulong ReadLittleEndian(int offset, int count)
        {
            ulong r = 0;
            if (BitConverter.IsLittleEndian)
            {
                for (int i = 0; i < count; i++)
                {
                    r |= (ulong)_buffer[offset + i] << i * 8;
                }
            }
            else
            {
                for (int i = 0; i < count; i++)
                {
                    r |= (ulong)_buffer[offset + count - 1 - i] << i * 8;
                }
            }

            return r;
        }
    }
}
