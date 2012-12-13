#!/bin/bash

# This startup work with package.json - npm start
if [ 2 -gt $# ]; then
	echo 'usage: startup project_name main_script_path'
	exit -1
fi

if [ ! $NODE_ENV ]; then
	NODE_ENV=development
fi

Project=$1
MainScript=$2
AppName=$Project-$NODE_ENV.js

forever stop $AppName
cp $MainScript $AppName

mkdir -p log
mv log/forever.log log/oldForever.log
forever start -l `pwd`/log/forever.log $AppName
sleep 3
netstat -ntl
