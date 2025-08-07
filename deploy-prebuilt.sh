#!/bin/bash
# Deploy script for pre-built application

echo "🚀 Starting pre-built deployment..."

# Step 1: Backup original .dockerignore
if [ -f ".dockerignore" ]; then
    echo "📋 Backing up original .dockerignore..."
    cp .dockerignore .dockerignore.backup
fi

# Step 2: Use the prebuilt-specific .dockerignore
echo "🔧 Using prebuilt .dockerignore..."
cp .dockerignore.prebuilt .dockerignore

# Step 3: Build and deploy
echo "🏗️  Building and starting containers..."
docker compose -f docker-compose.prebuilt.yml up -d --build

# Step 4: Restore original .dockerignore
echo "🔄 Restoring original .dockerignore..."
if [ -f ".dockerignore.backup" ]; then
    mv .dockerignore.backup .dockerignore
else
    rm .dockerignore
fi

echo "✅ Deployment complete!"
echo "🌐 Application should be available at http://localhost:3000"

# Show container status
echo ""
echo "📊 Container Status:"
docker compose -f docker-compose.prebuilt.yml ps
