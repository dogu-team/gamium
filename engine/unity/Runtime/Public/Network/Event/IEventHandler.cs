namespace Gamium
{
    public interface IEventHandler
    {
        void OnAccept(EventContext eventContext);
        void Update();
        void OnClose(EventContext eventContext);
    }
}
