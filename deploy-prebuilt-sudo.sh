#!/bin/bash

echo "🚀 Starting pre-built deployment with sudo..."

# Check if user is in docker group
if groups $USER | grep -q '\bdocker\b'; then
    DOCKER_CMD="docker"
    DOCKER_COMPOSE_CMD="docker compose"
else
    echo "🔐 User not in docker group, using sudo..."
    DOCKER_CMD="sudo docker"
    DOCKER_COMPOSE_CMD="sudo docker compose"
fi

# Backup original .dockerignore
echo "📋 Backing up original .dockerignore..."
if [ -f .dockerignore ]; then
    cp .dockerignore .dockerignore.backup
fi

# Use prebuilt .dockerignore
echo "🔧 Using prebuilt .dockerignore..."
if [ -f .dockerignore.prebuilt ]; then
    cp .dockerignore.prebuilt .dockerignore
fi

# Build and start containers
echo "🏗️  Building and starting containers..."
$DOCKER_COMPOSE_CMD -f docker-compose.prebuilt.yml up -d --build

# Wait a moment for containers to start
sleep 5

# Restore original .dockerignore
echo "🔄 Restoring original .dockerignore..."
if [ -f .dockerignore.backup ]; then
    mv .dockerignore.backup .dockerignore
fi

echo "✅ Deployment complete!"
echo "🌐 Application should be available at http://localhost:3000"
echo ""
echo "📊 Container Status:"
$DOCKER_COMPOSE_CMD -f docker-compose.prebuilt.yml ps
