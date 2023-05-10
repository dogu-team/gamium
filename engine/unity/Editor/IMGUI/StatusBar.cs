using System.Collections.Generic;
using System.Linq;
using UnityEditor;
using UnityEngine;

namespace Gamium.Editor.IMGUI
{
    internal static class StatusBar
    {
        private class Message
        {
            public float showTime;
            public string text;
        }


        private static List<Message> messageQueue = new List<Message>();
        private const float Height = 20f;
        private const float Duration = 3.0f;

        internal static void Verbose(string message)
        {
            messageQueue.Clear();
            messageQueue.Add(new Message { showTime = 0, text = message });
        }

        internal static void Draw(Rect rect)
        {
            GUILayout.FlexibleSpace();


            var text = "";
            if (messageQueue.Any())
            {
                text = messageQueue[0].text;
            }
            GUI.backgroundColor = Color.black;
            GUILayout.Label(text, Styles.Label_StatusBar, Styles.Label_StatusBarOption);

            Update();
        }

        internal static void Update()
        {
            if (!messageQueue.Any())
            {
                return;
            }

            if (0 == messageQueue[0].showTime)
            {
                messageQueue[0].showTime = Time.realtimeSinceStartup;
            }

            if (Duration < Time.realtimeSinceStartup - messageQueue[0].showTime)
            {
                messageQueue.RemoveAt(0);
            }
        }
    }
}
