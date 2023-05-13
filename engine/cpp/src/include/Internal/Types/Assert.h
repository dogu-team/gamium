//
//  Copyright (c) Dogu Technologies. All rights reserved.
//  MIT License
//

#ifndef GAMIUM_ASSERT_H
#define GAMIUM_ASSERT_H

#include <cassert>

namespace Gamium
{
namespace Internal
{

void Assert(bool value, std::string msg)
{
    assert(((void)msg.c_str(), value));
}

} // namespace Internal
} // namespace Gamium

#endif // GAMIUM_ASSERT_H
