from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth import get_user_model

# CAN RUN (Mac and Windows)
# python manage.py delete <user_id>
# python manage.py delete 3 -> deletes user and (student or club) entry with id of 3

class Command(BaseCommand):
    help = 'Deletes a user'

    def add_arguments(self, parser):
        parser.add_argument('uuid', type=str, help='uuid of user to delete')

    def handle(self, *args, **options):
        User = get_user_model()

        uuid = options['uuid']

        user = User.objects.filter(id=uuid)

        if not user.exists():
            raise CommandError(f'User doesnt exist!!!')

        user.delete()

        self.stdout.write(self.style.SUCCESS(f'Successfully deleted user!'))