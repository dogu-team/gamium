//
//  Copyright (c) Dogu Technologies. All rights reserved.
//  MIT License
//

#ifndef GAMIUM_LISTEN_SOCKET_H
#define GAMIUM_LISTEN_SOCKET_H

#include <errno.h>
#include <stdio.h>
#include <stdlib.h>

#include <string>
#if defined(_WIN32)
#include <winsock2.h>
#include <ws2tcpip.h>
#pragma comment(lib, "Ws2_32.lib")
#else
#include <netinet/in.h>
#include <sys/ioctl.h>
#include <sys/socket.h>
#include <sys/time.h>
#include <unistd.h>
#endif // defined(_WIN32 )

#include "Internal/Types/Types.h"

namespace Gamium
{
namespace Internal
{

class ListenSocketCallback
{
  public:
    ListenSocketCallback(){};
    virtual ~ListenSocketCallback(){};
    virtual Error OnAccept(SocketHandle fd) = 0;
    virtual Error OnRecv(SocketHandle fd, const unsigned char *buffer, unsigned int bufferSize, std::vector<char> &sendBuffer) = 0;
    virtual Error OnClose(SocketHandle fd) = 0;
};

#if defined(_WIN32)
const char *getLastErrString()
{
    int lastError = WSAGetLastError();
    static char msgbuf[256];
    msgbuf[0] = '\0';

    FormatMessage(FORMAT_MESSAGE_FROM_SYSTEM, NULL, lastError, MAKELANGID(LANG_NEUTRAL, SUBLANG_DEFAULT), (LPTSTR)&msgbuf, sizeof(msgbuf), NULL);
    return msgbuf;
}

class ListenSocket
{
  public:
    ListenSocket() : _fd(0), _maxFd(0){};

    Error init(int port)
    {
        WSADATA wsa;
        WSAStartup(MAKEWORD(2, 2), &wsa);
        FD_ZERO(&_masterSet);
        _timeout.tv_sec = 0;
        _timeout.tv_usec = 100;

        Error Error;
        bool on = true;
        u_long nonblockOn = 1;
        SOCKADDR_IN addr;

        _fd = socket(AF_INET, SOCK_STREAM, 0);
        if (INVALID_SOCKET == _fd)
        {
            Error._type = Error::Socket;
            Error._param = WSAGetLastError();
            Error._detail = getLastErrString();
            return Error;
        }

        int ret = setsockopt(_fd, SOL_SOCKET, SO_REUSEADDR, (char *)&on, sizeof(on));
        if (SOCKET_ERROR == ret)
        {
            Error._type = Error::SetSockOpt;
            Error._param = WSAGetLastError();
            Error._detail = getLastErrString();
            destroy();
            return Error;
        }

        if (SOCKET_ERROR == ioctlsocket(_fd, FIONBIO, &nonblockOn))
        {
            Error._type = Error::Ioctl;
            Error._param = WSAGetLastError();
            Error._detail = getLastErrString();
            return Error;
        }

        memset(&addr, 0, sizeof(addr));
        addr.sin_family = AF_INET;
        addr.sin_port = htons(port);
        // addr.sin_addr.s_addr = htonl(INADDR_ANY);
        InetPtonA(AF_INET, "127.0.0.1", &addr.sin_addr);
        if (SOCKET_ERROR == bind(_fd, (struct sockaddr *)&addr, sizeof(addr)))
        {
            Error._type = Error::Bind;
            Error._param = WSAGetLastError();
            Error._detail = getLastErrString();
            destroy();
            return Error;
        }

        if (SOCKET_ERROR == listen(_fd, 32))
        {
            Error._type = Error::Listen;
            Error._param = WSAGetLastError();
            Error._detail = getLastErrString();
            destroy();
            return Error;
        }

        _maxFd = _fd;
        FD_SET(_fd, &_masterSet);

        return Error;
    }
    void destroy()
    {
        for (int i = 0; i <= _maxFd; ++i)
        {
            if (FD_ISSET(i, &_masterSet))
            {
                closesocket(i);
            }
        }
        if (0 < _fd)
        {
            closesocket(_fd);
        }
        WSACleanup();
    }
    Error select(ListenSocketCallback &callback)
    {
        Error Error;
        FD_SET workingSet;
        int onFdCount = 0;
        SocketHandle newFd = 0;

        memcpy(&workingSet, &_masterSet, sizeof(_masterSet));

        int selectRet = ::select(0, &workingSet, NULL, NULL, &_timeout);
        if (SOCKET_ERROR == selectRet)
        {
            if (EINTR == errno)
            {
                Error._param = WSAGetLastError();
                Error._detail = "select interuppted";
                return Error;
            }
            Error._type = Error::Select;
            Error._param = WSAGetLastError();
            Error._detail = getLastErrString();
            return Error;
        }

        if (selectRet == 0)
        {
            Error._detail = "select() timed out";
            return Error;
        }

        onFdCount = selectRet;
        for (int i = 0; (i <= _maxFd) && (0 < onFdCount); ++i)
        {
            if (FD_ISSET(i, &workingSet))
            {
                onFdCount -= 1;
                if (i != _fd)
                {
                    Error recvRv = recvFd(i, callback);
                    if (Error::Ok != recvRv)
                    {
                        return recvRv;
                    }
                }
            }
        }
        if (FD_ISSET(_fd, &workingSet))
        {
            Error acceptRv = acceptFd(callback);
            if (Error::Ok != acceptRv)
            {
                return acceptRv;
            }
        }
        return Error;
    }

    Error acceptFd(ListenSocketCallback &callback)
    {
        SocketHandle newFd = 0;
        Error Error;
        do
        {
            newFd = accept(_fd, NULL, NULL);
            if (WSAEWOULDBLOCK == WSAGetLastError())
            {
                break;
            }
            if (INVALID_SOCKET == newFd)
            {
                Error._type = Error::Accept;
                Error._param = WSAGetLastError();
                Error._detail = getLastErrString();
                return Error;
            }

            Error acceptRv = callback.onAccept(newFd);
            if (Error::Ok != acceptRv)
            {
                return acceptRv;
            }
            FD_SET(newFd, &_masterSet);
            if (_maxFd < newFd)
            {
                _maxFd = newFd;
            }

        } while (newFd != -1);
        return Error;
    }

    Error recvFd(int i, ListenSocketCallback &callback)
    {
        unsigned char buffer[65535];
        Error Error;
        do
        {
            int recvRet = recv(i, reinterpret_cast<char *>(buffer), sizeof(buffer), 0);
            if (WSAEWOULDBLOCK == WSAGetLastError())
            {
                break;
            }
            if (WSAECONNRESET == WSAGetLastError())
            {
                closeFd(i, callback);
                break;
            }
            if (recvRet == 0)
            {
                closeFd(i, callback);
                break;
            }
            if (SOCKET_ERROR == recvRet)
            {
                Error._type = Error::Recv;
                Error._param = WSAGetLastError();
                Error._detail = getLastErrString();
                return Error;
            }

            std::vector<char> sendBuffer;
            Error recvRv = callback.onRecv(i, buffer, recvRet, sendBuffer);
            if (Error::Ok != recvRv)
            {
                return recvRv;
            }
            Error sendRv = sendFd(i, sendBuffer);
            if (Error::Ok != sendRv)
            {
                return sendRv;
            }
        } while (true);
        return Error::Ok;
    }

    Error sendFd(int i, std::vector<char> &sendBuffer)
    {
        int sendRet = send(i, sendBuffer.data(), static_cast<int>(sendBuffer.size()), 0);
        if (WSAEWOULDBLOCK == WSAGetLastError())
        {
            return Error::Ok;
        }
        if (SOCKET_ERROR == sendRet)
        {
            Error Error;
            Error._type = Error::Send;
            Error._param = WSAGetLastError();
            Error._detail = getLastErrString();
            return Error;
        }
        return Error::Ok;
    }

    void closeFd(int fd, ListenSocketCallback &callback)
    {
        callback.onClose(fd);
        closesocket(fd);
        FD_CLR(fd, &_masterSet);
        if (fd == _maxFd)
        {
            while (false == FD_ISSET(_maxFd, &_masterSet))
            {
                _maxFd -= 1;
            }
        }
    }

  private:
    SocketHandle _fd;
    SocketHandle _maxFd;
    FD_SET _masterSet;
    struct timeval _timeout;
};
#else
class ListenSocket
{
  public:
    ListenSocket() : _fd(0), _maxFd(0){};

    Error init(int port)
    {
        FD_ZERO(&_masterSet);
        _timeout.tv_sec = 0;
        _timeout.tv_usec = 1000;

        Error error;
        int on = 1;
        struct sockaddr_in6 addr;

        _fd = socket(AF_INET6, SOCK_STREAM, 0);
        if (_fd < 0)
        {
            error.code = ErrorCode::SockerError;
            error.reason = strerror(errno);
            return error;
        }

        if (setsockopt(_fd, SOL_SOCKET, SO_REUSEADDR, (char *)&on, sizeof(on)) < 0)
        {
            error.code = ErrorCode::SockerError;
            error.reason = strerror(errno);
            destroy();
            return error;
        }
        if (ioctl(_fd, FIONBIO, (char *)&on) < 0)
        {
            error.code = ErrorCode::SockerError;
            error.reason = strerror(errno);
            destroy();
            return error;
        }

        memset(&addr, 0, sizeof(addr));
        addr.sin6_family = AF_INET6;
        memcpy(&addr.sin6_addr, &in6addr_any, sizeof(in6addr_any));
        addr.sin6_port = htons(port);
        if (bind(_fd, (struct sockaddr *)&addr, sizeof(addr)) < 0)
        {
            error.code = ErrorCode::SockerError;
            error.reason = strerror(errno);
            destroy();
            return error;
        }

        if (listen(_fd, 32) < 0)
        {
            error.code = ErrorCode::SockerError;
            error.reason = strerror(errno);
            destroy();
            return error;
        }

        _maxFd = _fd;

        FD_SET(_fd, &_masterSet);

        return error;
    }
    void destroy()
    {
        for (int i = 0; i <= _maxFd; ++i)
        {
            if (FD_ISSET(i, &_masterSet))
                close(i);
        }
        if (0 < _fd)
        {
            close(_fd);
        }
    }
    Error select(ListenSocketCallback &callback)
    {
        Error errorRet;
        fd_set workingSet;
        int onFdCount = 0;

        memcpy(&workingSet, &_masterSet, sizeof(_masterSet));

        int selectRet = ::select(_maxFd + 1, &workingSet, NULL, NULL, &_timeout);
        if (selectRet < 0)
        {
            if (EINTR == errno)
            {
                errorRet.code = ErrorCode::SockerError;
                errorRet.reason = "select interuppted";
                return errorRet;
            }
            errorRet.code = ErrorCode::SockerError;
            errorRet.reason = strerror(errno);
            return errorRet;
        }

        if (selectRet == 0)
        {
            errorRet.reason = "select() timed out";
            return errorRet;
        }

        onFdCount = selectRet;
        for (int i = 0; i <= _maxFd && onFdCount > 0; ++i)
        {
            if (FD_ISSET(i, &workingSet))
            {
                onFdCount -= 1;
                if (i != _fd)
                {
                    Error readRv = readFd(i, callback);
                    if (ErrorCode::None != readRv.code)
                    {
                        return readRv;
                    }
                }
            }
        }
        if (FD_ISSET(_fd, &workingSet))
        {
            Error acceptRv = acceptFd(callback);
            if (ErrorCode::None != acceptRv.code)
            {
                return acceptRv;
            }
        }
        return errorRet;
    }

    Error acceptFd(ListenSocketCallback &callback)
    {
        int newFd = 0;
        Error errorRet;
        do
        {
            newFd = accept(_fd, NULL, NULL);
            if (EWOULDBLOCK == errno)
            {
                break;
            }
            if (newFd < 0)
            {
                errorRet.code = ErrorCode::SockerError;
                errorRet.reason = strerror(errno);
                return errorRet;
            }
            Error acceptRv = callback.OnAccept(newFd);
            if (ErrorCode::None != acceptRv.code)
            {
                return acceptRv;
            }
            FD_SET(newFd, &_masterSet);
            if (newFd > _maxFd)
            {
                _maxFd = newFd;
            }

        } while (newFd != -1);

        return errorRet;
    }

    Error readFd(int i, ListenSocketCallback &callback)
    {
        unsigned char buffer[65535];
        Error errorRet;
        do
        {
            long recvRet = recv(i, buffer, sizeof(buffer), 0);
            if (EWOULDBLOCK == errno)
            {
                break;
            }
            if (recvRet < 0)
            {
                errorRet.code = ErrorCode::SockerError;
                errorRet.reason = strerror(errno);
                return errorRet;
            }

            if (recvRet == 0)
            {
                callback.OnClose(i);
                close(i);
                FD_CLR(i, &_masterSet);
                if (i == _maxFd)
                {
                    while (false == FD_ISSET(_maxFd, &_masterSet))
                    {
                        _maxFd -= 1;
                    }
                }
                return errorRet;
            }
            std::vector<char> sendBuffer;
            Error recvRv = callback.OnRecv(i, buffer, recvRet, sendBuffer);
            if (ErrorCode::None != recvRv.code)
            {
                return recvRv;
            }
            Error sendRv = sendFd(i, sendBuffer);
            if (ErrorCode::None != sendRv.code)
            {
                return sendRv;
            }

        } while (true);

        return errorRet;
    }

    Error sendFd(int i, std::vector<char> &sendBuffer)
    {
        long sendRet = send(i, sendBuffer.data(), sendBuffer.size(), 0);
        if (EWOULDBLOCK == errno)
        {
            return Error();
        }
        if (sendRet < 0)
        {
            Error errorRet;
            errorRet.code = ErrorCode::SockerError;
            errorRet.reason = strerror(errno);
            return errorRet;
        }
        return Error();
    }

  private:
    SocketHandle _fd;
    SocketHandle _maxFd;
    fd_set _masterSet;
    struct timeval _timeout;
};
#endif // defined(_WIN32 )

} // namespace Internal
} // namespace Gamium

#endif // GAMIUM_LISTEN_SOCKET_H
