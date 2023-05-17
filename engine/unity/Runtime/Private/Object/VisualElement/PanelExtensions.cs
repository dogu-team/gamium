using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using UnityEngine.UIElements;

namespace Gamium.Private.Object
{
    internal static class PanelExtensions
    {
        internal static Vector2 PanelToScreenRatio(this IPanel panel, out Vector2 panelSize)
        {
#if UNITY_2021_1_OR_NEWER
            panelSize = RuntimePanelUtils.ScreenToPanel(panel, new Vector2(Screen.width, Screen.height));
            var widthRatio = Screen.width / panelSize.x;
            var heightRatio = Screen.height / panelSize.y;
            return new Vector2(widthRatio, heightRatio);
#else
            throw new Exception("UIElements cannot be viewed below the 2021 version.");
#endif
        }

        internal static Vector2 ScreenToPanelRatio(this IPanel panel, out Vector2 panelSize)
        {
#if UNITY_2021_1_OR_NEWER
            panelSize = RuntimePanelUtils.ScreenToPanel(panel, new Vector2(Screen.width, Screen.height));
            var widthRatio = panelSize.x / Screen.width;
            var heightRatio = panelSize.y / Screen.height;
            return new Vector2(widthRatio, heightRatio);
#else
            throw new Exception("UIElements cannot be viewed below the 2021 version.");
#endif
        }
    }
}
