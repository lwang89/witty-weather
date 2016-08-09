#!/bin/bash

NODE_VERSION=$(node --version | grep -o '[0-9]' | head -n1)

if [ $NODE_VERSION -ge 6 ]
  then node "$@"
  else node --harmony --harmony_destructuring "$@"
fi
