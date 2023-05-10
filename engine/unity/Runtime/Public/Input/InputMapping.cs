using System.Collections.Generic;
using UnityEngine;

namespace Gamium
{
    public class InputMapping
    {
        public string alias;
        public HashSet<KeyCode> positiveCodes = new HashSet<KeyCode>();
        public HashSet<KeyCode> negativeCodes = new HashSet<KeyCode>();
    }
}
