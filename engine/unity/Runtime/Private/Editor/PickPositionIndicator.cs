#if UNITY_EDITOR

using UnityEngine;

namespace Gamium.Private.Editor
{
    internal class PickPositionIndicator
    {
        internal class Behavior : MonoBehaviour
        {
            private void OnDrawGizmosSelected()
            {
                Gizmos.color = Color.black;
                Gizmos.DrawWireCube(transform.position, Vector3.one * 0.5f);
            }
        }
    }
}

#endif
