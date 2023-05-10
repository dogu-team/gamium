using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Gamium.Extensions;
using Gamium.Private.Debug;
using Gamium.Private.Util;
using Gamium.Protocol.Packets;
using Gamium.Protocol.Types;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using Vector2 = UnityEngine.Vector2;
using Vector3 = UnityEngine.Vector3;

namespace Gamium.Private.Object
{
    internal class GameObjectGamiumObject : GamiumObject
    {
        internal static GameObjectGamiumObject empty = new GameObjectGamiumObject();
        internal GameObject value;

        GameObjectGamiumObject()
        {
            value = null;
        }


        internal GameObjectGamiumObject(GameObject gameObject)
        {
            value = gameObject;
        }


        protected override GamiumObject Empty()
        {
            return empty;
        }

        internal override GamiumObjectType GetGamiumObjectType()
        {
            return GamiumObjectType.GameObject;
        }

        internal override string GetName()
        {
            return value.name;
        }

        internal override string GetPath()
        {
            return new HierarchyPath(value).ToString();
        }

        internal override GamiumObject[] GetChildren()
        {
            List<GamiumObject> childs = value.GetChildren()
                .Select(c => new GameObjectGamiumObject(c) as GamiumObject).ToList();
            // var visualElements = GamiumObjectRegistry.GetVisualElementInGameObject(value);
            // foreach (var visualElement in visualElements)
            // {
            //     childs.AddRange(visualElement.GetChildren());
            // }

            return childs.ToArray();
        }

        internal override ErrorResultT ToObjectInfo(out ObjectInfoT objectInfo)
        {
            objectInfo = ObjectInfoConstants.Empty;

            var err = GetScreenPositionAndRectSize(out var screenPos, out var rectSize);
            if (!err.IsSuccess())
            {
                return err;
            }

            objectInfo = new ObjectInfoT
            {
                Path = GetPath(),
                Name = value.name,
                Type = GetObjectType(),
                Tag = new List<string> { value.tag },
                IsActive = value.activeInHierarchy,
                ScreenPosition = screenPos.ToGamium(),
                ScreenRectSize = rectSize.ToGamium(),
                Position = value.transform.position.ToGamium(),
                Rotation = value.transform.rotation.ToGamium(),
                Text = GetText(),
            };
            return ErrorResultExtensions.None;
        }

        protected override ObjectType GetObjectType()
        {
            if (null == value)
            {
                return ObjectType.Unknown;
            }

            if (null != value.GetComponent<Camera>()) return ObjectType.Camera;
            if (null != value.GetComponent<RectTransform>()) return ObjectType.UI;
            if (null != value.GetComponent<ICanvasElement>()) return ObjectType.UI;
            return ObjectType.Unknown;
        }

        protected override ErrorResultT GetScreenPositionAndRectSize(out Vector3 pos, out Vector2 rectSize)
        {
            ErrorResultT err = value.GetScreenPositionAndRectSize(out pos, out rectSize);
            Visual.ShowText(pos, 0.5f, "?");
            Visual.ShowRect(pos, rectSize, 0.5f);
            return err;
        }

        protected override string GetText()
        {
            if (null == value)
            {
                return "";
            }

            if (value.TryGetComponent<InputField>(out var inputField))
            {
                return inputField.text;
            }

            if (value.TryGetComponent<TMP_InputField>(out var tmpInputField))
            {
                return tmpInputField.text;
            }

            if (value.TryGetComponent<Text>(out var uiText))
            {
                inputField = value.GetComponentInParent<InputField>();
                if (null != inputField)
                {
                    return inputField.text;
                }

                return uiText.text;
            }

            if (value.TryGetComponent<TMP_Text>(out var tmpText))
            {
                tmpInputField = value.GetComponentInParent<TMP_InputField>();
                if (null != tmpInputField)
                {
                    return tmpInputField.text;
                }

                return tmpText.text;
            }

            return string.Empty;
        }

        internal override ErrorResultT SetText(string text)
        {
            if (null == value)
            {
                return new ErrorResultT
                {
                    Code = ErrorCode.ObjectNotFound,
                    Reason = $"GameObject(Path:{new HierarchyPath(value)} not found"
                };
            }

            if (value.TryGetComponent<InputField>(out var inputField))
            {
                inputField.text = text;
                return ErrorResultExtensions.None;
            }

            if (value.TryGetComponent<TMP_InputField>(out var tmpInputField))
            {
                tmpInputField.text = text;
                return ErrorResultExtensions.None;
            }


            if (value.TryGetComponent<Text>(out var uiText))
            {
                inputField = value.GetComponentInParent<InputField>();
                if (null != inputField)
                {
                    inputField.text = text;
                    return ErrorResultExtensions.None;
                }

                uiText.text = text;
                return ErrorResultExtensions.None;
            }

            if (value.TryGetComponent<TMP_Text>(out var tmpText))
            {
                tmpInputField = value.GetComponentInParent<TMP_InputField>();
                if (null != tmpInputField)
                {
                    inputField.text = text;
                    return ErrorResultExtensions.None;
                }

                tmpText.SetText(text);
                return ErrorResultExtensions.None;
            }

            return new ErrorResultT
            {
                Code = ErrorCode.ObjectComponentNotFound,
                Reason = $"GameObject(Path:{new HierarchyPath(value)} text component not found"
            };
        }

        internal override Task<ErrorResultT> IsInteractable(QueryObjectInteractableParamT param)
        {
            return GameObjectInteractability.IsInteractable(param, value);
        }
    }
}
