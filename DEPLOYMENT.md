# Silain - Pre-built Deployment Guide

This guide provides instructions for deploying the Silain application using a memory-optimized approach suitable for low-resource servers (1GB RAM).

## Overview

The pre-built deployment strategy builds React assets locally (where you have sufficient memory) and then deploys a lightweight Docker container that serves pre-built assets.

## Prerequisites

### Local Machine (for building):
- Node.js 16+
- npm
- Docker & Docker Compose
- At least 4GB RAM for React build

### Target Server (low-resource):
- Docker & Docker Compose
- Minimum 1GB RAM
- Available ports: 3000 (app) and 5432 (database)

## Files Structure

```
silain/
├── Dockerfile.prebuilt          # Optimized Docker image
├── docker-compose.prebuilt.yml  # Container orchestration
├── build-frontend.sh            # Local React build script
├── deploy-prebuilt.sh           # Automated deployment
├── init-db.sh                   # Database initialization
├── nginx.conf                   # Nginx configuration
├── .dockerignore.prebuilt       # Build context optimization
└── Backend/db/silain.sql        # Database dump
```

## Local Machine Commands

### 1. Build React Frontend Locally
```bash
# Make build script executable
chmod +x build-frontend.sh

# Build React app with memory optimization
./build-frontend.sh
```

### 2. Test Deployment Locally (Optional)
```bash
# Make deployment script executable
chmod +x deploy-prebuilt.sh

# Deploy locally to test
./deploy-prebuilt.sh

# Test the application
curl http://localhost:3000/api/getfilters/

# Stop local test
docker compose -f docker-compose.prebuilt.yml down -v
```

### 3. Prepare for Server Transfer
```bash
# Create deployment package
tar -czf silain-deployment.tar.gz \
  Dockerfile.prebuilt \
  docker-compose.prebuilt.yml \
  deploy-prebuilt.sh \
  init-db.sh \
  nginx.conf \
  .dockerignore.prebuilt \
  Frontend/build/ \
  Backend/ \
  --exclude=Backend/node_modules

# Transfer to server
scp silain-deployment.tar.gz user@your-server:/path/to/deployment/
```

## Low-End Server Commands

### 1. Setup and Extract
```bash
# Extract deployment package
tar -xzf silain-deployment.tar.gz
cd silain/

# Make scripts executable
chmod +x deploy-prebuilt.sh build-frontend.sh
```

### 2. Deploy Application
```bash
# Deploy the application
./deploy-prebuilt.sh
```

### 3. Verify Deployment
```bash
# Check container status
docker compose -f docker-compose.prebuilt.yml ps

# Test API endpoint
curl http://localhost:3000/api/getfilters/

# Check logs if needed
docker logs silain-app-prebuilt
docker logs silain-postgres-prebuilt
```

### 4. Application Management
```bash
# Stop application
docker compose -f docker-compose.prebuilt.yml down

# Start application
docker compose -f docker-compose.prebuilt.yml up -d

# Restart application
docker compose -f docker-compose.prebuilt.yml restart

# View logs
docker compose -f docker-compose.prebuilt.yml logs -f

# Complete cleanup (removes data)
docker compose -f docker-compose.prebuilt.yml down -v
```

## Troubleshooting

### Database Connection Issues
```bash
# Restart PostgreSQL container
docker restart silain-postgres-prebuilt

# Check database is ready
docker exec silain-postgres-prebuilt pg_isready -U postgres -d silain

# Check if data exists
docker exec silain-postgres-prebuilt psql -U postgres -d silain -c "SELECT COUNT(*) FROM categoria;"

# Manually import SQL if data is missing (common after redeployment)
docker exec silain-postgres-prebuilt psql -U postgres -d silain -f /docker-entrypoint-initdb.d/silain.sql
```

### Memory Issues During Build
```bash
# If build fails on server, use local build
./build-frontend.sh  # Run this on local machine only
```

### Check Application Health
```bash
# Test frontend
curl http://localhost:3000/

# Test API
curl http://localhost:3000/api/getfilters/

# Test database connection
docker exec silain-postgres-prebuilt psql -U postgres -d silain -c "SELECT COUNT(*) FROM categoria;"
```

## Application URLs

- **Frontend**: http://localhost:3000
- **API Base**: http://localhost:3000/api/
- **Database**: localhost:5432 (internal to containers)

## Environment Variables

The following environment variables are configured in `docker-compose.prebuilt.yml`:
- `DB_HOST=db`
- `DB_PORT=5432`
- `DB_NAME=silain`
- `DB_USER=postgres`
- `DB_PASSWORD=password`

## Security Considerations

For production deployment:
1. Change default database password
2. Use environment files for secrets
3. Configure proper firewall rules
4. Enable HTTPS with SSL certificates
5. Regular database backups

## Support

If you encounter issues:
1. Check container logs
2. Verify database connectivity
3. Ensure ports are available
4. Check system resources
