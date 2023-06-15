using System.Collections.Generic;
using System.IO;
using System.Linq;
using UnityEngine;
using System.Xml;
using Gamium.Private;
using Gamium.Private.Object;

namespace Private.Inspector
{
    internal static class PageSourceSerializer
    {
        internal static string Serialize(Server server, GamiumObject[] roots)
        {
            XmlDocument document = new XmlDocument();
            document.AppendChild(document.CreateXmlDeclaration("1.0", "UTF-8", null));
            XmlElement hierarchy = document.CreateElement("hierarchy");
            hierarchy.SetAttribute("gamium-version", server.GetVersion());
            hierarchy.SetAttribute("width", Screen.width.ToString());
            hierarchy.SetAttribute("height", Screen.height.ToString());
            hierarchy.SetAttribute("orientation", Screen.orientation.ToString());
            document.AppendChild(hierarchy);
            
            var scenes = new Dictionary<string, XmlElement>();
            for (int i = 0; i < roots.Length; ++i)
            {
                var root = roots[i];
                var sceneName = "Unknown";
                if (root is GameObjectGamiumObject go)
                {
                    sceneName = go.value.scene.name;
                }
                else if (root is VisualElementGamiumObject vgoo)
                {
                    sceneName = "VisualElement";
                }
                
                if (!scenes.ContainsKey((sceneName)))
                {
                    XmlElement scene = document.CreateElement("scene");
                    scene.SetAttribute("name", sceneName);
                    scene.SetAttribute("index", (hierarchy.ChildNodes.Count + 1).ToString());
                    hierarchy.AppendChild(scene);
                    scenes.Add(sceneName, scene);
                }

                var index = scenes[sceneName].ChildNodes.Count + 1;
                scenes[sceneName].AppendChild(root.ToXmlElement(document, index));
            }

            StringWriter stringWriter = new StringWriter();
            XmlTextWriter xmlTextWriter = new XmlTextWriter(stringWriter);
            document.WriteTo(xmlTextWriter);
            string xmlString = stringWriter.ToString();
            return xmlString;
        }
    }
}
