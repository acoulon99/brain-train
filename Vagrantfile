# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"
PROJECT_NAME = "brain-train"
BASE_BOX = "ubuntu/trusty64"
PRIVATE_NETWORK = "192.168.33.10"
MEMORY = "1024"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  # Base Box
  config.vm.box = BASE_BOX
  config.vm.hostname = PROJECT_NAME

  # provision scripts
  config.vm.provision :shell, path: "./bin/provision-dev.sh", privileged: false

  # Create a private network, which allows host-only access to the machine
  config.vm.network "private_network", ip: PRIVATE_NETWORK

  # Enable SSH agent forwarding
  config.ssh.forward_agent = true

  # virtual box provider config  
  config.vm.provider "virtualbox" do |vb|
    vb.name = PROJECT_NAME

    # Use VBoxManage to customize the VM. For example to change memory:
    vb.customize ["modifyvm", :id, "--memory", MEMORY]
  end
end