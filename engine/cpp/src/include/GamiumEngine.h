//
//  Copyright (c) ByoungWook Park. All rights reserved.
//  MIT License
//

#ifndef GAMIUM_CORE_SERVER_H
#define GAMIUM_CORE_SERVER_H

#include "Internal/Driver.h"
#include "Internal/PacketTypes.h"
#include "Internal/Types/ForwardDecl.h"
#include "Internal/Types/Types.h"
#include "Internal/Util.h"
#include <string>

namespace Gamium
{
class Server
{
  public:
    Server()
    {
        PacketHandlers::Init();
    };
    ~Server(){};
    Error Init(int port)
    {
        return _driver.Init(port);
    }
    void Destroy()
    {
        _driver.Destroy();
    };
    Error Update()
    {
        return _driver.Update();
    }
    const char *getVersion()
    {
        return "1.0.0";
    }

  private:
    Internal::Driver _driver;
};

void Sleep(uint32_t millisecond)
{
    Internal::Util::Sleep(millisecond);
}
} // namespace Gamium

#endif // GAMIUM_CORE_SERVER_H
