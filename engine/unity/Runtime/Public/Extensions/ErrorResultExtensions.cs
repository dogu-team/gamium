using Gamium.Protocol.Types;

namespace Gamium.Extensions
{
    public static class ErrorResultExtensions
    {
        internal static ErrorResultT None = new ErrorResultT { Code = ErrorCode.None, Reason = "" };

        public static bool IsSuccess(this ErrorResultT err)
        {
            return err.Code == ErrorCode.None;
        }
    }
}
