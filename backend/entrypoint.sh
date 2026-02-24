#!/bin/sh

# backend/entrypoint.sh

echo "Waiting for postgres..."

while ! nc -z db 5432; do
  sleep 0.1
done

echo "PostgreSQL started"

# Run migrations
python manage.py migrate

# Start server
exec "$@"