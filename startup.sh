#!/bin/bash

AppName=inventory-collector-$NODE_ENV.js
forever stop $AppName

cp server.js $AppName
mkdir -p log
mv log/forever.log log/oldForever.log
forever start -l `pwd`/log/forever.log $AppName
sleep 3
netstat -ntl
