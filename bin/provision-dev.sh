#!/bin/bash
# Development Environment Provisioning Script

set -e # Exit script immediately on first error.

PROJECT_HOME=/home/vagrant
SYNCED_FOLDER=/vagrant
BIN=$PROJECT_HOME/bin

# Prep
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'
wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add -
curl --silent --location https://deb.nodesource.com/setup_6.x | sudo -E bash -

# Update and install
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib libpq-dev git libkrb5-dev build-essential g++ nodejs

# Create postgres development/test db and user
sudo -u postgres psql -U postgres -c "CREATE DATABASE dev;"
sudo -u postgres psql -U postgres -c "CREATE DATABASE test;"
sudo -u postgres psql -U postgres -c "CREATE USER vagrant WITH PASSWORD 'vagrant';"

# Node process manager
sudo npm install pm2 -g

# Pull in files from host
rsync -avh --include=".gitignore" --exclude="node_modules" --exclude=".*" --delete "$SYNCED_FOLDER"/ "$PROJECT_HOME"
chmod u+x $BIN/*.sh # make scripts executable for Vagrant user

# Install node dependencies
npm install

# Setting environment variables
echo "export PROJECT_HOME=$PROJECT_HOME" >> /home/vagrant/.profile
echo "export NODE_ENV=dev" >> /home/vagrant/.profile