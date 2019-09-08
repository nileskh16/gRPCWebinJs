#!/usr/bin/bash

docker stop envoy-proxy

docker container rm -f envoy-proxy

docker image rm -f grpc-proxy

docker build -t grpc-proxy .

docker run -d -p 9090:9090 -p 9901:9901 --name envoy-proxy grpc-proxy