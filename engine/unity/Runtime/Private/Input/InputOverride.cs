using UnityEngine;
using UnityEngine.EventSystems;

namespace Gamium.Private
{
    internal class InputOverride
    {
        internal class Behaviour : BaseInput
        {
            internal static Behaviour instance;

            protected override void Awake()
            {
                instance = this;
            }

            protected override void OnEnable()
            {
                instance = this;
            }

            protected override void OnDisable()
            {
                instance = null;
            }

            protected override void OnDestroy()
            {
                instance = null;
            }

            // public virtual string compositionString
            // {
            //     get { return Input.compositionString; }
            // }
            //
            // public virtual IMECompositionMode imeCompositionMode
            // {
            //     get { return Input.imeCompositionMode; }
            //     set { Input.imeCompositionMode = value; }
            // }
            //
            // public virtual Vector2 compositionCursorPos
            // {
            //     get { return Input.compositionCursorPos; }
            //     set { Input.compositionCursorPos = value; }
            // }

            public override bool mousePresent
            {
                get { return true; }
            }

            public override bool GetMouseButtonDown(int button)
            {
                return Input.GetMouseButtonDown(button);
            }

            public override bool GetMouseButtonUp(int button)
            {
                return Input.GetMouseButtonUp(button);
            }

            public override bool GetMouseButton(int button)
            {
                return Input.GetMouseButton(button);
            }

            public override Vector2 mousePosition
            {
                get { return Input.mousePosition; }
            }

            public override Vector2 mouseScrollDelta
            {
                get { return Input.mouseScrollDelta; }
            }

            public override bool touchSupported
            {
                get { return true; }
            }

            public override int touchCount
            {
                get { return Input.touchCount; }
            }

            public override Touch GetTouch(int index)
            {
                return Input.GetTouch(index);
            }

            public override float GetAxisRaw(string axisName)
            {
                return Input.GetAxisRaw(axisName);
            }

            public override bool GetButtonDown(string buttonName)
            {
                return Input.GetButtonDown(buttonName);
            }
        }
    }
}
