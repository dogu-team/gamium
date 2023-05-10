using System.Reflection;
using System.Threading.Tasks;
using Gamium.Extensions;
using Gamium.Private.Debug;
using Gamium.Private.Util;
using Gamium.Protocol.Packets.Actions;
using Gamium.Protocol.Types;
using UnityEngine;
using UnityEngine.EventSystems;
using Logger = Gamium.Private.Util.Logger;

namespace Gamium.Private
{
    internal class OldInputProcessor : InputProcessorBase
    {
        static private FieldInfo FieldInputOverride;
        static private FieldInfo FieldFocus;
        static private MethodInfo MethodProcess;
        static private BaseInput _inputOverride => InputOverride.Behaviour.instance;
        static private BaseInputModule _inputModule;

        internal struct Context
        {
            internal object inputOverride;
            internal object focus;
        }


        internal override void Setup()
        {
            var moduleType = typeof(BaseInputModule);
            var eventSystemType = typeof(EventSystem);

            FieldInputOverride =
                moduleType.GetField("m_InputOverride", BindingFlags.NonPublic | BindingFlags.Instance);
            FieldFocus =
                eventSystemType.GetField("m_HasFocus", BindingFlags.NonPublic | BindingFlags.Instance);

            Logger.Verbose($"InputModule Setup complete");
        }

        internal override void PrepareInput(out object contextObj)
        {
            _inputModule = GamiumEventSystem.Behaviour.instance.CurrentInputModule() as BaseInputModule;
            var context = new Context();
            OverrideInput(_inputModule, out context.inputOverride, out context.focus);
            contextObj = context;
        }

        internal override void CleanupInput(object contextObj)
        {
            var context = (Context)contextObj;
            RollbackOverrideInput(_inputModule, context.inputOverride, context.focus);
        }


        internal override async Task<ErrorResultT> ProcessInput(InputMouseParamT input)
        {
            var pos = input.Position.ToUnity();
            if (!IsAvailable())
            {
                return (new ErrorResultT
                    { Code = ErrorCode.InputNotAvailable, Reason = "Find input methods failed." });
            }

            if (_inputModule == null)
            {
                return (new ErrorResultT
                    { Code = ErrorCode.InputNotAvailable, Reason = "Current unity inputmodule is null" });
            }

            Input.storage.mousePosition = pos;
            Visual.ShowText(pos, 1.2f, input.Press.ToString(), Color.green);

            switch (input.Press)
            {
                case InputMousePressType.DOWN:
                {
                    Input.storage.OnPressDownKey(KeyCode.Mouse0.ToString(), 0);

                    break;
                }
                case InputMousePressType.UP:
                {
                    Input.storage.OnPressUpKey(KeyCode.Mouse0.ToString());

                    break;
                }
                case InputMousePressType.MOVE:
                {
                    // position already applied
                    break;
                }
                case InputMousePressType.SCROLL:
                {
                    Input.storage.mouseScrollDelta = input.Delta.ToUnity();
                    break;
                }
            }

            await Task.Yield();
            _inputModule.Process();
            await Task.Yield();

            Input.storage.Update();

            return (ErrorResultExtensions.None);
        }

        internal override ErrorResultT OnPressDownKey(string code, int delayFrame = 1)
        {
            Input.storage.OnPressDownKey(code, delayFrame);
            return ErrorResultExtensions.None;
        }

        internal override ErrorResultT OnPressUpKey(string code)
        {
            Input.storage.OnPressUpKey(code);
            return ErrorResultExtensions.None;
        }

        private static bool IsAvailable()
        {
            return null != FieldInputOverride &&
                   null != FieldFocus;
        }


        private static void OverrideInput(BaseInputModule inputModule, out object befInputOverride,
            out object befFocus)
        {
            befInputOverride = FieldInputOverride.GetValue(inputModule);
            befFocus = FieldFocus.GetValue(GamiumEventSystem.Behaviour.instance.Current());
            FieldInputOverride.SetValue(inputModule, _inputOverride);
            FieldFocus.SetValue(GamiumEventSystem.Behaviour.instance.Current(), true);
        }

        private static void RollbackOverrideInput(BaseInputModule inputModule, object befInputOverride,
            object befFocus)
        {
            FieldInputOverride.SetValue(inputModule, befInputOverride);
            FieldFocus.SetValue(GamiumEventSystem.Behaviour.instance.Current(), befFocus);
            Input.storage.mousePosition = null;
        }
    }
}
