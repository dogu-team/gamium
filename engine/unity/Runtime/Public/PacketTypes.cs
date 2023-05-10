using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Gamium.Protocol;
using Gamium.Protocol.Packets;
using Gamium.Protocol.Types;


namespace Gamium
{
    internal interface IPacketTypeMapping
    {
        internal Task<PacketResult<ResultUnion>> HandleInternal(RequestT req);
    }

    public abstract class PacketTypeMapping<P, R> : IPacketTypeMapping
        where P : class
        where R : class
    {
        protected internal Param paramType;
        protected internal Result resultType;
        protected internal Func<RequestT, P> paramConverter;
        protected internal Func<R, ResultUnion> resultConverter;

        internal PacketTypeMapping(Param paramType, Result resultType, Func<RequestT, P> paramConverter,
            Func<R, ResultUnion> resultConverter)
        {
            this.paramType = paramType;
            this.resultType = resultType;
            this.paramConverter = paramConverter;
            this.resultConverter = resultConverter;
        }


        public void SetPreprocessor(Func<P, Task> preprocessor)
        {
            this._preprocessor = preprocessor;
        }

        public void SetHandler(Func<P, Task<R>> handler)
        {
            this._customHandler = handler;
        }

        internal void SetInternalHandler(Func<P, Task<PacketResult<R>>> handler)
        {
            this._internalHandler = handler;
        }


        internal async Task<PacketResult<ResultUnion>> Handle(RequestT req)
        {
            P p = this.paramConverter.Invoke(req);

            if (null != _preprocessor)
            {
                await _preprocessor.Invoke(p);
            }

            if (null != _customHandler)
            {
                try
                {
                    R customHandleRet = await _customHandler.Invoke(p);
                    return new PacketResult<ResultUnion>(this.resultConverter.Invoke(customHandleRet));
                }
                catch (Exception e)
                {
                    return new PacketResult<ResultUnion>(ErrorCode.InternalError, e.ToString());
                }
            }

            PacketResult<R> handleRet = await _internalHandler.Invoke(p);
            return new PacketResult<ResultUnion>(this.resultConverter.Invoke(handleRet.value),
                handleRet.error);
        }


        Task<PacketResult<ResultUnion>> IPacketTypeMapping.HandleInternal(RequestT req)
        {
            return this.Handle(req);
        }

        protected Func<P, Task> _preprocessor = null;
        protected Func<P, Task<R>> _customHandler = null;
        internal Func<P, Task<PacketResult<R>>> _internalHandler = null;
    }

    internal class PacketHelloMapping : PacketTypeMapping<HelloParamT, HelloResultT>
    {
        internal PacketHelloMapping() : base(
            Param.Packets_HelloParam,
            Result.Packets_HelloResult,
            req => req.Param.AsPackets_HelloParam(),
            ResultUnion.FromPackets_HelloResult)
        {
        }
    }

    internal class PacketQueryScreenMapping : PacketTypeMapping<QueryScreenParamT, QueryScreenResultT>
    {
        internal PacketQueryScreenMapping() : base(
            Param.Packets_QueryScreenParam,
            Result.Packets_QueryScreenResult,
            req => req.Param.AsPackets_QueryScreenParam(),
            ResultUnion.FromPackets_QueryScreenResult)
        {
        }
    }


    public class PacketFindObjectsMapping : PacketTypeMapping<FindObjectsParamT, FindObjectsResultT>
    {
        internal PacketFindObjectsMapping() : base(
            Param.Packets_FindObjectsParam,
            Result.Packets_FindObjectsResult,
            req => req.Param.AsPackets_FindObjectsParam(),
            ResultUnion.FromPackets_FindObjectsResult)
        {
        }
    }

    public class
        PacketQueryObjectInteractable : PacketTypeMapping<QueryObjectInteractableParamT, QueryObjectInteractableResultT>
    {
        internal PacketQueryObjectInteractable() : base(
            Param.Packets_QueryObjectInteractableParam,
            Result.Packets_QueryObjectInteractableResult,
            req => req.Param.AsPackets_QueryObjectInteractableParam(),
            ResultUnion.FromPackets_QueryObjectInteractableResult)
        {
        }
    }


    internal class PacketActionsMapping : PacketTypeMapping<ActionsParamT, ActionsResultT>
    {
        internal PacketActionsMapping() : base(
            Param.Packets_ActionsParam,
            Result.Packets_ActionsResult,
            req => req.Param.AsPackets_ActionsParam(),
            ResultUnion.FromPackets_ActionsResult)
        {
        }
    }

    internal class PacketExecuteRpcMapping : PacketTypeMapping<ExecuteRpcParamT, ExecuteRpcResultT>
    {
        internal PacketExecuteRpcMapping() : base(
            Param.Packets_ExecuteRpcParam,
            Result.Packets_ExecuteRpcResult,
            req => req.Param.AsPackets_ExecuteRpcParam(),
            ResultUnion.FromPackets_ExecuteRpcResult)
        {
        }
    }

    internal class
        PacketInspectObjectOnScreenMapping : PacketTypeMapping<InspectObjectOnScreenParamT,
            InspectObjectOnScreenResultT>
    {
        internal PacketInspectObjectOnScreenMapping() : base(
            Param.Packets_InspectObjectOnScreenParam,
            Result.Packets_InspectObjectOnScreenResult,
            req => req.Param.AsPackets_InspectObjectOnScreenParam(),
            ResultUnion.FromPackets_InspectObjectOnScreenResult)
        {
        }
    }

    internal class
        PacketInspectObjectWithIdMapping : PacketTypeMapping<InspectObjectWithIdParamT, InspectObjectWithIdResultT>
    {
        internal PacketInspectObjectWithIdMapping() : base(
            Param.Packets_InspectObjectWithIdParam,
            Result.Packets_InspectObjectWithIdResult,
            req => req.Param.AsPackets_InspectObjectWithIdParam(),
            ResultUnion.FromPackets_InspectObjectWithIdResult)
        {
        }
    }


    internal class
        PacketDumpObjectsHierarchyMapping : PacketTypeMapping<DumpObjectsHierarchyParamT, DumpObjectsHierarchyResultT>
    {
        internal PacketDumpObjectsHierarchyMapping() : base(
            Param.Packets_DumpObjectsHierarchyParam,
            Result.Packets_DumpObjectsHierarchyResult,
            req => req.Param.AsPackets_DumpObjectsHierarchyParam(),
            ResultUnion.FromPackets_DumpObjectsHierarchyResult)
        {
        }
    }

    internal class
        PacketChangeConfigurationMapping : PacketTypeMapping<ChangeConfigurationParamT, ChangeConfigurationResultT>
    {
        internal PacketChangeConfigurationMapping() : base(
            Param.Packets_ChangeConfigurationParam,
            Result.Packets_ChangeConfigurationResult,
            req => req.Param.AsPackets_ChangeConfigurationParam(),
            ResultUnion.FromPackets_ChangeConfigurationResult)
        {
        }
    }

    internal class PacketQueryProfileMapping : PacketTypeMapping<QueryProfileParamT, QueryProfileResultT>
    {
        internal PacketQueryProfileMapping() : base(
            Param.Packets_QueryProfileParam,
            Result.Packets_QueryProfileResult,
            req => req.Param.AsPackets_QueryProfileParam(),
            ResultUnion.FromPackets_QueryProfileResult)
        {
        }
    }

    public static class PacketTypes
    {
        internal static PacketHelloMapping hello = new PacketHelloMapping();
        internal static PacketQueryScreenMapping queryScreen = new PacketQueryScreenMapping();
        public static PacketFindObjectsMapping findObjects = new PacketFindObjectsMapping();
        public static PacketQueryObjectInteractable queryObjectInteractable = new PacketQueryObjectInteractable();
        internal static PacketActionsMapping actions = new PacketActionsMapping();
        internal static PacketExecuteRpcMapping executeRpc = new PacketExecuteRpcMapping();

        internal static PacketInspectObjectOnScreenMapping inspectObjectOnScreen =
            new PacketInspectObjectOnScreenMapping();

        internal static PacketInspectObjectWithIdMapping inspectObjectWithId = new PacketInspectObjectWithIdMapping();

        internal static PacketDumpObjectsHierarchyMapping
            dumpObjectsHierarchy = new PacketDumpObjectsHierarchyMapping();

        internal static PacketChangeConfigurationMapping changeConfiguration = new PacketChangeConfigurationMapping();
        internal static PacketQueryProfileMapping queryProfile = new PacketQueryProfileMapping();

        internal static Dictionary<Param, IPacketTypeMapping> mappings = new Dictionary<Param, IPacketTypeMapping>
        {
            { hello.paramType, hello },
            { queryScreen.paramType, queryScreen },
            { findObjects.paramType, findObjects },
            { queryObjectInteractable.paramType, queryObjectInteractable },
            { actions.paramType, actions },
            { executeRpc.paramType, executeRpc },
            { inspectObjectOnScreen.paramType, inspectObjectOnScreen },
            { inspectObjectWithId.paramType, inspectObjectWithId },
            { dumpObjectsHierarchy.paramType, dumpObjectsHierarchy },
            { changeConfiguration.paramType, changeConfiguration },
            { queryProfile.paramType, queryProfile },
        };

        private static void TestHandler()
        {
            findObjects.SetPreprocessor((param) => { return Task.FromResult(0); });
            findObjects.SetHandler((param) =>
                Task.FromResult(new FindObjectsResultT { Infos = new List<ObjectInfoT>() }));
        }
    }
}
