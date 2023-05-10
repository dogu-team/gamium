
FROM node:16.16-bullseye

WORKDIR /app/flatc

RUN curl --location --output flatc.zip https://github.com/google/flatbuffers/releases/download/v22.10.26/Linux.flatc.binary.clang++-12.zip \
    && unzip flatc.zip -d . \
    && rm -f flatc.zip 

RUN echo 'export PATH=/app/flatc:$PATH' >> $HOME/.bashrc
    
WORKDIR /app/host


