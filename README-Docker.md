# Silain Application - Docker Deployment

This project contains a full-stack application with a React frontend, Express.js backend, and PostgreSQL database with PostGIS extension.

## Architecture

- **Frontend**: React application served by Nginx
- **Backend**: Express.js API server
- **Database**: PostgreSQL 13 with PostGIS extension
- **Web Server**: Nginx (reverse proxy and static file serving)

## Prerequisites

- Docker
- Docker Compose

## Quick Start

1. **Clone the repository** (if not already done)
   ```bash
   cd /home/alex/repositories/silain
   ```

2. **Build and start the services**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3000/api/
   - Direct backend access: http://localhost:8000
   - Database: localhost:5432

## Configuration

### Environment Variables

Copy the example environment file and modify as needed:
```bash
cp .env.example .env
```

Key variables:
- `DB_HOST`: Database host (default: postgres)
- `DB_USER`: Database username (default: silain_user)
- `DB_PASSWORD`: Database password (default: silain_password)
- `DB_NAME`: Database name (default: silain)

### Database Initialization

The database will be automatically initialized with:
- PostGIS and related extensions
- Your existing schema from `Backend/db/silain.sql`

## Development

### Building individual services

**Frontend only:**
```bash
cd Frontend
npm install
npm run build
```

**Backend only:**
```bash
cd Backend
npm install
npm start
```

### Running in development mode

For development, you might want to run services separately:

1. Start database only:
   ```bash
   docker-compose up postgres
   ```

2. Run frontend and backend locally with your preferred development setup

## Production Deployment

### Security Considerations

1. Change default passwords in `.env`
2. Use secure JWT secrets
3. Configure proper CORS origins
4. Use HTTPS in production (add SSL certificates to nginx config)
5. Set up proper firewall rules

### Scaling

- The application container can be scaled horizontally
- Consider using a managed PostgreSQL service for production
- Implement proper logging and monitoring

### Backup

Database backups can be created using:
```bash
docker-compose exec postgres pg_dump -U silain_user silain > backup.sql
```

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 80, 8000, and 5432 are not in use
2. **Permission issues**: Ensure the init-db.sh script is executable
3. **Database connection**: Check that the backend waits for the database to be ready

### Logs

View logs for debugging:
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs silain-app
docker-compose logs postgres
```

### Health Checks

The setup includes health checks for:
- PostgreSQL database
- Application container

Check service health:
```bash
docker-compose ps
```

## File Structure

```
/
├── Dockerfile              # Multi-stage build for the application
├── docker-compose.yml      # Service orchestration
├── nginx.conf              # Nginx configuration
├── init-db.sh             # Database initialization script
├── .dockerignore          # Docker ignore file
├── .env.example           # Environment variables template
├── Frontend/              # React application
├── Backend/               # Express.js API
└── Backend/db/silain.sql  # Database schema
```
