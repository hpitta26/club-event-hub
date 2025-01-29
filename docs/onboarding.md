# 🚀 Club Event Hub - Project Onboarding Guide

Welcome to the **Club Event Hub** project! This guide will help you quickly set up your development environment and start contributing.

---

## **1️⃣ Prerequisites**
Before you begin, make sure you have the following installed on your system:

### **🔹 Required Tools**
- **Docker Desktop** ([Download Here](https://www.docker.com/products/docker-desktop))
- **Git** ([Download Here](https://git-scm.com/downloads))
- **VSCode (or your preferred IDE)** ([Download Here](https://code.visualstudio.com/))

### **🔹 Optional (for local testing)**
- **Python 3.10+** ([Download Here](https://www.python.org/downloads/)) - If running the backend without Docker
- **Node.js 18+** ([Download Here](https://nodejs.org/)) - If running the frontend without Docker
- **PostgreSQL** ([Download Here](https://www.postgresql.org/download/)) - If using a local database

---

## **2️⃣ Cloning the Repository**
1. Open a terminal and navigate to your preferred project directory.
2. Clone the repository:
```bash
git clone https://github.com/hpitta26/club-event-hub.git

cd club-event-hub
```
---

## **3️⃣ Setting Up Environment Variables**
We use .env files to store configuration settings.
Copy and rename the example files.

```bash
cd backend

cp .env.example .env # Copy to local .env

# DJANGO_SECRET_KEY=your-secret-key
# 1) Go to settings.py
# 2) SECRET_KEY copy this value to DJANGO_SECRET_KEY

# Redundant now but will be important in production
```
```bash
cd frontend

cp .env.example .env

# Leave as is for now
```

---

## **4️⃣ Setting Up the Project**
🔹 Start the Full Stack Application
Run the following command from the project root:
```bash
# Requires .env files configured first
docker-compose up --build
```
✅ This will:

1. Start the Django backend (http://localhost:8000)
2. Start the React frontend (http://localhost:5173)
3. Start the PostgreSQL database (later)

🔄 Restarting the App:
```bash
docker-compose down # Stop the containers
docker-compose up --build # Rebuild
```

---

## **Additional**

🔹 Backend Only (Django)

```bash
# Enter the Backend Docker container
docker exec -it django_backend bash

# Make DB migrations
python manage.py makemigrations
python manage.py migrate

# Create superuse for Django Admin Panel
# http://localhost:8000/admin/
python manage.py createsuperuser 
```

🔹 Frontend Only (React)

```bash
cd frontend
npm run dev
```

🔹 Docker
```bash
docker-compose up --build # Start containers
docker-compose down # Stop containers

# Since the containers run on your desktop Docker App you must do this to stop their execution.

docker-compose restart frontend
docker-compose restart backend
# Restart both
docker-compose restart frontend backend

docker ps # Check running containers

docker --version
docker-compose --version
```

---

## **5️⃣ Working with Git**
🔹 Pull the latest changes before working
```bash
git pull origin main
```
🔹 Create a new feature branch
```bash
git checkout -b feature-branch-name
# Can also be done on VSCode bottom left
```
🔹 Commit and push changes
```bash
git add .
git commit -m "Added feature X"
git push origin feature-branch-name
```
🔹 Open a pull request (PR) on GitHub
- Once pushed, go to GitHub → Open a Pull Request (PR).
- Request a code review from project leader.