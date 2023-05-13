//
//  Copyright (c) Dogu Technologies. All rights reserved.
//  MIT License
//

#ifndef GAMIUM_MULTIPLEXER_H
#define GAMIUM_MULTIPLEXER_H

#include "PacketTypes.h"
#include "flatbuffers/flatbuffers.h"
#include "Network/ListenSocket.h"
#include "Protocol/request_generated.h"
#include "Protocol/response_generated.h"
#include <string>
#include <vector>

namespace Gamium
{
namespace Internal
{

class Multiplexer : public ListenSocketCallback
{
  public:
    Multiplexer() : _fd(0), _headSize(0){};
    Error OnAccept(Gamium::Internal::SocketHandle fd) override
    {
        if (0 == _fd)
        {
            _fd = fd;
        }
        else
        {
            Error err;
            err.code = ErrorCode ::SockerError;
            err.reason = "Redundant Client Connnected";
            return err;
        }
        return Error();
    }
    Error OnRecv(Gamium::Internal::SocketHandle fd, const unsigned char *buffer, unsigned int bufferSize, std::vector<char> &sendBuffer) override
    {
        if (0 == bufferSize)
        {
            return Error();
        }

        _recvBuffer.insert(_recvBuffer.end(), buffer, buffer + bufferSize);
        if ((0 == _headSize) && (sizeof(_headSize) <= _recvBuffer.size()))
        {
            _headSize = flatbuffers::GetPrefixedSize(_recvBuffer.data());
        }
        unsigned int packetSize = sizeof(_headSize) + _headSize;
        if (packetSize <= static_cast<unsigned int>(_recvBuffer.size()))
        {
            int remainedSize = static_cast<int>(_recvBuffer.size()) - packetSize;
            std::vector<unsigned char> remainedBuffer;
            if (0 < remainedSize)
            {
                remainedBuffer.insert(remainedBuffer.end(), &_recvBuffer[packetSize], &_recvBuffer[_recvBuffer.size() - packetSize]);
            }
            HandleCommand(sendBuffer);
            _recvBuffer.clear();
            if (0 < remainedSize)
            {
                return OnRecv(fd, remainedBuffer.data(), static_cast<unsigned int>(remainedBuffer.size()), sendBuffer);
            }
            return Error();
        }

        return Error();
    }
    Error OnClose(Gamium::Internal::SocketHandle fd) override
    {
        Error err;
        if (_fd == fd)
        {
            _fd = 0;
        }
        else
        {
            err.code = ErrorCode::SockerError;
            err.reason = "UnKnownClientReleased";
            return err;
        }
        return Error();
    }

  private:
    Error HandleCommand(std::vector<char> &sendBuffer)
    {
        Error err;
        auto request = Gamium::Protocol::UnPackSizePrefixedRequest(_recvBuffer.data());
        if (nullptr == request)
        {
            err.code = ErrorCode::SockerError;
            err.reason = "FlatbufferCastFaild to Root";
            return err;
        }
        auto result = Gamium::PacketHandlers::map[request->param.type]->Handle(*request);

        flatbuffers::FlatBufferBuilder builder = flatbuffers::FlatBufferBuilder();
        builder.FinishSizePrefixed(Gamium::Protocol::CreateResponse(builder, request->seq, Gamium::Protocol::Types::ErrorResult::Pack(builder, &result.error), result.value.type,
                                                                    result.value.Pack(builder)));
        sendBuffer.insert(sendBuffer.end(), builder.GetBufferPointer(), builder.GetBufferPointer() + builder.GetSize());

        return Error();
    }

    Gamium::Internal::SocketHandle _fd;
    std::vector<unsigned char> _recvBuffer;
    unsigned int _headSize;
};

} // namespace Internal
} // namespace Gamium

#endif // GAMIUM_MULTIPLEXER_H