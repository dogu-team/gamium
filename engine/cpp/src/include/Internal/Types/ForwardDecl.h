//
//  Copyright (c) Dogu Technologies. All rights reserved.
//  MIT License
//

#ifndef GAMIUM_FORWARD_DECL_H
#define GAMIUM_FORWARD_DECL_H

#include "Internal/Protocol/errors_generated.h"
#include "Internal/Protocol/request_generated.h"
#include "Internal/Protocol/response_generated.h"

namespace Gamium
{
class Server;
class ManagedDriver;

// alias
using Error = Gamium::Protocol::Types::ErrorResultT;
using ErrorCode = Gamium::Protocol::Types::ErrorCode;
namespace Types = Gamium::Protocol::Types;

using Request = Gamium::Protocol::RequestT;
using Response = Gamium::Protocol::ResponseT;

using ParamType = Gamium::Protocol::Param;
using ResultType = Gamium::Protocol::Result;
using ResultUnion = Gamium::Protocol::ResultUnion;

namespace Packets = Gamium::Protocol::Packets;

namespace Internal
{
class ListenSocket;
class Driver;
class Multiplexer;
struct SelectorHandler;

} // namespace Internal

} // namespace Gamium

#endif // GAMIUM_FORWARD_DECL_H
