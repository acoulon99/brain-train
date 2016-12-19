PROJECT_HOME=/home/vagrant
SYNCED_FOLDER=/vagrant
BIN=$PROJECT_HOME/bin
rsync -avh --include=".gitignore" --exclude="node_modules" --exclude=".*" --delete "$SYNCED_FOLDER"/ "$PROJECT_HOME"

# make scripts executable for Vagrant user
chmod u+x $BIN/*.sh 