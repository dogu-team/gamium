using System;
using System.Collections.Generic;
using System.Linq;
using Gamium.Private.Debug;
using Gamium.Private.Object;
using Gamium.Private.Util;
using UnityEngine;
using UnityEngine.EventSystems;
#if ENABLE_INPUT_SYSTEM
using UnityEngine.InputSystem;
#endif

using UnityEngine.UIElements;

namespace Gamium.Private
{
    internal static class Inspector
    {
        internal static Vector3 mousePosition = Vector3.zero;


        internal static void Update()
        {
#if UNITY_EDITOR && USE_GAMIUM_SELF_INSPECTOR
            if (!Application.isFocused)
            {
                return;
            }
            
            var curMousePosition = GetMousePosition();
            if (mousePosition == curMousePosition)
            {
                return;
            }
            
            mousePosition = curMousePosition;
            var go = GamiumObjectPicker.RayGamiumObject(mousePosition, out var _);
            if (go == null)
            {
                return;
            }
            
            var err = go.ToObjectInfo(out var info);
            if (!err.IsSuccess())
            {
                return;
            }
            
            Util.Logger.Verbose($"inspector go: {info.Id}");
            Visual.ShowInspectTarget(info.ScreenPosition.ToUnity(), info.ScreenRectSize.ToUnity(), 0.5f);
#endif //UNITY_EDITOR && USE_GAMIUM_SELF_INSPECTOR
        }

        static Vector3 GetMousePosition()
        {
            Vector3 mousePosition = Vector3.zero;
#if ENABLE_INPUT_SYSTEM
            if (Mouse.current != null)
            {
                mousePosition = Mouse.current.position.ReadValue();
            }
#else
            mousePosition = Input.mousePosition;
#endif
            return mousePosition;
        }
    }
}
