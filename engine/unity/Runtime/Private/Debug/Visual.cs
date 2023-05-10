using System;
using System.Collections.Generic;
using Gamium.Private.Util;
using UnityEngine;
using UnityEngine.UI;
using Screen = UnityEngine.Device.Screen;

namespace Gamium.Private.Debug
{
    internal static class Visual
    {
        internal static int iconPixel = 5;
        internal static Sprite rectSprite { get; private set; }
        internal static bool shouldShow = false;
        static float opacity = 0.5f;


        internal static void Setup(GameObject gamiumGO)
        {
            VisualGoPool.Setup(gamiumGO);

            if (null == rectSprite)
            {
                rectSprite = MakeSprite(new List<Vector2Int>()
                {
                    new Vector2Int(0, 0),
                    new Vector2Int(0, 1),
                    new Vector2Int(0, 2),
                    new Vector2Int(0, 3),
                    new Vector2Int(0, 4),
                    new Vector2Int(1, 0),
                    new Vector2Int(2, 0),
                    new Vector2Int(3, 0),
                    new Vector2Int(4, 0),
                    new Vector2Int(1, 4),
                    new Vector2Int(2, 4),
                    new Vector2Int(3, 4),
                    new Vector2Int(4, 4),
                    new Vector2Int(4, 1),
                    new Vector2Int(4, 2),
                    new Vector2Int(4, 3),
                });
            }

            iconPixel = (int)(Math.Min(Screen.width, Screen.height) * 0.05);


            Util.Logger.Verbose($"DebugUtil Setup complete");
        }

        internal static void ShowText(Vector2 pos, float seconds, string text, Color? nullableColor = null)
        {
            if (!shouldShow)
            {
                return;
            }

            var textComp = VisualGoPool.texts.Get();
            if (null == text)
            {
                Util.Logger.Error($"{nameof(Visual)}.{nameof(ShowText)}: textComp is null");
            }

            var color = nullableColor ?? Color.yellow;
            color.a = opacity;
            textComp.text = text;
            textComp.color = color;
            textComp.rectTransform.position = new Vector3(pos.x, pos.y, 0);

            TaskManager.Behaviour.RunNextTime(() => { VisualGoPool.texts.Return(textComp); }, seconds);
        }

        internal static void ShowRect(Vector2 pos, Vector2 rectSize, float seconds,
            Color? nullableColor = null)
        {
            if (!shouldShow)
            {
                return;
            }

            var imageComp = VisualGoPool.rects.Get();
            if (null == imageComp)
            {
                Util.Logger.Error($"{nameof(Visual)}.{nameof(ShowRect)}: imageComp is null");
            }

            var color = nullableColor ?? Color.yellow;
            imageComp.sprite = rectSprite;
            imageComp.color = color;
            imageComp.rectTransform.sizeDelta = new Vector2(rectSize.x, rectSize.y);
            imageComp.rectTransform.position = new Vector3(pos.x, pos.y, 0);

            TaskManager.Behaviour.RunNextTime(() => { VisualGoPool.rects.Return(imageComp); }, seconds);
        }

        internal static void ShowInspectTarget(Vector2 pos, Vector2 rectSize, float seconds,
            Color? nullableColor = null)
        {
            if (!shouldShow)
            {
                return;
            }

            var imageComp = VisualGoPool.inspectTarget.Get();
            if (null == imageComp)
            {
                Util.Logger.Error($"{nameof(Visual)}.{nameof(ShowRect)}: imageComp is null");
            }

            var color = nullableColor ?? Color.yellow;
            imageComp.sprite = rectSprite;
            imageComp.color = color;
            imageComp.rectTransform.sizeDelta = new Vector2(rectSize.x, rectSize.y);
            imageComp.rectTransform.position = new Vector3(pos.x, pos.y, 0);
        }


        private static Sprite MakeSprite(List<Vector2Int> painted)
        {
            Texture2D texture = new Texture2D(5, 5, TextureFormat.ARGB32, false, true);
            Color[] colors = new Color[25];
            for (int i = 0; i < colors.Length; i++)
            {
                colors[i] = new Color(0, 0, 0, 0.0f);
            }

            texture.SetPixels(colors);

            foreach (var pos in painted)
            {
                texture.SetPixel(pos.x, pos.y, new Color(1, 1, 1, 1));
            }

            texture.Apply();
            texture.filterMode = FilterMode.Point;

            var sprite = Sprite.Create(texture, new Rect(0, 0, 5, 5), new Vector2(2, 2), 60.0f, 0,
                SpriteMeshType.Tight, Vector4.one);
            return sprite;
        }
    }
}
