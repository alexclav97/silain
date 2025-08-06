# Pre-Build Deployment Guide for Low-Resource Servers

This guide explains how to deploy the Silain app on servers with limited resources (like 1GB RAM) by building the React app locally and deploying only the optimized artifacts.

## Prerequisites

- Docker and Docker Compose installed on the deployment server
- Local development machine with Node.js 16+ and sufficient RAM (4GB+ recommended)
- Git repository access

## Local Build Process

### Step 1: Build React App Locally

Run the build script on your local machine (with sufficient resources):

```bash
# Make the script executable
chmod +x build-frontend.sh

# Run the build script
./build-frontend.sh
```

This script will:
- Install frontend dependencies
- Build the React app with memory optimization
- Verify the build was successful
- Report build size

### Step 2: Verify Build Output

After running the build script, you should have:
- `Frontend/build/` directory with compiled React app
- Build size information displayed in the terminal
- No error messages during the build process

## Server Deployment Process

### Step 3: Transfer Files to Server

Copy the following files to your deployment server:

```bash
# Essential files for deployment
scp -r Frontend/build/ user@server:/path/to/silain/Frontend/
scp Backend/ user@server:/path/to/silain/Backend/
scp Dockerfile.prebuilt user@server:/path/to/silain/
scp docker-compose.prebuilt.yml user@server:/path/to/silain/
scp nginx.conf user@server:/path/to/silain/
```

Or clone the repository and ensure `Frontend/build/` is present:

```bash
git clone your-repo-url
cd silain
# Copy your local build to Frontend/build/
```

### Step 4: Deploy on Server

On the deployment server:

```bash
# Navigate to the project directory
cd /path/to/silain

# Deploy using the pre-built configuration
docker-compose -f docker-compose.prebuilt.yml up -d

# Monitor the deployment
docker-compose -f docker-compose.prebuilt.yml logs -f
```

### Step 5: Verify Deployment

1. Check if containers are running:
```bash
docker-compose -f docker-compose.prebuilt.yml ps
```

2. Test the application:
```bash
# Test frontend
curl http://localhost:3000

# Test API
curl http://localhost:3000/api/
```

3. Access the application in your browser at `http://your-server-ip:3000`

## Troubleshooting

### Build Issues on Local Machine

If the build fails locally:
1. Ensure you have sufficient RAM (4GB+ recommended)
2. Close other applications to free up memory
3. Try increasing the heap size in `build-frontend.sh`:
   ```bash
   export NODE_OPTIONS="--max-old-space-size=6144"  # Increase to 6GB
   ```

### Deployment Issues on Server

If deployment fails:
1. Check if `Frontend/build/` directory exists and contains files
2. Verify Docker has enough disk space
3. Check container logs:
   ```bash
   docker-compose -f docker-compose.prebuilt.yml logs app
   docker-compose -f docker-compose.prebuilt.yml logs db
   ```

### Database Issues

If database connection fails:
1. Wait for database initialization (may take 1-2 minutes)
2. Check database logs:
   ```bash
   docker-compose -f docker-compose.prebuilt.yml logs db
   ```
3. Verify the database is healthy:
   ```bash
   docker-compose -f docker-compose.prebuilt.yml exec db pg_isready -U postgres -d silain
   ```

## Resource Requirements

### Local Machine (for building)
- RAM: 4GB+ recommended
- Disk: 2GB+ free space
- Node.js: Version 16+

### Deployment Server
- RAM: 512MB minimum (1GB recommended)
- Disk: 1GB+ free space
- Docker: Latest stable version

## Updating the Application

To update the application:

1. Build locally with new changes:
   ```bash
   ./build-frontend.sh
   ```

2. Transfer updated files to server:
   ```bash
   # Transfer new build files
   scp -r Frontend/build/ user@server:/path/to/silain/Frontend/
   
   # Transfer any backend changes
   scp -r Backend/ user@server:/path/to/silain/Backend/
   ```

3. Rebuild and restart on server:
   ```bash
   docker-compose -f docker-compose.prebuilt.yml down
   docker-compose -f docker-compose.prebuilt.yml build --no-cache app
   docker-compose -f docker-compose.prebuilt.yml up -d
   ```

## Performance Benefits

This pre-build approach provides:
- **Reduced server RAM usage**: No React build process on deployment server
- **Faster deployments**: No npm install or build steps during deployment
- **Consistent builds**: Build environment controlled on local machine
- **Scalability**: Can deploy to multiple low-resource servers from same build

## Security Considerations

- Use environment variables for sensitive configuration
- Consider using Docker secrets for production passwords
- Implement proper firewall rules for port 3000
- Use HTTPS in production with a reverse proxy like Cloudflare or Let's Encrypt
