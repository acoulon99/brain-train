#!/bin/bash
# Syncronizes project on vagrant with host

PROJECT_HOME=/home/vagrant
SYNCED_FOLDER=/vagrant
BIN=$PROJECT_HOME/bin

rsync -avh --include=".gitignore" --exclude="node_modules" --exclude=".*" --delete "$SYNCED_FOLDER"/ "$PROJECT_HOME"
chmod u+x $BIN/*.sh # make scripts executable for Vagrant user