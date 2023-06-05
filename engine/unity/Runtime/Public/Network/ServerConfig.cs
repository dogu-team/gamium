using UnityEngine;

namespace Gamium
{
    public class ServerConfig
    {
        public int port = 50061;
        public bool isVerbose = true;
        public bool showVisualDebug = false;
        public InputMapping[] inputMappings = new InputMapping[]{};
    }
}
