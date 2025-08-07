#!/bin/bash

echo "📦 Creating deployment package for low-end server..."

# Check if Frontend/build exists
if [ ! -d "Frontend/build" ]; then
    echo "❌ Frontend/build directory not found!"
    echo "🔧 Please run './build-frontend.sh' first to build React app"
    exit 1
fi

# Create deployment package
PACKAGE_NAME="silain-deployment-$(date +%Y%m%d-%H%M%S).tar.gz"

echo "📋 Including files:"
echo "   ✓ Dockerfile.prebuilt"
echo "   ✓ docker-compose.prebuilt.yml"
echo "   ✓ deploy-prebuilt.sh"
echo "   ✓ init-db.sh"
echo "   ✓ nginx.conf"
echo "   ✓ .dockerignore.prebuilt"
echo "   ✓ Frontend/build/ (pre-built React app)"
echo "   ✓ Backend/ (excluding node_modules)"
echo "   ✓ DEPLOYMENT.md"

tar -czf "$PACKAGE_NAME" \
  Dockerfile.prebuilt \
  docker-compose.prebuilt.yml \
  deploy-prebuilt.sh \
  init-db.sh \
  nginx.conf \
  .dockerignore.prebuilt \
  DEPLOYMENT.md \
  Frontend/build/ \
  Backend/ \
  --exclude=Backend/node_modules \
  --exclude=Backend/.env \
  --exclude=Backend/*.log \
  2>/dev/null

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment package created: $PACKAGE_NAME"
    echo "📊 Package size: $(du -h "$PACKAGE_NAME" | cut -f1)"
    echo ""
    echo "🚀 Transfer to your server:"
    echo "   scp $PACKAGE_NAME user@your-server:/path/to/deployment/"
    echo ""
    echo "📋 On your server, run:"
    echo "   tar -xzf $PACKAGE_NAME"
    echo "   cd silain/"
    echo "   chmod +x deploy-prebuilt.sh"
    echo "   ./deploy-prebuilt.sh"
else
    echo "❌ Failed to create deployment package"
    exit 1
fi
