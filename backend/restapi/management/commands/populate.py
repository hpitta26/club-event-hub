from django.core.management.base import BaseCommand
from django.core.management.base import BaseCommand
from django.core.management.base import BaseCommand
from restapi.models import Student, Club, Event, CustomUser
import datetime
from django.utils import timezone
import datetime
from django.utils import timezone
import datetime
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populates DB with data'
    help = 'Populates DB with data'
    help = 'Populates DB with data'
    
    def club_helper(self, club_obj):
        user = CustomUser.objects.create(
            email=club_obj["email"],
            role=CustomUser.CLUB,
            is_email_verified=True
        )
        user.set_password(club_obj["password"])
        user.save()

        club = Club.objects.create(
            user=user,
            club_name=club_obj["club_name"],
            description=club_obj["description"],
            social_media_handles=club_obj["social_media_handles"],
            is_account_verified=True
        )
        return club

    def student_helper(self, student_obj):
        user = CustomUser.objects.create(
            email=student_obj["email"],
            role=CustomUser.STUDENT,
            is_email_verified=True
        )
        user.set_password(student_obj["password"])
        user.save()

        student = Student.objects.create(
            user=user,
            first_name=student_obj["first_name"],
            last_name=student_obj["last_name"],
            major=student_obj["major"],
            graduation_year=student_obj["graduation_year"]
        )
        return student

    def event_helper(self, event_obj, clubs, students):
        club_instance = clubs[event_obj["club"]]
        rsvp_students = [students[student_email] for student_email in event_obj["rsvps"]]
        
        event = Event.objects.create(
            club=club_instance,
            title=event_obj["title"],
            description=event_obj["description"],
            start_time=event_obj["start_time"],
            end_time=event_obj["end_time"],
            location=event_obj["location"],
            capacity=event_obj["capacity"]
        )
        event.rsvps.set(rsvp_students)

    def handle(self, *args, **options):
        club_data = [
            {
                "email": "club1@example.com",
                "club_name": "Chess Club",
                "password": "securepassword1",
                "description": "We love playing and studying chess.",
                "social_media_handles": {"twitter": "@chessclub1", "instagram": "@chessclub1"}
            },
            {
                "email": "club2@example.com",
                "club_name": "Art Club",
                "password": "securepassword2",
                "description": "A place for budding artists to share ideas.",
                "social_media_handles": {"twitter": "@artclub2", "instagram": "@artclub2"}
            },
            {
                "email": "club3@example.com",
                "club_name": "Hiking Club",
                "password": "securepassword3",
                "description": "Weekend hiking adventures around the state.",
                "social_media_handles": {"twitter": "@hikingclub3", "instagram": "@hikingclub3"}
            }
        ]

        student_data = [
            {
                "email": "student1@fiu.edu",
                "first_name": "John",
                "last_name": "Doe",
                "password": "studentsecure1",
                "major": "Computer Science",
                "graduation_year": 2027,
                "following_clubs": ["club2@example.com"]
            },
            {
                "email": "student2@fiu.edu",
                "first_name": "Jane",
                "last_name": "Smith",
                "password": "studentsecure2",
                "major": "Biology",
                "graduation_year": 2028,
                "following_clubs": ["club3@example.com"]
            },
            {
                "email": "student3@fiu.edu",
                "first_name": "Mark",
                "last_name": "Johnson",
                "password": "studentsecure3",
                "major": "Mathematics",
                "graduation_year": 2029,
                "following_clubs": ["club1@example.com", "club3@example.com"]
            }
        ]

        event_data = [
            {
                "club": "club1@example.com",
                "title": "Chess Tournament",
                "description": "Friendly tournament for all skill levels.",
                "start_time": timezone.now() + datetime.timedelta(days=3),
                "end_time": timezone.now() + datetime.timedelta(days=3, hours=2),
                "location": "Main Hall A",
                "capacity": 20,
                "rsvps": ["student1@fiu.edu"]
            },
            {
                "club": "club2@example.com",
                "title": "Art Gallery Night",
                "description": "Showcase your paintings and sculptures.",
                "start_time": timezone.now() + datetime.timedelta(days=5),
                "end_time": timezone.now() + datetime.timedelta(days=5, hours=3),
                "location": "Art Building 2",
                "capacity": 50,
                "rsvps": ["student2@fiu.edu", "student3@fiu.edu"]
            }
        ]

        clubs = {club["email"]: self.club_helper(club) for club in club_data}

        students = {student["email"]: self.student_helper(student) for student in student_data}

        for student_obj in student_data:
            student = students[student_obj["email"]]
            following = [clubs[club_email] for club_email in student_obj["following_clubs"]]
            student.following_clubs.set(following)

        for event in event_data:
            self.event_helper(event, clubs, students)

        self.stdout.write(self.style.SUCCESS('Successfully created data!'))