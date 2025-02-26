import os
import sys
import glob
import django
from django.core import management

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../backend"))
sys.path.insert(0, PROJECT_ROOT)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

DB_FILE = "../backend/db.sqlite3"
MIGRATIONS_DIR = "../backend/restapi/migrations/"
MIGRATION_FILES = glob.glob(os.path.join(MIGRATIONS_DIR, '0*.*'))

def delete_file(file_path):
    if os.path.exists(file_path):
        os.remove(file_path)
        print(f"Deleted: {file_path}")

def main():
    import django.utils.autoreload
    if os.environ.get('RUN_MAIN') == 'true':
        return
    delete_file(DB_FILE)

    for migration in MIGRATION_FILES:
        delete_file(migration)

    use_default = input("Would you like to use the default admin account? (Y/N) ").strip().lower()
    if use_default == 'y':
        email, password = "admin@admin.com", "password"
    else:
        email = input("Enter the Admin Email: ").strip()
        password = input("Enter the Admin Password: ").strip()

    try:
        management.call_command("makemigrations")
        management.call_command("migrate")
        management.call_command("create_super_user", email, password)
        management.call_command("runserver",  use_reloader=False)
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()