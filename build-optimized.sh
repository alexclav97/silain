#!/bin/bash
# Build script with memory optimization
echo "Building with memory optimizations..."

# Option 1: Build with reduced parallelism
docker-compose build --parallel 1

# Option 2: Build individual services
# docker-compose build postgres
# docker-compose build app
