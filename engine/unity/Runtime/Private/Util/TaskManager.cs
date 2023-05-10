using System;
using System.Collections;
using UnityEngine;

namespace Gamium.Private.Util
{
    internal class TaskManager
    {
        internal class Behaviour : MonoBehaviour
        {
            private static Behaviour _instance;

            public void Awake()
            {
                _instance = this;
            }

            private void OnEnable()
            {
                _instance = this;
            }

            private void OnDisable()
            {
                _instance = null;
            }

            private void OnDestroy()
            {
                _instance = null;
            }

            public static void RunCoroutine(IEnumerator routine)
            {
                _instance?.StartCoroutine(routine);
            }

            public static void RunNextFrame(Action routine, int frameCount = 1)
            {
                if (0 == frameCount)
                {
                    routine?.Invoke();
                    return;
                }

                _instance?.StartCoroutine(CoRunNextFrame(routine, frameCount));
            }

            public static void RunNextTime(Action routine, float seconds)
            {
                _instance?.StartCoroutine(CoRunNextTime(routine, seconds));
            }


            private static IEnumerator CoRunNextFrame(Action action, int frameCount)
            {
                for (int i = 0; i < frameCount; i++)
                {
                    yield return null;
                }

                action?.Invoke();
            }

            private static IEnumerator CoRunNextTime(Action action, float seconds)
            {
                yield return new WaitForSeconds(seconds);

                action?.Invoke();
            }
        }
    }
}
