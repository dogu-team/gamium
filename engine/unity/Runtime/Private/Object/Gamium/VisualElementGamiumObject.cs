using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Gamium.Extensions;
using Gamium.Private.Debug;
using Gamium.Private.Util;
using Gamium.Protocol.Packets;
using Gamium.Protocol.Types;
using UnityEngine;
using UnityEngine.UIElements;
using Vector2 = UnityEngine.Vector2;
using Vector3 = UnityEngine.Vector3;
using Vector4 = UnityEngine.Vector4;

namespace Gamium.Private.Object
{
    internal class VisualElementGamiumObject : GamiumObject
    {
        internal static VisualElementGamiumObject empty = new VisualElementGamiumObject();
        internal VisualElement root;
        internal VisualElement value;

        VisualElementGamiumObject()
        {
            value = null;
        }

        internal VisualElementGamiumObject(VisualElement visualElement, VisualElement rootElement)
        {
            value = visualElement;
            root = rootElement;
        }

        protected override GamiumObject Empty()
        {
            return empty;
        }

        internal override GamiumObjectType GetGamiumObjectType()
        {
            return GamiumObjectType.VisualElement;
        }

        internal override string GetName()
        {
            return value.name;
        }

        internal override string GetPath()
        {
            return new HierarchyPath(root, value).ToString();
        }

        internal override GamiumObject[] GetChildren()
        {
            return value.hierarchy.Children().Select(c => new VisualElementGamiumObject(c, root))
                .ToArray();
        }

        internal override ErrorResultT ToObjectInfo(out ObjectInfoT objectInfo)
        {
            objectInfo = ObjectInfoConstants.Empty;

            var err = GetScreenPositionAndRectSize(out var screenPos, out var screenRectSize);
            if (!err.IsSuccess())
            {
                return err;
            }


            objectInfo = new ObjectInfoT
            {
                Path = GetPath(),
                Name = value.name,
                Type = GetObjectType(),
                Tag = new List<string> { },
                IsActive = value.visible,
                ScreenPosition = screenPos.ToGamium(),
                ScreenRectSize = screenRectSize.ToGamium(),
                Position = value.transform.position.ToGamium(),
                Rotation = value.transform.rotation.ToGamium(),
                Text = GetText(),
            };
            return ErrorResultExtensions.None;
        }

        protected override ObjectType GetObjectType()
        {
            return ObjectType.UI;
        }

        protected override ErrorResultT GetScreenPositionAndRectSize(out Vector3 pos, out Vector2 bounds)
        {
            var panelToScreenRatio = value.panel.PanelToScreenRatio(out var panelSize);

            // var panelSize = new Vector2(Screen.width, Screen.height);
            // var widthRatio = 1;
            // var heightRatio = 1;
            var yCenter = panelSize.y - value.worldBound.center.y;

            pos = new Vector3(value.worldBound.center.x * panelToScreenRatio.x,
                yCenter * panelToScreenRatio.y, 0);
            bounds = new Vector2(value.worldBound.size.x * panelToScreenRatio.x,
                value.worldBound.size.y * panelToScreenRatio.y);
            Visual.ShowText(pos, 1.5f, "?");

            return ErrorResultExtensions.None;
        }

        protected override string GetText()
        {
            var textElem = value as TextElement;
            if (null != textElem)
            {
                return textElem.text;
            }

            var textField = value as TextField;
            if (null != textField)
            {
                return textField.text;
            }

            if (null != value.hierarchy.parent)
            {
                textField = value.hierarchy.parent as TextField;
                if (null != textField)
                {
                    return textField.text;
                }
            }

            return string.Empty;
        }

        internal override ErrorResultT SetText(string text)
        {
            var textElem = value as TextElement;
            if (null != textElem)
            {
                textElem.text = text;
                return ErrorResultExtensions.None;
            }

            var textField = value as TextField;
            if (null != textField)
            {
                textField.value = text;
                return ErrorResultExtensions.None;
            }

            if (null != value.hierarchy.parent)
            {
                textField = value.hierarchy.parent as TextField;
                if (null != textField)
                {
                    textField.value = text;
                    return ErrorResultExtensions.None;
                }
            }

            return new ErrorResultT
            {
                Code = ErrorCode.ObjectComponentNotFound,
                Reason = $"VisualElement(Path:{new HierarchyPath(root, value)} text component not found"
            };
        }

        internal override async Task<ErrorResultT> IsInteractable(QueryObjectInteractableParamT param)
        {
            if (!value.visible)
            {
                return (new ErrorResultT
                {
                    Code = ErrorCode.ObjectIsNotActive, Reason = $"VisualElement({param.ObjectId}) not active"
                });
            }

            var err = GetScreenPositionAndRectSize(out var screenPos, out var bounds);
            if (!err.IsSuccess())
            {
                return (err);
            }

            if (param.CheckMoving)
            {
                var befScreenPos = screenPos;
                await Task.Delay(100);
                err = GetScreenPositionAndRectSize(out screenPos, out bounds);
                if (!err.IsSuccess())
                {
                    return err;
                }

                if (befScreenPos != screenPos)
                {
                    return new ErrorResultT
                    {
                        Code = ErrorCode.ObjectIsMoving, Reason = $"VisualElement({param.ObjectId}) is moving"
                    };
                }
            }

            if (param.CheckRaycast)
            {
                var picked = value.panel.Pick(value.worldBound.center);
                if (!value.IncludesOther(picked))
                {
                    return new ErrorResultT
                    {
                        Code = ErrorCode.ObjectRaycastedIsAnother,
                        Reason =
                            $"VisualElement({param.ObjectId}) isn't interactable. because another VisualElement({picked})) is picked"
                    };
                }
            }

            return (ErrorResultExtensions.None);
        }
    }
}
