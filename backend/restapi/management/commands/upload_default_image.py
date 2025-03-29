import os
from django.core.management.base import BaseCommand
from django.conf import settings
from storages.backends.s3boto3 import S3Boto3Storage

class Command(BaseCommand):
    help = "Uploads the default profile image to the MinIO bucket"

    def handle(self, *args, **kwargs):
        # Path to the default image in your project
        default_image_path = os.path.join(settings.BASE_DIR, "default-profile.png")

        # Check if the file exists
        if not os.path.exists(default_image_path):
            self.stdout.write(self.style.ERROR(f"Default image not found at {default_image_path}"))
            return

        # Upload the file to the bucket
        try:
            storage = S3Boto3Storage()
            with open(default_image_path, "rb") as image_file:
                storage.save("default-profile.png", image_file)

            self.stdout.write(self.style.SUCCESS("Default profile image uploaded successfully!"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error uploading default image: {e}"))