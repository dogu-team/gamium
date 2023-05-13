//
//  Copyright (c) ByoungWook Park. All rights reserved.
//  MIT License
//

#include "GamiumEngine.h"
#include <iostream>

Gamium::PacketResult<Gamium::Packets::HelloResultT> handleHello(Gamium::Packets::HelloParamT &req)
{
    printf("hello handler(%s)\n", req.version.c_str());

    Gamium::PacketResult<Gamium::Packets::HelloResultT> result;
    result.value = std::unique_ptr<Gamium::Packets::HelloResultT>(new Gamium::Packets::HelloResultT());
    result.value->app_name = "Gamium Engine";
    result.value->app_version = "1.0.0";
    return result;
}

Gamium::PacketResult<Gamium::Packets::QueryScreenResultT> handleQueryScreen(Gamium::Packets::QueryScreenParamT &req)
{
    printf("queryScreen handler\n");

    Gamium::PacketResult<Gamium::Packets::QueryScreenResultT> result;
    result.value = std::unique_ptr<Gamium::Packets::QueryScreenResultT>(new Gamium::Packets::QueryScreenResultT());
    result.value->width = 100;
    result.value->height = 100;
    return result;
}

Gamium::PacketResult<Gamium::Packets::FindObjectsResultT> handleFindObjects(Gamium::Packets::FindObjectsParamT &req)
{
    printf("findObjects handler\n");

    Gamium::PacketResult<Gamium::Packets::FindObjectsResultT> result;
    result.value = std::unique_ptr<Gamium::Packets::FindObjectsResultT>(new Gamium::Packets::FindObjectsResultT());
    result.value->infos = std::vector<Gamium::Types::ObjectInfoT>();
    return result;
}

Gamium::PacketResult<Gamium::Packets::QueryObjectInteractableResultT> handleQueryobjectInteractable(Gamium::Packets::QueryObjectInteractableParamT &req)
{
    printf("findObjects handler\n");

    Gamium::PacketResult<Gamium::Packets::QueryObjectInteractableResultT> result;
    result.value = std::unique_ptr<Gamium::Packets::QueryObjectInteractableResultT>(new Gamium::Packets::QueryObjectInteractableResultT());
    result.value->is_interactable = false;
    return result;
}

int main(int argc, const char *argv[])
{
    printf("Gamium Engine start\n");
    fflush(stdout);

    Gamium::Server server;
    Gamium::PacketHandlers::hello->SetHandler(handleHello);
    Gamium::Error ret = server.Init(50061);
    if (Gamium::ErrorCode::None != ret.code)
    {
        printf("Gamium Engine start Failed type(%d) detail(%s)\n", ret.code, ret.reason.c_str());
        fflush(stdout);
        return -1;
    }
    while (true)
    {
        ret = server.Update();
        if (Gamium::ErrorCode::None != ret.code)
        {
            printf("Gamium Engine Update Failed type(%d) detail(%s)\n", ret.code, ret.reason.c_str());
            fflush(stdout);
            return -1;
        }
        Gamium::Sleep(500);
        printf("running\n");
        fflush(stdout);
    }

    return 0;
}
