using System;
using UnityEngine;

namespace Gamium.Private.Debug
{
    internal class MonobehaviorPool<T> where T : MonoBehaviour
    {
        struct ElemSchema
        {
            internal float accessedTime;
            internal T elem;
        }

        ElemSchema[] elems;
        private Func<T> createFunc;

        internal MonobehaviorPool(uint size, Func<T> createFunc)
        {
            elems = new ElemSchema[size];
            this.createFunc = createFunc;
        }


        internal T Get()
        {
            var now = Time.time;
            var minTime = float.MaxValue;
            var minIndex = -1;
            for (var i = 0; i < elems.Length; i++)
            {
                var elem = elems[i];
                if (elem.accessedTime < minTime)
                {
                    minTime = elem.accessedTime;
                    minIndex = i;
                }
            }

            if (minIndex == -1)
            {
                return null;
            }

            var elemSchema = elems[minIndex];
            if (elemSchema.elem == null)
            {
                elemSchema.elem = createFunc();
            }

            elemSchema.accessedTime = now;
            elems[minIndex] = elemSchema;
            elemSchema.elem.gameObject.SetActive(true);
            return elemSchema.elem;
        }


        internal void Return(T elem)
        {
            for (var i = 0; i < elems.Length; i++)
            {
                var elemSchema = elems[i];
                if (elemSchema.elem == elem)
                {
                    elemSchema.accessedTime = 0;
                    elem.gameObject.SetActive(false);
                    return;
                }
            }
        }
    }
}
