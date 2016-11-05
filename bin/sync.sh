#!/bin/bash
# Syncronizes project on vagrant with host

rsync -avh --include=".babelrc" --include=".gitignore" --exclude="node_modules" --exclude=".*" --exclude="dist" --delete /vagrant/ /home/vagrant