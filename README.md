# brain-train
Management and collaboration platform for neural nets

## Development Environemnt Setup (Mac)

### Prerequesite
1. Install VirtualBox: https://www.virtualbox.org/wiki/Downloads
2. Install Vagrant: https://www.vagrantup.com/downloads.html

### Setup

1. Clone Repository
  ```
  git clone https://github.com/acoulon99/brain-train.git
  cd brain-train
  ```

2. Provision Virtal Environment
  ```
  vagrant up
  ```

3. Enter the Virtual Environment
  ```
  vagrant ssh
  ```

### Launch The Server

- Start Server
  ```
  npm run serve
  ```
  
- For API documentation visit 192.168.33.10:8080/documentation
  
### Other Useful Commands

- Sync code with local directory (pulls in code changes to the VM)
  ```
  ./bin/sync.sh
  ```
  
- Sync code and restart server
  ```
  ./bin/sync.sh && npm run serve
  ```
