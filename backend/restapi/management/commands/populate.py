from django.core.management.base import BaseCommand, CommandError
from restapi.models import Student, Club, Event, CustomUser
from restapi.forms import StudentCreationForm, ClubCreationForm

# CAN RUN (Mac and Windows)
# python manage.py delete <user_id>
# python manage.py delete 3 -> deletes user and (student or club) entry with id of 3

class Command(BaseCommand):
    help = 'Deletes a user'
    
    def club_helper(self, club_obj):
        form = ClubCreationForm(club_obj)
        if form.is_valid():
            club1 = form.save(commit=False)
            club1.is_account_verified = True
            club1.is_active = True
            club1.save()
        else:
            print(form.errors)


    def student_helper(self, student_obj):
        pass

    def event_helper(self, event_obj):
        pass

    def handle(self, *args, **options):
        club1_data = {
            "role": "CLUB",
            "email": "owner@example.com",
            "club_name": "Club",
            "password1": "updatedsecurepassword",
            "password2": "updatedsecurepassword",
            "description": "Updated description for Awesome Club.",
            "social_media_handles": {"twitter": "@awesomeclubtw", "instagram": "@awesomeclubinsta"}
        }
        student1_data = {
            "role": "STUDENT",
            "email": "owner@example.com",
            "club_name": "Club",
            "password1": "updatedsecurepassword",
            "password2": "updatedsecurepassword",
            "description": "Updated description for Awesome Club.",
            "social_media_handles": {"twitter": "@awesomeclubtw", "instagram": "@awesomeclubinsta"}
        }
        
        club_helper(club1_data)





        self.stdout.write(self.style.SUCCESS(f'Successfully deleted user!'))