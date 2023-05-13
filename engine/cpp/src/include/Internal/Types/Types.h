//
//  Copyright (c) Dogu Technologies. All rights reserved.
//  MIT License
//

#ifndef GAMIUM_TYPES_H
#define GAMIUM_TYPES_H

#include "Internal/Protocol/errors_generated.h"
#include "Internal/Types/ForwardDecl.h"

#if defined(_WIN32)
#include <winsock2.h>
#endif // defined(_WIN32)
namespace Gamium
{

template <class T> struct ErrorValue
{
    Error error;
    T value;
};

template <class T> struct PacketResult : public ErrorValue<std::unique_ptr<T>>
{
};


namespace Internal
{
#if defined(_WIN32)
using SocketHandle = SOCKET;
#else
using SocketHandle = int;
#endif // defined(_WIN32)
} // namespace Internal
} // namespace Gamium

#endif // GAMIUM_TYPES_H
