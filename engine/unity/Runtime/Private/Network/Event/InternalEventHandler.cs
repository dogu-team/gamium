namespace Gamium.Private
{
    internal class InternalEventHandler : IEventHandler
    {
        public void OnAccept(EventContext eventContext)
        {
        }

        public void Update()
        {
        }

        public void OnClose(EventContext eventContext)
        {
            Input.storage.ClearAllKeyStates();
        }
    }
}
