#!/bin/bash
# Syncronizes project on vagrant with host
rsync -avh --include=".gitignore" --exclude="node_modules" --exclude=".*" --delete /vagrant/ /home/vagrant