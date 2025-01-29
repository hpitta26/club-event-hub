# Use official Python image
FROM python:3.10

# Set working directory in the container
WORKDIR /app

# Copy and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the Django app
COPY . .

# Expose the port Gunicorn will run on
EXPOSE 8000

# Default command to start the Django backend
CMD ["gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:8000"]

