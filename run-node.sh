#!/bin/bash

NODE_VERSION=$(node --version | sed 's/[^0-9]*//g')

if [ $NODE_VERSION -ge 600 ]
  then node "$@"
  else node --harmony --harmony_destructuring "$@"
fi
