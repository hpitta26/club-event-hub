import os
from django.core.management.base import BaseCommand
from django.conf import settings
from storages.backends.s3boto3 import S3Boto3Storage

class Command(BaseCommand):
    help = "Uploads the default profile image and avatars to the MinIO bucket"

    def handle(self, *args, **kwargs):
        dummy_images_path = os.path.join(settings.BASE_DIR, "dummy_images")

        if not os.path.exists(dummy_images_path):
            self.stdout.write(self.style.ERROR(f"Dummy images folder not found at {dummy_images_path}"))
            return

        try:
            storage = S3Boto3Storage()
            for image_name in os.listdir(dummy_images_path):
                image_path = os.path.join(dummy_images_path, image_name)

                if os.path.isfile(image_path):
                    with open(image_path, "rb") as image_file:
                        storage.save(image_name, image_file)
                    self.stdout.write(self.style.SUCCESS(f"Uploaded {image_name} successfully!"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error uploading images: {e}"))