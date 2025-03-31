### Setting up MinIO Server on Your Local Repo:

1. **Download MinIO**:
   - **macOS**:
     ```bash
     curl -O https://dl.min.io/server/minio/release/darwin-amd64/minio
     chmod +x minio
     ```
   - **Windows**:
     Download the MinIO executable from [MinIO Downloads](https://min.io/download) and place it in a directory included in your system's `PATH`.

2. **Set Up the Local Storage Directory**:
   - Create a directory in the project root for MinIO to store files:
     ```bash
     mkdir local_storage
     ```

3. **Run the MinIO Server**:
   - **macOS**:
     ```bash
     ./minio server local_storage
     ```
   - **Windows**:
     ```cmd
     minio.exe server local_storage
     ```

4. **Access the MinIO Console**:
   - Open your browser and navigate to:
     ```
     http://localhost:9000
     ```
   - Use the following credentials to log in:
     - **Username**: `minioadmin`
     - **Password**: `minioadmin`

5. **Create a Bucket**:
   - After logging into the MinIO console, create a bucket with the name:
     ```
     dev-bucket
     ```
    - Make the bucket public.

6. **Upload the avatar images to the S3 bucket:**
    ```
    python manage.py upload_images
    ```

7. **Go to MinIO admin panel and make sure the images are there.**
---

### Important Notes:
- Before running the application, ensure the bucket `dev-bucket` exists in MinIO.
- The MinIO server must be running for the application to function properly.

---

### Accessing MinIO Panel:
- URL: [http://localhost:9000](http://localhost:9000)
- **Username**: `minioadmin`
- **Password**: `minioadmin`
