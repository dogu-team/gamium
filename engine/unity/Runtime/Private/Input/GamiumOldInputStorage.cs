using System;
using System.Collections.Generic;
using System.Linq;
using Gamium.Private.Util;
using UnityEngine;
using Logger = Gamium.Private.Util.Logger;

namespace Gamium.Private
{
    internal class GamiumOldInputStorage
    {
        internal class KeyState
        {
            public float value = 0;
            public int downFrame = 0;
            public int upFrame = 0;
        }

        private struct MousePositionState
        {
            public float frame;
            public UnityEngine.Vector2 pos;
        }

        internal GamiumOldInputStorage(InputMapping[] inputMappings)
        {
            _inputMappings = inputMappings;

            var values = Enum.GetValues(typeof(KeyCode)).Cast<KeyCode>();
            values.ToList().ForEach(x =>
            {
                if (!_keyStates.ContainsKey(x)) _keyStates.Add(x, new KeyState());
            });

            _inputMappings.ToList().ForEach(x => _axisStates.Add(x.alias, new KeyState()));
            var defaultAxes = new[]
            {
                "Horizontal", "Vertical", "Fire1", "Fire2", "Fire3", "Jump", "Mouse X", "Mouse Y", "Mouse ScrollWheel",
                "Submit", "Cancel"
            };
            defaultAxes.ToList().ForEach(x =>
            {
                if (_axisStates.ContainsKey(x))
                {
                    return;
                }

                _axisStates.Add(x, new KeyState());
            });
        }


        internal InputMapping GetInputMaping(string aliasName)
        {
            var matchedPositiveAxis = _inputMappings.ToList().Where(x => x.alias == aliasName);
            if (0 < matchedPositiveAxis.ToList().Count()) return matchedPositiveAxis.ToList()[0];
            return null;
        }

        internal KeyState GetAxis(string axisName)
        {
            if (false == _axisStates.ContainsKey(axisName))
            {
                return new KeyState();
            }

            return _axisStates[axisName];
        }

        internal KeyState GetKeyFloat(string name)
        {
            KeyCode keyCode;
            if (Enum.TryParse(name, true, out keyCode))
            {
                return GetKeyFloat(keyCode);
            }

            Logger.Error($"Gamium.Input UnSupported KeyCode {name}");
            return new KeyState();
        }

        internal KeyState GetKeyFloat(KeyCode keyCode)
        {
            if (false == _keyStates.ContainsKey(keyCode)) return new KeyState();
            return _keyStates[keyCode];
        }


        internal void OnPressDownKey(string code, int delayFrame = 1)
        {
            KeyCode keyCode;
            if (Enum.TryParse(code, true, out keyCode))
            {
                // Util.Logger.Verbose($"Gamium.InputHandler PressDown KeyCode {code}")
                TaskManager.Behaviour.RunNextFrame(
                    () => SetKeyState(keyCode,
                        new KeyState() { value = 1, downFrame = Time.frameCount + 1, upFrame = 0 }), delayFrame);
            }
            else
            {
                Logger.Error($"Gamium.InputHandler UnSupported KeyCode {code}");
            }
        }

        internal void OnPressUpKey(string code)
        {
            KeyCode keyCode;
            if (Enum.TryParse(code, true, out keyCode))
            {
                // Util.Logger.Verbose($"Gamium.InputHandler PressUpKey KeyCode {code}");
                TaskManager.Behaviour.RunNextFrame(() =>
                {
                    var keyState = GetKeyFloat(keyCode);
                    SetKeyState(keyCode,
                        new KeyState() { value = 0, downFrame = keyState.downFrame, upFrame = Time.frameCount + 1 });
                });
            }
            else
            {
                Logger.Error($"Gamium.InputHandler UnSupported KeyCode {code}");
            }
        }

        internal void ClearAllKeyStates()
        {
            foreach (var pair in _keyStates.ToList())
            {
                _keyStates[pair.Key] = new KeyState();
            }
        }

        internal void Update()
        {
            UpdateMouseAxis();
        }

        private void UpdateMouseAxis()
        {
            if (null != mousePosition && Time.frameCount - _mousePositionPrev.frame < 2)
            {
                var mousePositionDelta = mousePosition.Value - _mousePositionPrev.pos;
                _axisStates["Mouse X"].value = mousePositionDelta.x;
                _axisStates["Mouse Y"].value = mousePositionDelta.y;
            }
            else
            {
                _axisStates["Mouse X"].value = 0;
                _axisStates["Mouse Y"].value = 0;
            }

            if (null != mousePosition)
            {
                _mousePositionPrev.frame = Time.frameCount;
                _mousePositionPrev.pos = mousePosition.Value;
            }
        }


        private void SetKeyState(KeyCode code, KeyState newKeyState)
        {
            _keyStates[code] = newKeyState;
            UpdateAxis(code, newKeyState);
        }

        private void UpdateAxis(KeyCode code, KeyState newKeyState)
        {
            var matchedPositiveAxis = _inputMappings.ToList().Where(x => x.positiveCodes.Contains(code));
            matchedPositiveAxis.ToList().ForEach(x =>
            {
                _axisStates[x.alias].value = newKeyState.value;
                _axisStates[x.alias].downFrame = newKeyState.downFrame;
                _axisStates[x.alias].upFrame = newKeyState.upFrame;
            });

            var matchedNegativeAxis = _inputMappings.ToList().Where(x => x.negativeCodes.Contains(code));
            matchedNegativeAxis.ToList().ForEach(x =>
            {
                _axisStates[x.alias].value = -1.0f * newKeyState.value;
                _axisStates[x.alias].downFrame = newKeyState.downFrame;
                _axisStates[x.alias].upFrame = newKeyState.upFrame;
            });
        }


        internal Dictionary<KeyCode, KeyState> _keyStates = new Dictionary<KeyCode, KeyState>();
        internal Dictionary<string, KeyState> _axisStates = new Dictionary<string, KeyState>();
        private InputMapping[] _inputMappings;

        internal Vector2? mousePosition
        {
            get => _mousePosition;
            set => _mousePosition = value;
        }

        private Vector2? _mousePosition = null;
        private MousePositionState _mousePositionPrev;
        internal Vector2 mouseScrollDelta = Vector2.zero;
    }
}
