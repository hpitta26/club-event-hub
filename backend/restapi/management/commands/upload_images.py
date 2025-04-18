import os
from django.core.management.base import BaseCommand
from django.conf import settings
from django.core.files.storage import default_storage as storage
from django.core.files.base import ContentFile
from storages.backends.s3boto3 import S3Boto3Storage

class Command(BaseCommand):
    help = "Uploads the default profile image and avatars to the MinIO bucket"

    def handle(self, *args, **kwargs):
        dummy_images_path = os.path.join(settings.BASE_DIR, "dummy_images")
        storage = S3Boto3Storage()
        s3 = storage.connection.meta.client
        bucket = storage.bucket_name
        if not os.path.exists(dummy_images_path):
            self.stdout.write(self.style.ERROR(f"Dummy images folder not found at {dummy_images_path}"))
            return

        try:
            print(f"Clearing all contents from bucket '{bucket}'...")
            paginator = s3.get_paginator('list_objects_v2')
            for page in paginator.paginate(Bucket=bucket):
                objects = page.get("Contents", [])
                if not objects:
                    continue
                delete_keys = {'Objects': [{'Key': obj['Key']} for obj in objects]}
                s3.delete_objects(Bucket=bucket, Delete=delete_keys)
                print(f"Deleted {len(delete_keys['Objects'])} objects.")

            for root, dirs, files in os.walk(dummy_images_path):
                for file_name in files:
                    file_path = os.path.join(root, file_name)

                    if os.path.isfile(file_path):
                        relative_path = os.path.relpath(file_path, dummy_images_path)
                        storage_path = os.path.join("default", relative_path)

                        with open(file_path, "rb") as f:
                            content = ContentFile(f.read())
                            storage.save(storage_path, content)

                        print(f"Uploaded {relative_path} successfully!")
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error uploading images: {e}"))