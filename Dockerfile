# Multi-stage build for Silain application
FROM node:16-alpine AS frontend-build

# Set working directory for frontend build
WORKDIR /app/frontend

# Copy frontend package files
COPY Frontend/package*.json ./

# Install frontend dependencies
RUN npm ci --only=production

# Copy frontend source code
COPY Frontend/ ./

# Build the React application
RUN npm run build

# Backend build stage
FROM node:16-alpine AS backend-build

# Set working directory for backend
WORKDIR /app/backend

# Copy backend package files
COPY Backend/package*.json ./

# Install backend dependencies
RUN npm ci --only=production

# Copy backend source code
COPY Backend/ ./

# Production stage with nginx
FROM nginx:alpine

# Install Node.js in the nginx container
RUN apk add --no-cache nodejs npm

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/

# Copy built frontend files to nginx html directory
COPY --from=frontend-build /app/frontend/build /usr/share/nginx/html

# Copy backend files
COPY --from=backend-build /app/backend /app/backend

# Create a startup script
RUN echo '#!/bin/sh' > /start.sh && \
    echo 'cd /app/backend && node index.js &' >> /start.sh && \
    echo 'nginx -g "daemon off;"' >> /start.sh && \
    chmod +x /start.sh

# Expose ports
EXPOSE 80 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Start both nginx and node.js backend
CMD ["/start.sh"]
