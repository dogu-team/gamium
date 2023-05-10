using Gamium.Private.Util;
using UnityEngine;
using UnityEngine.EventSystems;

namespace Gamium.Private
{
    internal class GamiumEventSystem
    {
        internal class Behaviour : MonoBehaviour
        {
            internal static Behaviour instance;
            internal EventSystem eventSystem;
            internal StandaloneInputModule inputModule;

            protected void Awake()
            {
                instance = this;
                if (null == EventSystem.current && null == GameObject.FindObjectOfType<EventSystem>())
                {
                    eventSystem = gameObject.AddComponent<EventSystem>();
                    inputModule = gameObject.AddComponent<StandaloneInputModule>();
                }
            }

            public EventSystem Current()
            {
                if (null != EventSystem.current)
                {
                    return EventSystem.current;
                }

                var globalEventSystem = GameObject.FindObjectOfType<EventSystem>();
                if (null != globalEventSystem)
                {
                    return globalEventSystem;
                }

                gameObject.SetActive(true);
                return eventSystem;
            }

            public BaseInputModule CurrentInputModule()
            {
                if (null != EventSystem.current && null != EventSystem.current.currentInputModule)
                {
                    return EventSystem.current.currentInputModule;
                }

                gameObject.SetActive(true);
                return inputModule;
            }
        }
    }
}
