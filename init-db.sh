#!/bin/bash
set -e

echo "Starting database initialization..."

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
until pg_isready -h localhost -p 5432 -U "$POSTGRES_USER" -d "$POSTGRES_DB"
do
  echo "PostgreSQL is not ready yet, waiting..."
  sleep 2
done

echo "PostgreSQL is ready. Initializing database..."

# Enable PostGIS extension
echo "Enabling PostGIS extensions..."
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE EXTENSION IF NOT EXISTS postgis;
    CREATE EXTENSION IF NOT EXISTS postgis_topology;
    CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;
    CREATE EXTENSION IF NOT EXISTS postgis_tiger_geocoder;
    CREATE EXTENSION IF NOT EXISTS pg_trgm;
EOSQL

echo "PostGIS extensions enabled successfully."

# Check if the SQL file exists and execute it
if [ -f /docker-entrypoint-initdb.d/01-init.sql ]; then
    echo "Executing initial SQL script..."
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -f /docker-entrypoint-initdb.d/01-init.sql
    echo "Initial SQL script executed successfully."
else
    echo "Warning: Initial SQL script not found at /docker-entrypoint-initdb.d/01-init.sql"
fi

# Verify tables were created
echo "Verifying database tables..."
TABLE_COUNT=$(psql -t --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE';")
echo "Number of tables created: $TABLE_COUNT"

if [ "$TABLE_COUNT" -gt 1 ]; then
    echo "Database initialization completed successfully."
else
    echo "Warning: Database initialization may have failed. Only $TABLE_COUNT tables found."
fi
