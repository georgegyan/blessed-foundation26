FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/app

WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc libpq-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Create necessary directories
RUN mkdir -p /app/staticfiles /app/media /app/logs

# Create and run as non-root user
RUN adduser --disabled-password --gecos '' appuser && \
    chown -R appuser:appuser /app
USER appuser

# Collect static files
RUN python manage.py collectstatic --noinput

# Run gunicorn with production settings
CMD ["sh", "-c", "python manage.py migrate && \
                  python manage.py collectstatic --noinput && \
                  gunicorn --bind 0.0.0.0:8000 \
                          --workers 3 \
                          --threads 2 \
                          --worker-class sync \
                          --timeout 30 \
                          --access-logfile - \
                          --error-logfile - \
                          core.wsgi:application"]