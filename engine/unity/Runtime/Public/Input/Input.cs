using System.Collections.Generic;
using System.Reflection;
using Gamium.Private;
using UnityEngine;
using UnityEngine.Scripting;

namespace Gamium
{
    [Preserve]
    public class Input
    {
        [Preserve]
        public static int touchCount => UnityEngine.Input.touchCount;

        [Preserve]
        public static float GetAxis(string axisName)
        {
            var val = UnityEngine.Input.GetAxis(axisName);
            if (0 != val) return val;
            return storage.GetAxis(axisName).value;
        }

        [Preserve]
        public static float GetAxisRaw(string axisName)
        {
            var val = UnityEngine.Input.GetAxisRaw(axisName);
            if (0 != val) return val;
            return storage.GetAxis(axisName).value;
        }

        [Preserve]
        public static bool GetButton(string buttonName)
        {
            var val = UnityEngine.Input.GetButton(buttonName);
            if (val) return val;
            return 1 == storage.GetAxis(buttonName).value;
        }

        [Preserve]
        public static bool GetButtonDown(string buttonName)
        {
            var val = UnityEngine.Input.GetButtonDown(buttonName);
            if (val) return val;
            var state = storage.GetAxis(buttonName);
            return 1 == state.value && Time.frameCount == state.downFrame;
        }

        [Preserve]
        public static bool GetButtonUp(string buttonName)
        {
            var val = UnityEngine.Input.GetButtonUp(buttonName);
            if (val) return val;
            var state = storage.GetAxis(buttonName);
            return 0 == state.value && Time.frameCount == state.upFrame;
        }

        [Preserve]
        public static bool GetMouseButton(int button)
        {
            var val = UnityEngine.Input.GetMouseButton(button);
            if (val) return val;
            string buttonName = "Mouse" + button;
            return 1 == storage.GetKeyFloat(buttonName).value;
        }

        [Preserve]
        public static bool GetMouseButtonDown(int button)
        {
            var val = UnityEngine.Input.GetMouseButtonDown(button);
            if (val) return val;
            string buttonName = "Mouse" + button;
            var state = storage.GetKeyFloat(buttonName);
            return 1 == state.value && Time.frameCount == state.downFrame;
        }

        [Preserve]
        public static bool GetMouseButtonUp(int button)
        {
            var val = UnityEngine.Input.GetMouseButtonUp(button);
            if (val) return val;
            string buttonName = "Mouse" + button;
            var state = storage.GetKeyFloat(buttonName);
            return 0 == state.value && Time.frameCount == state.upFrame;
        }

        [Preserve]
        public static Touch GetTouch(int index)
        {
            return UnityEngine.Input.GetTouch(index);
        }

        // public static AccelerationEvent GetAccelerationEvent(int index){ return new AccelerationEvent();}
        [Preserve]
        public static bool GetKey(KeyCode key)
        {
            if (UnityEngine.Input.GetKey(key)) return UnityEngine.Input.GetKey(key);
            return GetKeyDown(key);
        }

        [Preserve]
        public static bool GetKey(string name)
        {
            if (UnityEngine.Input.GetKey(name)) return UnityEngine.Input.GetKey(name);
            return GetKeyDown(name);
        }

        [Preserve]
        public static bool GetKeyDown(KeyCode key)
        {
            if (UnityEngine.Input.GetKeyDown(key)) return UnityEngine.Input.GetKeyDown(key);
            var state = storage.GetKeyFloat(key);
            return 1 == state.value && Time.frameCount == state.downFrame;
        }

        [Preserve]
        public static bool GetKeyDown(string name)
        {
            if (UnityEngine.Input.GetKeyDown(name)) return UnityEngine.Input.GetKeyDown(name);
            var state = storage.GetKeyFloat(name);
            return 1 == state.value && Time.frameCount == state.downFrame;
        }

        [Preserve]
        public static bool GetKeyUp(KeyCode key)
        {
            if (UnityEngine.Input.GetKeyUp(key)) return UnityEngine.Input.GetKeyUp(key);
            var state = storage.GetKeyFloat(key);
            return 0 == state.value && Time.frameCount == state.upFrame;
        }

        [Preserve]
        public static bool GetKeyUp(string name)
        {
            if (UnityEngine.Input.GetKeyUp(name)) return UnityEngine.Input.GetKeyUp(name);
            var state = storage.GetKeyFloat(name);
            return 0 == state.value && Time.frameCount == state.upFrame;
        }

        [Preserve]
        public static Vector3 mousePosition
        {
            get
            {
                if (null != storage.mousePosition)
                {
                    return storage.mousePosition.Value;
                }

                return UnityEngine.Input.mousePosition;
            }
        }

        [Preserve]
        public static Vector2 mouseScrollDelta
        {
            get
            {
                if (Vector2.zero != storage.mouseScrollDelta)
                {
                    return storage.mouseScrollDelta;
                }

                return UnityEngine.Input.mouseScrollDelta;
            }
        }

        [Preserve]
        internal static GamiumOldInputStorage storage = new GamiumOldInputStorage(new InputMapping[]
            {
                new InputMapping()
                {
                    alias = "Horizontal", positiveCodes = new HashSet<KeyCode>() { KeyCode.D },
                    negativeCodes = new HashSet<KeyCode>() { KeyCode.A }
                },
                new InputMapping()
                {
                    alias = "Vertical", positiveCodes = new HashSet<KeyCode>() { KeyCode.W },
                    negativeCodes = new HashSet<KeyCode>() { KeyCode.S }
                },
                new InputMapping() { alias = "Jump", positiveCodes = new HashSet<KeyCode>() { KeyCode.Space } },
                new InputMapping()
                    { alias = "Fire1", positiveCodes = new HashSet<KeyCode>() { KeyCode.LeftControl } },
                new InputMapping() { alias = "Fire2", positiveCodes = new HashSet<KeyCode>() { KeyCode.LeftAlt } }
            });

        #region UnSupported

        public static void ResetInputAxes() => UnityEngine.Input.ResetInputAxes();

        public static bool IsJoystickPreconfigured(string joystickName)
        {
#if UNITY_STANDALONE_LINUX || UNITY_EDITOR_LINUX
            return UnityEngine.Input.IsJoystickPreconfigured(joystickName);
#endif
            return false;
        }

        public static string[] GetJoystickNames() => UnityEngine.Input.GetJoystickNames();

        public static AccelerationEvent GetAccelerationEvent(int index) =>
            UnityEngine.Input.GetAccelerationEvent(index);

        public static bool simulateMouseWithTouches => UnityEngine.Input.simulateMouseWithTouches;
        public static bool anyKey => UnityEngine.Input.anyKey;
        public static bool anyKeyDown => UnityEngine.Input.anyKeyDown;
        public static string inputString => UnityEngine.Input.inputString;
        public static IMECompositionMode imeCompositionMode => UnityEngine.Input.imeCompositionMode;
        public static string compositionString => UnityEngine.Input.compositionString;
        public static bool imeIsSelected => UnityEngine.Input.imeIsSelected;
        public static Vector2 compositionCursorPos => UnityEngine.Input.compositionCursorPos;
        public static bool mousePresent => UnityEngine.Input.mousePresent;
        public static bool touchPressureSupported => UnityEngine.Input.touchPressureSupported;
        public static bool stylusTouchSupported => UnityEngine.Input.stylusTouchSupported;
        public static bool touchSupported => UnityEngine.Input.touchSupported;
        public static bool multiTouchEnabled => UnityEngine.Input.multiTouchEnabled;
        public static DeviceOrientation deviceOrientation => UnityEngine.Input.deviceOrientation;
        public static Vector3 acceleration => UnityEngine.Input.acceleration;
        public static bool compensateSensors => UnityEngine.Input.compensateSensors;
        public static int accelerationEventCount => UnityEngine.Input.accelerationEventCount;
        public static bool backButtonLeavesApp => UnityEngine.Input.backButtonLeavesApp;

        public static object location
        {
            get
            {
                // direct access to UnityEngine.Input.location makes require ios has Locations Usage Description
                var unityInputType = typeof(UnityEngine.Input);
                var prop = unityInputType.GetProperty("location", BindingFlags.Static | BindingFlags.Public);
                return prop.GetValue(null);
            }
        }

        public static Compass compass => UnityEngine.Input.compass;
        public static Gyroscope gyro => UnityEngine.Input.gyro;
        public static Touch[] touches => UnityEngine.Input.touches;
        public static AccelerationEvent[] accelerationEvents => UnityEngine.Input.accelerationEvents;

        #endregion
    }
}
