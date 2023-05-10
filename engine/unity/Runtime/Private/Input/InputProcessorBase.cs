using System.Threading.Tasks;
using Gamium.Protocol.Packets.Actions;
using Gamium.Protocol.Types;

namespace Gamium.Private
{
    internal abstract class InputProcessorBase
    {
        internal abstract void Setup();
        internal abstract void PrepareInput(out object context);
        internal abstract void CleanupInput(object context);
        internal abstract Task<ErrorResultT> ProcessInput(InputMouseParamT input);
        internal abstract ErrorResultT OnPressDownKey(string code, int delayFrame = 1);
        internal abstract ErrorResultT OnPressUpKey(string code);
    }
}
