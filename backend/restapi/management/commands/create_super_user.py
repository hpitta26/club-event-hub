from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = 'Creates a superuser with specified email and password'

    def add_arguments(self, parser):
        parser.add_argument('email', type=str, help='Email address for the superuser')
        parser.add_argument('password', type=str, help='Password for the superuser')

    def handle(self, *args, **options):
        User = get_user_model()
        email = options['email']
        password = options['password']

        if User.objects.filter(email=email).exists():
            raise CommandError(f'User with email "{email}" already exists')

        User.objects.create_superuser(email=email, password=password)

        self.stdout.write(self.style.SUCCESS(f'Successfully created superuser with email "{email}"'))
