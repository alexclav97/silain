#!/bin/bash

echo "🧹 Cleaning up unnecessary files for pre-built deployment..."

# Remove old deployment files
echo "Removing old Docker files..."
rm -f Dockerfile docker-compose.yml

# Remove optimization scripts that are not needed
echo "Removing unused scripts..."
rm -f build-optimized.sh enable-swap.sh

# Clean up any build artifacts
echo "Cleaning build artifacts..."
rm -rf Frontend/node_modules/.cache
rm -rf Backend/node_modules/.cache

# Remove development logs
echo "Removing logs..."
rm -f *.log
rm -f Backend/*.log
rm -f Frontend/*.log

# List remaining deployment files
echo ""
echo "✅ Cleanup complete! Remaining deployment files:"
echo "📋 Core deployment files:"
ls -la Dockerfile.prebuilt docker-compose.prebuilt.yml deploy-prebuilt.sh init-db.sh nginx.conf .dockerignore.prebuilt 2>/dev/null || echo "Some files may not exist yet"

echo ""
echo "📋 Build scripts:"
ls -la build-frontend.sh 2>/dev/null || echo "build-frontend.sh not found"

echo ""
echo "📋 Documentation:"
ls -la DEPLOYMENT.md README.md 2>/dev/null || echo "Documentation files may not exist"

echo ""
echo "🎯 Ready for deployment!"
echo "   Local: Run './build-frontend.sh' then './deploy-prebuilt.sh'"
echo "   Server: Transfer files and run './deploy-prebuilt.sh'"
