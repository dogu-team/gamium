using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Gamium.Protocol.Packets;
using Gamium.Protocol.Packets.Actions;
using Gamium.Protocol.Types;

namespace Gamium
{
    internal interface IActionTypeMapping
    {
        internal ActionParam ParamTypeInternal();
        internal Task<ActionResultT> HandleInternal(ActionParamUnion actionParamUnion);
    }

    public abstract class ActionTypeMapping<P> : IActionTypeMapping
        where P : class
    {
        protected internal ActionParam paramType;
        protected internal Func<ActionParamUnion, P> paramConverter;

        internal ActionTypeMapping(ActionParam paramType, Func<ActionParamUnion, P> paramConverter)
        {
            this.paramType = paramType;
            this.paramConverter = paramConverter;
        }
        
        public void SetPreprocessor(Func<P, Task> preprocessor)
        {
            this._preprocessor = preprocessor;
        }
        
        public void SetHandler(Func<P, Task<ActionResultT>> handler)
        {
            this._customHandler = handler;
        }

        protected internal void SetInternalHandler(Func<P, Task<ActionResultT>> handler)
        {
            this._internalHandler = handler;
        }

        protected internal async Task<ActionResultT> Handle(ActionParamUnion actionParamUnion)
        {
            P p = this.paramConverter.Invoke(actionParamUnion);

            if (null != _preprocessor)
            {
                await _preprocessor.Invoke(p);
            }
            
            if (null != _customHandler)
            {
                try
                {
                    return await _customHandler.Invoke(p);
                }
                catch (Exception e)
                {
                    return new ActionResultT{Error = {Code = ErrorCode.InternalError, Reason = e.ToString()}};
                }
            }


            return await _internalHandler.Invoke(p);
        }

        ActionParam IActionTypeMapping.ParamTypeInternal()
        {
            return this.paramType;
        }

        Task<ActionResultT> IActionTypeMapping.HandleInternal(ActionParamUnion actionParamUnion)
        {
            return this.Handle(actionParamUnion);
        }

        protected Func<P, Task> _preprocessor = null;
        protected Func<P, Task<ActionResultT>> _customHandler = null;
        protected Func<P, Task<ActionResultT>> _internalHandler = null;
    }


    internal class ActionSleepTypeMapping : ActionTypeMapping<SleepParamT>
    {
        internal ActionSleepTypeMapping() : base(
            ActionParam.Actions_SleepParam,
            actionParamUnion => actionParamUnion.AsActions_SleepParam())
        {
        }
    }

    internal class ActionInputKeyTypeMapping : ActionTypeMapping<InputKeyParamT>
    {
        internal ActionInputKeyTypeMapping() : base(
            ActionParam.Actions_InputKeyParam,
            actionParamUnion => actionParamUnion.AsActions_InputKeyParam())
        {
        }
    }

    internal class ActionInputMouseTypeMapping : ActionTypeMapping<InputMouseParamT>
    {
        internal ActionInputMouseTypeMapping() : base(
            ActionParam.Actions_InputMouseParam,
            actionParamUnion => actionParamUnion.AsActions_InputMouseParam())
        {
        }
    }

    internal class ActionInputSetTextTypeMapping : ActionTypeMapping<InputSetTextParamT>
    {
        internal ActionInputSetTextTypeMapping() : base(
            ActionParam.Actions_InputSetTextParam,
            actionParamUnion => actionParamUnion.AsActions_InputSetTextParam())
        {
        }
    }


    public class ActionMovePlayerTypeMapping : ActionTypeMapping<MovePlayerParamT>
    {
        internal ActionMovePlayerTypeMapping() : base(
            ActionParam.Actions_MovePlayerParam,
            actionParamUnion => actionParamUnion.AsActions_MovePlayerParam())
        {
        }
    }

    internal class ActionAppQuitMapping : ActionTypeMapping<AppQuitParamT>
    {
        internal ActionAppQuitMapping() : base(
            ActionParam.Actions_AppQuitParam,
            actionParamUnion => actionParamUnion.AsActions_AppQuitParam())
        {
        }
    }

    public static class ActionsTypes
    {
        internal static ActionSleepTypeMapping sleep = new ActionSleepTypeMapping();
        internal static ActionInputKeyTypeMapping inputKey = new ActionInputKeyTypeMapping();
        internal static ActionInputMouseTypeMapping inputMouse = new ActionInputMouseTypeMapping();
        internal static ActionInputSetTextTypeMapping inputSetText = new ActionInputSetTextTypeMapping();
        public static ActionMovePlayerTypeMapping movePlayer = new ActionMovePlayerTypeMapping();
        internal static ActionAppQuitMapping appQuit = new ActionAppQuitMapping();

        internal static Dictionary<ActionParam, IActionTypeMapping> mappings =
            new Dictionary<ActionParam, IActionTypeMapping>
            {
                { sleep.paramType, sleep },
                { inputKey.paramType, inputKey },
                { inputMouse.paramType, inputMouse },
                { inputSetText.paramType, inputSetText },
                { movePlayer.paramType, movePlayer },
                { appQuit.paramType, appQuit },
            };
        
        private static void TestHandler()
        {
            sleep.SetPreprocessor((param) => { return Task.FromResult(0);});
            sleep.SetHandler((param) =>
                Task.FromResult(new ActionResultT()));
        }

    }
}
