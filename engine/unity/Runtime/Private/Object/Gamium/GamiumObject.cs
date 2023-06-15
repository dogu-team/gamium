using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
using Gamium.Protocol.Packets;
using Gamium.Protocol.Types;
using UnityEngine;
using Vector2 = UnityEngine.Vector2;
using Vector3 = UnityEngine.Vector3;

namespace Gamium.Private.Object
{
    internal enum GamiumObjectType
    {
        GameObject,
        VisualElement
    }

    internal abstract class GamiumObject
    {
        internal abstract GamiumObjectType GetGamiumObjectType();

        internal abstract string GetName();
        internal abstract string GetPath();
        internal abstract GamiumObject[] GetChildren();

        internal abstract ErrorResultT ToObjectInfo(out ObjectInfoT objectInfo);
        protected abstract GamiumObject Empty();
        protected abstract ObjectType GetObjectType();
        protected abstract ErrorResultT GetScreenPositionAndRectSize(out Vector3 pos, out Vector2 rectSize);
        protected abstract string GetText();
        internal abstract ErrorResultT SetText(string text);

        // https://w3c.github.io/webdriver/#interactability
        internal abstract Task<ErrorResultT> IsInteractable(QueryObjectInteractableParamT param);

        internal ObjectHierarchyNodeT ToHierarchyNode()
        {
            return new ObjectHierarchyNodeT
            {
                Name = GetName(),
                Path = GetPath(),
                Children = GetChildren().Select(c => c.ToHierarchyNode()).ToList(),
            };
        }

        protected abstract void SetXmlAttributes(XmlElement thisElement, int index);

        internal XmlElement ToXmlElement(XmlDocument document, int index)
        {
            var element = document.CreateElement(GetGamiumObjectType().ToString());
            
            SetXmlAttributes(element, index);
            GetChildren()
                .Select((child, childIndex) => child.ToXmlElement(document, childIndex + 1))
                .ToList()
                .ForEach((childElement) => 
                {
                    element.AppendChild(childElement);
                });

            return element;
        }
    }
}
