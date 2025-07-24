#!/bin/bash
# Create and enable swap for low memory builds
# Run this script before building Docker containers

# Check if swap already exists
if ! swapon --show | grep -q '/swapfile'; then
    echo "Creating 2GB swap file..."
    sudo fallocate -l 2G /swapfile
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    
    # Make swap permanent
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
    
    echo "Swap enabled successfully!"
    free -h
else
    echo "Swap already exists"
    free -h
fi
