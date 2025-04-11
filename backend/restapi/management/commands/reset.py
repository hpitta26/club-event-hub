import os
import sys
import glob
import django
from django.core import management
from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth import get_user_model

# CAN RUN (Mac and Windows)
# python manage.py reset_and_start

DB_FILE = "../../../db.sqlite3"
MIGRATIONS_DIR = "../../migrations/"
MIGRATION_FILES = glob.glob(os.path.join(MIGRATIONS_DIR, '0*.*'))

def delete_file(file_path):
    if os.path.exists(file_path):
        os.remove(file_path)
        print(f"Deleted: {file_path}")

class Command(BaseCommand):
    help = 'Resets the database, creates migrations, migrates, and creates a super user for administrative purposes'

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING('*** THIS SCRIPT WILL REMOVE ALL THE DATA IN YOUR db.sqlite3 FILE ***'))
        self.stdout.write(self.style.WARNING('*** Are you sure you would like to continue? (Y/N) ***'))
        use_default = input().strip().lower()
        if use_default != 'y':
            return

        BASE_DIR = os.path.dirname(os.path.abspath(__file__))
        DB_FILE = os.path.join(BASE_DIR, "../../../db.sqlite3")
        MIGRATIONS_DIR = os.path.join(BASE_DIR, "../../migrations/")
        MIGRATION_FILES = glob.glob(os.path.join(MIGRATIONS_DIR, '0*.*'))

        print("Deleting database file...")
        delete_file(DB_FILE)

        print("Deleting migration files...")
        for migration in MIGRATION_FILES:
            delete_file(migration)

        use_default = input("Would you like to use the default admin account? (Y/N) ").strip().lower()
        if use_default == 'y':
            email, password = "admin@admin.com", "password"
        else:
            email = input("Enter the Admin Email: ").strip()
            password = input("Enter the Admin Password: ").strip()

        management.call_command("makemigrations")
        management.call_command("migrate")
        management.call_command("create_groups")
        management.call_command("create_super_user", email, password)
        management.call_command("populate")
        management.call_command("populate_random_data")
        
        self.stdout.write(self.style.SUCCESS('Successfully ran RESET command'))