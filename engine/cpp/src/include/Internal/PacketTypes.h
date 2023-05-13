//
//  Copyright (c) Dogu Technologies. All rights reserved.
//  MIT License
//

#ifndef GAMIUM_PACKET_TYPES_H
#define GAMIUM_PACKET_TYPES_H

#include "flatbuffers/flatbuffers.h"
#include "Protocol/request_generated.h"
#include "Protocol/response_generated.h"
#include "Types/Assert.h"
#include "Types/ForwardDecl.h"
#include "Types/Types.h"
#include <map>
#include <string>
#include <vector>

namespace Gamium
{
namespace Internal
{

class IPacketTypeMapping
{
    friend class Multiplexer;

  public:
    virtual ~IPacketTypeMapping(){};
    virtual ParamType GetParamType() = 0;
    virtual ResultType GetResultType() = 0;

  protected:
    virtual ErrorValue<ResultUnion> Handle(Request &req) = 0;
};

template <class P, class R> class PacketTypeMapping : public IPacketTypeMapping
{
    using PacketHandler = std::function<ErrorValue<std::unique_ptr<R>>(P &)>;

  public:
    virtual ~PacketTypeMapping(){};
    void SetPreprocessor(PacketHandler preprocessor)
    {
        this->_preprocessor = preprocessor;
    }
    void SetHandler(PacketHandler handler)
    {
        this->_handler = handler;
    }

  protected:
    virtual P *ToParam(Request &req) = 0;
    virtual ResultUnion ToResult(R &result) = 0;

    ErrorValue<ResultUnion> Handle(Request &req) override
    {
        ErrorValue<ResultUnion> result;
        result.error.code = ErrorCode::None;

        auto param = this->ToParam(req);
        if (this->_preprocessor)
        {
            auto preprocessorRet = this->_preprocessor(*param);
            if (preprocessorRet.value)
            {
                result.value = this->ToResult(*preprocessorRet.value);
                return result;
            }
        }
        if (!this->_handler)
        {
            result.error.code = ErrorCode::MethodNotFound;
            result.error.reason = "No Handler: " + std::to_string((int)this->GetParamType()) + "";
            return result;
        }
        auto handlerRet = this->_handler(*param);
        result.value = this->ToResult(*handlerRet.value);
        return result;
    }

    PacketHandler _preprocessor;
    PacketHandler _handler;
};

class PacketHelloMapping : public PacketTypeMapping<Packets::HelloParamT, Packets::HelloResultT>
{
  public:
    PacketHelloMapping()
    {
    }
    virtual ~PacketHelloMapping(){};
    ParamType GetParamType() override
    {
        return ParamType::Packets_HelloParam;
    }
    ResultType GetResultType() override
    {
        return ResultType::Packets_HelloResult;
    }

  protected:
    Packets::HelloParamT *ToParam(Request &req) override
    {
        return req.param.AsPackets_HelloParam();
    }
    ResultUnion ToResult(Packets::HelloResultT &result) override
    {
        ResultUnion ret;
        ret.Set(result);
        return ret;
    }
};

class PacketQueryScreenMapping : public PacketTypeMapping<Packets::QueryScreenParamT, Packets::QueryScreenResultT>
{
  public:
    PacketQueryScreenMapping()
    {
    }
    virtual ~PacketQueryScreenMapping(){};
    ParamType GetParamType() override
    {
        return ParamType::Packets_QueryScreenParam;
    }
    ResultType GetResultType() override
    {
        return ResultType::Packets_QueryScreenResult;
    }

  protected:
    Packets::QueryScreenParamT *ToParam(Request &req) override
    {
        return req.param.AsPackets_QueryScreenParam();
    }
    ResultUnion ToResult(Packets::QueryScreenResultT &result) override
    {
        ResultUnion ret;
        ret.Set(result);
        return ret;
    }
};

class PacketFindObjectsMapping : public PacketTypeMapping<Packets::FindObjectsParamT, Packets::FindObjectsResultT>
{
  public:
    PacketFindObjectsMapping()
    {
    }
    virtual ~PacketFindObjectsMapping(){};
    ParamType GetParamType() override
    {
        return ParamType::Packets_FindObjectsParam;
    }
    ResultType GetResultType() override
    {
        return ResultType::Packets_FindObjectsResult;
    }

  protected:
    Packets::FindObjectsParamT *ToParam(Request &req) override
    {
        return req.param.AsPackets_FindObjectsParam();
    }
    ResultUnion ToResult(Packets::FindObjectsResultT &result) override
    {
        ResultUnion ret;
        ret.Set(result);
        return ret;
    }
};

class PacketQueryObjectInteractableMapping : public PacketTypeMapping<Packets::QueryObjectInteractableParamT, Packets::QueryObjectInteractableResultT>
{
  public:
    PacketQueryObjectInteractableMapping()
    {
    }
    virtual ~PacketQueryObjectInteractableMapping(){};
    ParamType GetParamType() override
    {
        return ParamType::Packets_QueryObjectInteractableParam;
    }
    ResultType GetResultType() override
    {
        return ResultType::Packets_QueryObjectInteractableResult;
    }

  protected:
    Packets::QueryObjectInteractableParamT *ToParam(Request &req) override
    {
        return req.param.AsPackets_QueryObjectInteractableParam();
    }
    ResultUnion ToResult(Packets::QueryObjectInteractableResultT &result) override
    {
        ResultUnion ret;
        ret.Set(result);
        return ret;
    }
};

class PacketActionsMapping : public PacketTypeMapping<Packets::ActionsParamT, Packets::ActionResultT>
{
  public:
    PacketActionsMapping()
    {
    }
    virtual ~PacketActionsMapping(){};
    ParamType GetParamType() override
    {
        return ParamType::Packets_ActionsParam;
    }
    ResultType GetResultType() override
    {
        return ResultType::Packets_ActionsResult;
    }

  protected:
    Packets::ActionsParamT *ToParam(Request &req) override
    {
        return req.param.AsPackets_ActionsParam();
    }
    ResultUnion ToResult(Packets::ActionResultT &result) override
    {
        ResultUnion ret;
        ret.Set(result);
        return ret;
    }
};

class PacketExecuteRpcMapping : public PacketTypeMapping<Packets::ExecuteRpcParamT, Packets::ExecuteRpcResultT>
{
  public:
    PacketExecuteRpcMapping()
    {
    }
    virtual ~PacketExecuteRpcMapping(){};
    ParamType GetParamType() override
    {
        return ParamType::Packets_ExecuteRpcParam;
    }
    ResultType GetResultType() override
    {
        return ResultType::Packets_ExecuteRpcResult;
    }

  protected:
    Packets::ExecuteRpcParamT *ToParam(Request &req) override
    {
        return req.param.AsPackets_ExecuteRpcParam();
    }
    ResultUnion ToResult(Packets::ExecuteRpcResultT &result) override
    {
        ResultUnion ret;
        ret.Set(result);
        return ret;
    }
};

} // namespace Internal

namespace PacketHandlers
{
static std::map<ParamType, Internal::IPacketTypeMapping *> map;
static Internal::PacketHelloMapping *hello;
static Internal::PacketQueryScreenMapping *queryScreen;
static Internal::PacketFindObjectsMapping *findObjects;
static Internal::PacketQueryObjectInteractableMapping *queryObjectInteractable;
static Internal::PacketActionsMapping *actions;
static Internal::PacketExecuteRpcMapping *executeRpc;

static void Init()
{
    hello = new Internal::PacketHelloMapping();
    queryScreen = new Internal::PacketQueryScreenMapping();
    findObjects = new Internal::PacketFindObjectsMapping();
    queryObjectInteractable = new Internal::PacketQueryObjectInteractableMapping();
    actions = new Internal::PacketActionsMapping();
    executeRpc = new Internal::PacketExecuteRpcMapping();

    map[hello->GetParamType()] = hello;
    map[queryScreen->GetParamType()] = queryScreen;
    map[findObjects->GetParamType()] = findObjects;
    map[queryObjectInteractable->GetParamType()] = queryObjectInteractable;
    map[actions->GetParamType()] = actions;
    map[executeRpc->GetParamType()] = executeRpc;

    for (uint8_t i = static_cast<uint8_t>(ParamType::MIN) + 1; i <= static_cast<uint8_t>(ParamType::MAX); i++)
    {
        if (map.find((ParamType)i) == map.end())
        {
            Internal::Assert(false, "Packet type not handled." + std::to_string(i));
        }
    }
}
}; // namespace PacketHandlers

} // namespace Gamium

#endif // GAMIUM_PACKET_TYPES_H
