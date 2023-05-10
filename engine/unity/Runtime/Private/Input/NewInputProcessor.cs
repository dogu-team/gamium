#if ENABLE_INPUT_SYSTEM
using System.Threading.Tasks;
using Gamium.Extensions;
using Gamium.Private.Debug;
using Gamium.Private.Util;
using Gamium.Protocol.Packets.Actions;
using Gamium.Protocol.Types;
using UnityEditor;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.InputSystem.Controls;
using UnityEngine.InputSystem.LowLevel;

namespace Gamium.Private
{
    internal class NewInputProcessor : InputProcessorBase
    {
        internal override void Setup()
        {
        }

        internal override void PrepareInput(out object contextObj)
        {
            contextObj = null;
        }

        internal override void CleanupInput(object contextObj)
        {
        }

        internal override async Task<ErrorResultT> ProcessInput(InputMouseParamT input)
        {
            return await ProcessMouseInput(input);
        }


        internal Task<ErrorResultT> ProcessMouseInput(InputMouseParamT input)
        {
            var pos = input.Position.ToUnity();

            Mouse mouse = SafeGetDevice<Mouse>();
            using (DeltaStateEvent.From(mouse, out var eventPtr))
            {
                mouse.position.WriteValueIntoEvent(pos, eventPtr);
                eventPtr.time = InputState.currentTime;
                InputSystem.QueueEvent(eventPtr);
            }

            UpdateInputSystem();

            Visual.ShowText(pos, 1.2f, input.Press.ToString(), Color.green);
            switch (input.Press)
            {
                case InputMousePressType.DOWN:
                {
                    using (DeltaStateEvent.From(mouse, out var eventPtr))
                    {
                        mouse.leftButton.WriteValueIntoEvent(1f, eventPtr);
                        eventPtr.time = InputState.currentTime;
                        InputSystem.QueueEvent(eventPtr);
                    }

                    break;
                }
                case InputMousePressType.UP:
                {
                    using (DeltaStateEvent.From(mouse, out var eventPtr))
                    {
                        mouse.leftButton.WriteValueIntoEvent(0f, eventPtr);
                        eventPtr.time = InputState.currentTime;
                        InputSystem.QueueEvent(eventPtr);
                    }

                    break;
                }
                case InputMousePressType.MOVE:
                {
                    // position already applied
                    break;
                }
                case InputMousePressType.SCROLL:
                {
                    using (DeltaStateEvent.From(mouse, out var eventPtr))
                    {
                        mouse.scroll.WriteValueIntoEvent(input.Delta.ToUnity(), eventPtr);
                        eventPtr.time = InputState.currentTime;
                        InputSystem.QueueEvent(eventPtr);
                    }

                    break;
                }
            }

            UpdateInputSystem();

            return Task.FromResult(ErrorResultExtensions.None);
        }

        internal override ErrorResultT OnPressDownKey(string code, int delayFrame = 1)
        {
            Keyboard keyboard = SafeGetDevice<Keyboard>();
            using (DeltaStateEvent.From(keyboard, out var eventPtr))
            {
                keyboard[code].WriteValueIntoEvent(1f, eventPtr);
                eventPtr.time = InputState.currentTime;
                InputSystem.QueueEvent(eventPtr);
            }

            UpdateInputSystem();

            return ErrorResultExtensions.None;
        }

        internal override ErrorResultT OnPressUpKey(string code)
        {
            Keyboard keyboard = SafeGetDevice<Keyboard>();
            using (DeltaStateEvent.From(keyboard, out var eventPtr))
            {
                keyboard[code].WriteValueIntoEvent(0f, eventPtr);
                eventPtr.time = InputState.currentTime;
                InputSystem.QueueEvent(eventPtr);
            }

            UpdateInputSystem();

            return ErrorResultExtensions.None;
        }

        private static T SafeGetDevice<T>()
            where T : InputDevice
        {
            T device = InputSystem.GetDevice<T>();
            if (null == device)
            {
                return InputSystem.AddDevice<T>();
            }

            return device;
        }

        private static void UpdateInputSystem()
        {
#if UNITY_EDITOR
            EditorApplication.ExecuteMenuItem("Window/General/Game");
#endif
            InputSystem.Update();
        }
    }
}
#endif
