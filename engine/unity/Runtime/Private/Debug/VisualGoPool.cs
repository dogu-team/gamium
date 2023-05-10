using Gamium.Private.Util;
using UnityEngine;
using UnityEngine.UI;

namespace Gamium.Private.Debug
{
    internal static class VisualGoPool
    {
        internal static MonobehaviorPool<Text> texts;
        internal static MonobehaviorPool<Image> rects;
        internal static MonobehaviorPool<Image> inspectTarget;
        static Canvas _overlayCanvas;


        internal static void Setup(GameObject gamiumGO)
        {
            if (null == _overlayCanvas)
            {
                var canvasGo = new GameObject("GamiumOverlayCanvas");
                canvasGo.transform.SetParent(gamiumGO.transform);
                _overlayCanvas = canvasGo.AddComponent<Canvas>();
                _overlayCanvas.renderMode = RenderMode.ScreenSpaceOverlay;
                _overlayCanvas.sortingOrder = 1000;
            }

            if (null == texts)
            {
                texts = new MonobehaviorPool<Text>(5, CreateText);
            }

            if (null == rects)
            {
                rects = new MonobehaviorPool<Image>(5, CreateRect);
            }

            if (null == inspectTarget)
            {
                inspectTarget = new MonobehaviorPool<Image>(1, CreateRect);
            }
        }

        static Text CreateText()
        {
            if (null == _overlayCanvas)
            {
                Util.Logger.Error($"{nameof(VisualGoPool)}.{nameof(CreateText)}: _overlayCanvas is null");
            }

            var newGo = new GameObject("Text");
            newGo.transform.SetParent(_overlayCanvas.transform, false);
            newGo.transform.SetParent(newGo.transform, false);
            var textComp = newGo.AddComponent<Text>();
            textComp.font = Resources.GetBuiltinResource<Font>("Arial.ttf");
            textComp.fontStyle = FontStyle.Normal;
            textComp.alignment = TextAnchor.MiddleCenter;
            textComp.resizeTextForBestFit = true;
            var size = Screen.width * 0.1f;
            textComp.rectTransform.sizeDelta = new Vector2(size, size);
            textComp.raycastTarget = false;

            var shadowColor = Color.black;
            shadowColor.a = 0.5f;
            var shadowComp = newGo.AddComponent<Shadow>();
            shadowComp.effectDistance = new Vector2(3, -3);
            shadowComp.effectColor = shadowColor;
            return textComp;
        }

        static Image CreateRect()
        {
            if (null == _overlayCanvas)
            {
                Util.Logger.Error($"{nameof(Visual)}.{nameof(CreateRect)}: _overlayCanvas is null");
            }

            var newTextGo = new GameObject("Rect");
            var imageComp = newTextGo.AddComponent<Image>();
            newTextGo.transform.SetParent(_overlayCanvas.transform, false);

            imageComp.type = Image.Type.Sliced;
            imageComp.raycastTarget = false;
            return imageComp;
        }
    }
}
