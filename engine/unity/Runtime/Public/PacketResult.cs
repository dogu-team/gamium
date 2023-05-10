using Gamium.Protocol.Types;

namespace Gamium
{
    internal class PacketResult<T>
        where T : class
    {
        public PacketResult(T value)
        {
            this.value = value;
        }

        public PacketResult(T value, ErrorResultT error)
        {
            this.value = value;
            this.error = error;
        }


        public PacketResult(ErrorResultT error)
        {
            this.error = error;
        }

        public PacketResult(ErrorCode code, string reason)
        {
            this.error = new ErrorResultT
            {
                Code = code,
                Reason = reason
            };
        }

        public T value = null;
        public ErrorResultT error = null;
    }
}
