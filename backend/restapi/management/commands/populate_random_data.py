import random
import string
import uuid
from datetime import timedelta
from django.core.management.base import BaseCommand
from django.utils.text import slugify
from django.utils import timezone
from faker import Faker

# Run using `python manage.py populate_random_data`

from restapi.models import Club, Event, CustomUser  # Import models

fake = Faker()

class Command(BaseCommand):
    help = "Generate random test data for Clubs and Events"

    def add_arguments(self, parser):
        parser.add_argument(
            '--clubs', type=int, help='Number of clubs to create', default=10
        )
        parser.add_argument(
            '--events', type=int, help='Total number of events to create', default=50
        )

    def handle(self, *args, **kwargs):
        num_clubs = kwargs['clubs']
        num_events = kwargs['events']

        self.stdout.write(self.style.SUCCESS(f'Generating {num_clubs} clubs and {num_events} events...'))

        # Generate Clubs
        clubs = []
        for _ in range(num_clubs):
            email = f"{uuid.uuid4().hex[:8]}@example.com"  # Generate unique email
            user = CustomUser.objects.create(
                email=email,
                is_email_verified=True
            )

            random_name = ''.join(random.choices(string.ascii_letters + string.digits, k=10))

            club = Club.objects.create(
                user=user,
                club_name=random_name,
                description=fake.text(),
                slug=slugify(random_name),
                social_media_handles={"twitter": fake.url(), "instagram": fake.url()},
                spirit_rating=random.randint(0, 100),
                is_account_verified=random.choice([True, False])
            )
            clubs.append(club)

        self.stdout.write(self.style.SUCCESS(f'Successfully created {len(clubs)} clubs!'))

        # Generate Events
        if not clubs:
            self.stdout.write(self.style.WARNING('No clubs available. Skipping event creation.'))
            return

        for _ in range(num_events):
            club = random.choice(clubs)
            title = ''.join(random.choices(string.ascii_letters + string.digits, k=8))
            start_time = timezone.now() + timedelta(days=random.randint(1, 30))
            end_time = start_time + timedelta(hours=random.randint(1, 5))
            tags=random.sample([
                "Technology", "Medical", "Career", "Fitness", "Social", "Wellness", "Culture", "Politics", "Volunteer"
            ],k=random.randint(1,2))

            profilebanner=random.choice([
                "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&h=250",
                "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&h=250",
                "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&h=250",
                "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=400&h=250",
                "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=400&h=250",
                "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&h=250",
                "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&h=250",
                "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&h=250"
            ])

            Event.objects.create(
                club=club,
                title=title,
                description=fake.text(),
                start_time=start_time,
                end_time=end_time,
                location=fake.city(),
                capacity=random.randint(10, 200),
                tags=tags,
                profilebanner=profilebanner,
            )
        self.stdout.write(self.style.SUCCESS(f'Successfully created {num_events} events!'))