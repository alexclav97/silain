#!/bin/bash
# Build React app locally before Docker deployment
echo "Building React app locally..."

# Navigate to Frontend directory
cd Frontend

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Build the React app
echo "Building React app..."
NODE_OPTIONS="--max-old-space-size=4096 --openssl-legacy-provider" npm run build

# Check if build was successful
if [ -d "build" ]; then
    echo "✅ React build completed successfully!"
    echo "Build directory created at: $(pwd)/build"
    
    # Show build size
    echo "Build size:"
    du -sh build/
else
    echo "❌ Build failed!"
    exit 1
fi

cd ..
echo "Ready for Docker deployment!"
