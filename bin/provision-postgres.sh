sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'
wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add -
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib

# Create postgres development/test db and user
sudo -u postgres psql -U postgres -c "CREATE DATABASE dev;"
sudo -u postgres psql -U postgres -c "CREATE DATABASE test;"
sudo -u postgres psql -U postgres -c "CREATE USER vagrant WITH PASSWORD 'vagrant';"