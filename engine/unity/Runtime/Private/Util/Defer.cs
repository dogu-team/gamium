using System;
using System.Runtime.CompilerServices;

namespace Gamium.Private.Util
{
    internal class Defer : IDisposable
    {
        private readonly Action onDispose;

        internal Defer(Action onDispose)
        {
            this.onDispose = onDispose;
        }

        public void Dispose()
        {
            this.onDispose?.Invoke();
        }
    }
}
