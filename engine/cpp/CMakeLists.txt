#CMakeLists.txt

cmake_minimum_required(VERSION 3.12)
project(gamium_server_test)

set(CMAKE_CXX_STANDARD 11)

file(GLOB gamium_server_source_test CONFIGURE_DEPENDS  "src/test/main.cpp")
INCLUDE_DIRECTORIES(src/include/)

add_executable(gamium_server_test  ${gamium_server_source_test})

