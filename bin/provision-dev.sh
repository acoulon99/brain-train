#!/bin/bash
# Development Environment Provisioning Script

set -e # Exit script immediately on first error.

echo "Updating..."
sudo apt-get update

echo "Installing GIT..."
sudo apt-get install -y git libkrb5-dev 

echo "Installing Nodejs and NPM..."
curl --silent --location https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y build-essential g++ nodejs

echo "Installing PM2 server manager..."
sudo npm install pm2 -g

echo "rsyncing synced folder to vagrant user directory..."
rsync -avh --include=".babelrc" --include=".gitignore" --exclude="node_modules" --exclude=".*" --exclude="dist" --delete /vagrant/ /home/vagrant

echo "Installing dependencies..."
npm install

# add environment variables to .profile
echo "export PROJECT_HOME=/home/vagrant" >> /home/vagrant/.profile