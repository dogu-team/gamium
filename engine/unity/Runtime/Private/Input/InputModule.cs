using System.Threading.Tasks;
using Gamium.Private.Util;
using Gamium.Protocol.Packets.Actions;
using Gamium.Protocol.Types;

namespace Gamium.Private
{
    internal class InputModule
    {
        static private InputProcessorBase impl;


        public static void Setup()
        {
#if ENABLE_INPUT_SYSTEM
            impl = new NewInputProcessor();
#else
            impl = new OldInputProcessor();
#endif
            impl.Setup();

            Logger.Verbose($"InputModule Setup complete");
        }

        internal static void PrepareInput(out object contextObj)
        {
            impl.PrepareInput(out contextObj);
        }

        internal static void CleanupInput(object contextObj)
        {
            impl.CleanupInput(contextObj);
        }

        internal static async Task<ErrorResultT> ProcessInput(InputMouseParamT input)
        {
            return await impl.ProcessInput(input);
        }

        internal static ErrorResultT OnPressDownKey(string code, int delayFrame = 1)
        {
            return impl.OnPressDownKey(code, delayFrame);
        }

        internal static ErrorResultT OnPressUpKey(string code)
        {
            return impl.OnPressUpKey(code);
        }
    }
}
