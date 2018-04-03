#!/bin/bash

export PORT=5107
export MIX_ENV=prod
export GIT_PATH=/home/tasktracker3/src/tasktracker3

PWD=`pwd`
if [ $PWD != $GIT_PATH ]; then
	echo "Error: Must check out git repo to $GIT_PATH"
	echo "  Current directory is $PWD"
	exit 1
fi

if [ $USER != "tasktracker3" ]; then
	echo "Error: must run as user 'checkers'"
	echo "  Current user is $USER"
	exit 2
fi

mix deps.get
(cd assets && npm install)
(cd assets && ./node_modules/brunch/bin/brunch b -p)
mix phx.digest
mix release --env=prod

mkdir -p ~/www
mkdir -p ~/old

NOW=`date +%s`
if [ -d ~/www/tasktracker3 ]; then
	echo mv ~/www/tasktracker3 ~/old/$NOW
	mv ~/www/tasktracker3 ~/old/$NOW
fi

mkdir -p ~/www/tasktracker3
REL_TAR=~/src/tasktracker3/_build/prod/rel/tasktracker3/releases/0.0.1/tasktracker3.tar.gz
(cd ~/www/tasktracker3 && tar xzvf $REL_TAR)

crontab - <<CRONTAB
@reboot bash /home/tasktracker3/src/tasktracker3/start.sh
CRONTAB

#. start.sh
