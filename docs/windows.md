# 🚀 Additional Docs - For Windows Users

### **🔹 (Optional but Recommended)**
- **WSL2 (Windows Subsystem for Linux)**
- WSL2 allows you to run a Linux environment inside Windows.
- Docker runs more efficiently on WSL2 than in PowerShell.
- Avoids Windows path issues in Docker.

---

### **🔹 Without WSL2**

```bash
# Convert Windows-style paths (C:\Users\Name) to Linux-style paths (/c/Users/Name)
# Need to rerun everytime you start a new terminal session
$Env:COMPOSE_CONVERT_WINDOWS_PATHS=1

# Then
docker-compose up --build
```

---

### **🔹 (Optional) WSL2 Setup for Windows Users**
- Would recommend you doing this setup from google with a tutorial because I do not have to Windows machine and cannot test this.

1️⃣ - Enable WSL2
```bash
wsl --install
```
🔄 Restart your computer.

2️⃣ - Set WSL2 as the Default Version
```bash
wsl --set-default-version 2
```

3️⃣ - Install Ubuntu (Recommended)
```bash
wsl --install -d Ubuntu
```
🔄 Restart your computer and open Ubuntu from the Start Menu.

4️⃣ - Run Docker with WSL2
```bash
docker-compose up --build
```

---

### **🔹 Copy Commands**
```bash
cd backend
Copy-Item .env.example .env

cd frontend
Copy-Item .env.example .env
```

