//
//  Copyright (c) Dogu Technologies. All rights reserved.
//  MIT License
//

#ifndef GAMIUM_UTIL_H
#define GAMIUM_UTIL_H

#include <stdio.h>
#include <stdlib.h>

#if defined(_WIN32)
#else
#include <unistd.h>
#endif // defined(_WIN32 )

namespace Gamium
{
namespace Internal
{
namespace Util
{
void Sleep(uint32_t millisecond)
{
#if defined(_WIN32)
    Sleep(millisecond);
#else
    usleep(millisecond * 1000);
#endif // defined(_WIN32 )
}
} // namespace Util
} // namespace Internal
} // namespace Gamium

#endif // GAMIUM_UTIL_H