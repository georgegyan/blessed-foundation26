# deploy.sh - Deployment script for Blessed Foundation

echo "🚀 Starting deployment of Blessed Foundation..."

# Build and push Docker images
echo "📦 Building Docker images..."
docker-compose -f docker-compose.prod.yml build

# Run database migrations
echo "🗄️ Running database migrations..."
docker-compose -f docker-compose.prod.yml run --rm web python manage.py migrate

# Collect static files
echo "📁 Collecting static files..."
docker-compose -f docker-compose.prod.yml run --rm web python manage.py collectstatic --noinput

# Start all services
echo "🌟 Starting all services..."
docker-compose -f docker-compose.prod.yml up -d

# Show running containers
echo "✅ Deployment complete! Running containers:"
docker-compose -f docker-compose.prod.yml ps

echo "🌐 Application should be available at http://YOUR_SERVER_IP"