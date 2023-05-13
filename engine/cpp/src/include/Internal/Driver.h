//
//  Copyright (c) Dogu Technologies. All rights reserved.
//  MIT License
//

#ifndef GAMIUM_DRIVER_H
#define GAMIUM_DRIVER_H

#include "Multiplexer.h"
#include "Types/ForwardDecl.h"

namespace Gamium
{
namespace Internal
{
class Driver
{
    friend class Gamium::Server;
    friend class Gamium::ManagedDriver;

  private:
    Driver(){};
    ~Driver(){};
    Error Init(int port)
    {
        _packetHandler = new Multiplexer();
        return _listenSocket.init(port);
    }
    void Destroy()
    {
        _listenSocket.destroy();
    }
    Error Update()
    {
        if (nullptr == _packetHandler)
        {
            return Error();
        }
        return _listenSocket.select(*_packetHandler);
    }

    ListenSocket _listenSocket;
    ListenSocketCallback *_packetHandler = nullptr;
};
} // namespace Internal
} // namespace Gamium

#endif // GAMIUM_DRIVER_H