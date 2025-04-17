from django.core.management.base import BaseCommand
from restapi.models import Student, Club, Event, CustomUser
import datetime
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populates DB with data'
    
    def club_helper(self, club_obj):
        user = CustomUser.objects.create(
            email=club_obj["email"],
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
            capacity=event_obj["capacity"],
            tags=event_obj["tags"],
            profilebanner=event_obj["profilebanner"],
        )
        event.rsvps.set(rsvp_students)

    def calculate_spirit_points(self, student):
        now = timezone.now()
        past_events = student.rsvp_events.filter(start_time__lt=now)

        # Base spirit points
        total_spirit_points = 10

        for event in past_events:
            event_duration = (event.end_time - event.start_time).total_seconds() / 3600  # Duration in hours
            if event_duration < 1:
                total_spirit_points += 10
            elif 1 <= event_duration <= 2:
                total_spirit_points += 15
            else:
                total_spirit_points += 20

        print(f"Total Spirit Points: {total_spirit_points}")

        return total_spirit_points

    def handle(self, *args, **options):
        club_data = [
            {
                "email": "club1@example.com",
                "club_name": "Chess Club",
                "password": "password",
                "description": "We love playing and studying chess.",
                "social_media_handles": {"twitter": "@chessclub1", "instagram": "@chessclub1"}
            },
            {
                "email": "club2@example.com",
                "club_name": "Art Club",
                "password": "password",
                "description": "A place for budding artists to share ideas.",
                "social_media_handles": {"twitter": "@artclub2", "instagram": "@artclub2"}
            },
            {
                "email": "club3@example.com",
                "club_name": "Hiking Club",
                "password": "password",
                "description": "Weekend hiking adventures around the state.",
                "social_media_handles": {"twitter": "@hikingclub3", "instagram": "@hikingclub3"}
            }
        ]

        student_data = [
            {
                "email": "student1@fiu.edu",
                "first_name": "Jane",
                "last_name": "Smith",
                "password": "password",
                "major": "Computer Science",
                "graduation_year": 2027,
                "following_clubs": ["club2@example.com", "club3@example.com"],
            },
            {
                "email": "student2@fiu.edu",
                "first_name": "John",
                "last_name": "Doe",
                "password": "password",
                "major": "Biology",
                "graduation_year": 2028,
                "following_clubs": ["club3@example.com"],
            },
            {
                "email": "student3@fiu.edu",
                "first_name": "Alex",
                "last_name": "Johnson",
                "password": "password",
                "major": "Mathematics",
                "graduation_year": 2029,
                "following_clubs": ["club1@example.com", "club3@example.com"],
            },
            {
                "email": "student4@fiu.edu",
                "first_name": "Maria",
                "last_name": "Garcia",
                "password": "password",
                "major": "Physics",
                "graduation_year": 2026,
                "following_clubs": ["club1@example.com", "club3@example.com"],
            },
            {
                "email": "student5@fiu.edu",
                "first_name": "Robert",
                "last_name": "Chen",
                "password": "password",
                "major": "Chemistry",
                "graduation_year": 2027,
                "following_clubs": ["club2@example.com", "club3@example.com"],
            },
            {
                "email": "student6@fiu.edu",
                "first_name": "Sarah",
                "last_name": "Williams",
                "password": "password",
                "major": "Engineering",
                "graduation_year": 2028,
                "following_clubs": ["club1@example.com", "club2@example.com", "club3@example.com"],
            },
            {
                "email": "student7@fiu.edu",
                "first_name": "Michael",
                "last_name": "Brown",
                "password": "password",
                "major": "Psychology",
                "graduation_year": 2029,
                "following_clubs": ["club3@example.com"],
            },
            {
                "email": "student8@fiu.edu",
                "first_name": "Emily",
                "last_name": "Davis",
                "password": "password",
                "major": "History",
                "graduation_year": 2026,
                "following_clubs": ["club1@example.com", "club2@example.com", "club3@example.com"],
            },
            {
                "email": "student9@fiu.edu",
                "first_name": "David",
                "last_name": "Wilson",
                "password": "password",
                "major": "Philosophy",
                "graduation_year": 2027,
                "following_clubs": ["club2@example.com", "club3@example.com"],
            },
            {
                "email": "student10@fiu.edu",
                "first_name": "Linda",
                "last_name": "Martinez",
                "password": "password",
                "major": "Economics",
                "graduation_year": 2028,
                "following_clubs": ["club3@example.com"],
            },
            {
                "email": "student11@fiu.edu",
                "first_name": "Chris",
                "last_name": "Evans",
                "password": "password",
                "major": "Political Science",
                "graduation_year": 2029,
                "following_clubs": ["club1@example.com", "club3@example.com"],
            },
            {
                "email": "student12@fiu.edu",
                "first_name": "Sophia",
                "last_name": "Turner",
                "password": "password",
                "major": "Sociology",
                "graduation_year": 2026,
                "following_clubs": ["club2@example.com", "club3@example.com"],
            },
            {
                "email": "student13@fiu.edu",
                "first_name": "Liam",
                "last_name": "Johnson",
                "password": "password",
                "major": "Art",
                "graduation_year": 2027,
                "following_clubs": ["club1@example.com", "club3@example.com"],
            },
            {
                "email": "student14@fiu.edu",
                "first_name": "Olivia",
                "last_name": "Brown",
                "password": "password",
                "major": "Medical Science",
                "graduation_year": 2028,
                "following_clubs": ["club2@example.com", "club3@example.com"],
            },
            {
                "email": "student15@fiu.edu",
                "first_name": "Noah",
                "last_name": "Davis",
                "password": "password",
                "major": "Physics",
                "graduation_year": 2029,
                "following_clubs": ["club3@example.com"],
            },
            {
                "email": "student16@fiu.edu",
                "first_name": "Emma",
                "last_name": "Wilson",
                "password": "password",
                "major": "History",
                "graduation_year": 2026,
                "following_clubs": ["club1@example.com", "club2@example.com", "club3@example.com"],
            },
            {
                "email": "student17@fiu.edu",
                "first_name": "James",
                "last_name": "Lee",
                "password": "password",
                "major": "Philosophy",
                "graduation_year": 2027,
                "following_clubs": ["club2@example.com", "club3@example.com"],
            },
            {
                "email": "student18@fiu.edu",
                "first_name": "Mia",
                "last_name": "Garcia",
                "password": "password",
                "major": "Economics",
                "graduation_year": 2028,
                "following_clubs": ["club3@example.com"],
            },
            {
                "email": "student19@fiu.edu",
                "first_name": "Benjamin",
                "last_name": "Martinez",
                "password": "password",
                "major": "Political Science",
                "graduation_year": 2029,
                "following_clubs": ["club1@example.com", "club3@example.com"],
            },
            {
                "email": "student20@fiu.edu",
                "first_name": "Charlotte",
                "last_name": "Chen",
                "password": "password",
                "major": "Sociology",
                "graduation_year": 2026,
                "following_clubs": ["club2@example.com", "club3@example.com"],
            },
            {
                "email": "student21@fiu.edu",
                "first_name": "Lucas",
                "last_name": "White",
                "password": "password",
                "major": "Computer Engineering",
                "graduation_year": 2027,
                "following_clubs": ["club1@example.com", "club2@example.com"],
            },
            {
                "email": "student22@fiu.edu",
                "first_name": "Amelia",
                "last_name": "Taylor",
                "password": "password",
                "major": "Biochemistry",
                "graduation_year": 2028,
                "following_clubs": ["club3@example.com"],
            },
            {
                "email": "student23@fiu.edu",
                "first_name": "Henry",
                "last_name": "Moore",
                "password": "password",
                "major": "Physics",
                "graduation_year": 2029,
                "following_clubs": ["club1@example.com"],
            },
            {
                "email": "student24@fiu.edu",
                "first_name": "Evelyn",
                "last_name": "Clark",
                "password": "password",
                "major": "Psychology",
                "graduation_year": 2026,
                "following_clubs": ["club2@example.com", "club3@example.com"],
            },
            {
                "email": "student25@fiu.edu",
                "first_name": "Alexander",
                "last_name": "Lewis",
                "password": "password",
                "major": "Political Science",
                "graduation_year": 2027,
                "following_clubs": ["club3@example.com"],
            },
            {
                "email": "student26@fiu.edu",
                "first_name": "Isabella",
                "last_name": "Walker",
                "password": "password",
                "major": "Economics",
                "graduation_year": 2028,
                "following_clubs": ["club1@example.com", "club2@example.com"],
            },
            {
                "email": "student27@fiu.edu",
                "first_name": "Daniel",
                "last_name": "Hall",
                "password": "password",
                "major": "Sociology",
                "graduation_year": 2029,
                "following_clubs": ["club2@example.com"],
            },
            {
                "email": "student28@fiu.edu",
                "first_name": "Harper",
                "last_name": "Allen",
                "password": "password",
                "major": "Art History",
                "graduation_year": 2026,
                "following_clubs": ["club1@example.com", "club3@example.com"],
            },
            {
                "email": "student29@fiu.edu",
                "first_name": "Matthew",
                "last_name": "Young",
                "password": "password",
                "major": "Mathematics",
                "graduation_year": 2027,
                "following_clubs": ["club2@example.com", "club3@example.com"],
            },
            {
                "email": "student30@fiu.edu",
                "first_name": "Ava",
                "last_name": "King",
                "password": "password",
                "major": "Biology",
                "graduation_year": 2028,
                "following_clubs": ["club3@example.com"],
            },
            {
                "email": "student31@fiu.edu",
                "first_name": "Elijah",
                "last_name": "Scott",
                "password": "password",
                "major": "Engineering",
                "graduation_year": 2029,
                "following_clubs": ["club1@example.com"],
            },
            {
                "email": "student32@fiu.edu",
                "first_name": "Abigail",
                "last_name": "Adams",
                "password": "password",
                "major": "History",
                "graduation_year": 2026,
                "following_clubs": ["club2@example.com", "club3@example.com"],
            },
            {
                "email": "student33@fiu.edu",
                "first_name": "Sebastian",
                "last_name": "Baker",
                "password": "password",
                "major": "Physics",
                "graduation_year": 2027,
                "following_clubs": ["club3@example.com"],
            },
            {
                "email": "student34@fiu.edu",
                "first_name": "Emily",
                "last_name": "Carter",
                "password": "password",
                "major": "Medical Science",
                "graduation_year": 2028,
                "following_clubs": ["club1@example.com", "club2@example.com"],
            },
            {
                "email": "student35@fiu.edu",
                "first_name": "Jack",
                "last_name": "Rivera",
                "password": "password",
                "major": "Political Science",
                "graduation_year": 2029,
                "following_clubs": ["club2@example.com"],
            },
            {
                "email": "student36@fiu.edu",
                "first_name": "Sofia",
                "last_name": "Perez",
                "password": "password",
                "major": "Art",
                "graduation_year": 2026,
                "following_clubs": ["club1@example.com", "club3@example.com"],
            },
            {
                "email": "student37@fiu.edu",
                "first_name": "Logan",
                "last_name": "Brooks",
                "password": "password",
                "major": "Engineering",
                "graduation_year": 2027,
                "following_clubs": ["club2@example.com", "club3@example.com"],
            },
            {
                "email": "student38@fiu.edu",
                "first_name": "Ella",
                "last_name": "Sanders",
                "password": "password",
                "major": "Biology",
                "graduation_year": 2028,
                "following_clubs": ["club3@example.com"],
            },
            {
                "email": "student39@fiu.edu",
                "first_name": "William",
                "last_name": "Morris",
                "password": "password",
                "major": "Physics",
                "graduation_year": 2029,
                "following_clubs": ["club1@example.com"],
            },
            {
                "email": "student40@fiu.edu",
                "first_name": "Grace",
                "last_name": "Foster",
                "password": "password",
                "major": "History",
                "graduation_year": 2026,
                "following_clubs": ["club2@example.com", "club3@example.com"],
            },
            {
                "email": "student41@fiu.edu",
                "first_name": "Ethan",
                "last_name": "Bell",
                "password": "password",
                "major": "Mathematics",
                "graduation_year": 2027,
                "following_clubs": ["club3@example.com"],
            },
            {
                "email": "student42@fiu.edu",
                "first_name": "Chloe",
                "last_name": "Ward",
                "password": "password",
                "major": "Medical Science",
                "graduation_year": 2028,
                "following_clubs": ["club1@example.com", "club2@example.com"],
            },
            {
                "email": "student43@fiu.edu",
                "first_name": "Mason",
                "last_name": "Hughes",
                "password": "password",
                "major": "Political Science",
                "graduation_year": 2029,
                "following_clubs": ["club2@example.com"],
            },
            {
                "email": "student44@fiu.edu",
                "first_name": "Lily",
                "last_name": "Ramirez",
                "password": "password",
                "major": "Art",
                "graduation_year": 2026,
                "following_clubs": ["club1@example.com", "club3@example.com"],
            },
            {
                "email": "student45@fiu.edu",
                "first_name": "Aiden",
                "last_name": "Torres",
                "password": "password",
                "major": "Engineering",
                "graduation_year": 2027,
                "following_clubs": ["club2@example.com", "club3@example.com"],
            },
            {
                "email": "student46@fiu.edu",
                "first_name": "Zoe",
                "last_name": "Jenkins",
                "password": "password",
                "major": "Biology",
                "graduation_year": 2028,
                "following_clubs": ["club3@example.com"],
            },
            {
                "email": "student47@fiu.edu",
                "first_name": "Jackson",
                "last_name": "Reed",
                "password": "password",
                "major": "Physics",
                "graduation_year": 2029,
                "following_clubs": ["club1@example.com"],
            },
            {
                "email": "student48@fiu.edu",
                "first_name": "Victoria",
                "last_name": "Cooper",
                "password": "password",
                "major": "History",
                "graduation_year": 2026,
                "following_clubs": ["club2@example.com", "club3@example.com"],
            },
            {
                "email": "student49@fiu.edu",
                "first_name": "Dylan",
                "last_name": "Bailey",
                "password": "password",
                "major": "Mathematics",
                "graduation_year": 2027,
                "following_clubs": ["club3@example.com"],
            },
            {
                "email": "student50@fiu.edu",
                "first_name": "Hannah",
                "last_name": "Scott",
                "password": "password",
                "major": "Medical Science",
                "graduation_year": 2028,
                "following_clubs": ["club1@example.com", "club2@example.com"],
            },
        ]

        event_data = [
            {
                "club": "club1@example.com",
                "title": "Chess Tournament 3",
                "description": "Friendly tournament for all skill levels.",
                "start_time": timezone.now() + datetime.timedelta(days=2),
                "end_time": timezone.now() + datetime.timedelta(days=2, hours=4),
                "location": "Main Hall A",
                "capacity": 20,
                "rsvps": ["student1@fiu.edu", "student3@fiu.edu"],
                "tags": ["Technology"],
                "profilebanner": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&h=250"
            },
            {
                "club": "club1@example.com",
                "title": "Chess Tournament 2",
                "description": "Friendly tournament for all skill levels.",
                "start_time": timezone.now() + datetime.timedelta(days=1),
                "end_time": timezone.now() + datetime.timedelta(days=1, hours=2),
                "location": "Main Hall A",
                "capacity": 20,
                "rsvps": ["student1@fiu.edu", "student3@fiu.edu"],
                "tags": ["Technology"],
                "profilebanner":"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&h=250"
            },
            {
                "club": "club1@example.com",
                "title": "Chess Tournament",
                "description": "Friendly tournament for all skill levels.",
                "start_time": timezone.now() - datetime.timedelta(days=10, hours=2),
                "end_time": timezone.now() - datetime.timedelta(days=10),
                "location": "Main Hall A",
                "capacity": 20,
                "rsvps": ["student1@fiu.edu", "student2@fiu.edu", "student3@fiu.edu",
    "student4@fiu.edu", "student5@fiu.edu", "student6@fiu.edu",
    "student7@fiu.edu", "student8@fiu.edu", "student9@fiu.edu",
    "student10@fiu.edu", "student11@fiu.edu", "student12@fiu.edu",
    "student13@fiu.edu", "student14@fiu.edu", "student15@fiu.edu",
    "student16@fiu.edu", "student17@fiu.edu", "student18@fiu.edu",
    "student19@fiu.edu", "student20@fiu.edu"],
                "tags": ["Technology"],
                "profilebanner": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&h=250"
            },
            {
                "club": "club2@example.com",
                "title": "Art Gallery Night",
                "description": "Showcase your paintings and sculptures.",
                "start_time": timezone.now() - datetime.timedelta(days=15, hours=1),
                "end_time": timezone.now() - datetime.timedelta(days=15),
                "location": "Art Building 2",
                "capacity": 50,
                "rsvps": ["student1@fiu.edu", "student2@fiu.edu", "student3@fiu.edu",
    "student4@fiu.edu", "student5@fiu.edu", "student6@fiu.edu",
    "student7@fiu.edu", "student8@fiu.edu", "student9@fiu.edu",
    "student10@fiu.edu", "student11@fiu.edu", "student12@fiu.edu",
    "student13@fiu.edu", "student14@fiu.edu", "student15@fiu.edu",
    "student16@fiu.edu", "student17@fiu.edu", "student18@fiu.edu",
    "student19@fiu.edu"],
                "tags": ["Career", "Medical"],
                "profilebanner":"https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=400&h=250"
            },
            {
                "club": "club1@example.com",
                "title": "Chess Tournament",
                "description": "Friendly tournament for all skill levels.",
                "start_time": timezone.now() - datetime.timedelta(days=10, hours=2),
                "end_time": timezone.now() - datetime.timedelta(days=10),
                "location": "Main Hall A",
                "capacity": 20,
                "rsvps": ["student1@fiu.edu", "student2@fiu.edu", "student3@fiu.edu",
    "student4@fiu.edu", "student5@fiu.edu", "student6@fiu.edu",
    "student7@fiu.edu", "student8@fiu.edu", "student9@fiu.edu",
    "student10@fiu.edu", "student11@fiu.edu", "student12@fiu.edu",
    "student13@fiu.edu", "student14@fiu.edu", "student15@fiu.edu",
    "student16@fiu.edu", "student17@fiu.edu", "student18@fiu.edu"],
                "tags": ["Technology"],
                "profilebanner":"https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=400&h=250"
            },
            {
                "club": "club2@example.com",
                "title": "Art Gallery Night",
                "description": "Showcase your paintings and sculptures.",
                "start_time": timezone.now() - datetime.timedelta(days=15, hours=1),
                "end_time": timezone.now() - datetime.timedelta(days=15),
                "location": "Art Building 2",
                "capacity": 50,
                "rsvps": ["student1@fiu.edu", "student2@fiu.edu", "student3@fiu.edu",
    "student4@fiu.edu", "student5@fiu.edu", "student6@fiu.edu",
    "student7@fiu.edu", "student8@fiu.edu", "student9@fiu.edu",
    "student10@fiu.edu", "student11@fiu.edu", "student12@fiu.edu",
    "student13@fiu.edu", "student14@fiu.edu", "student15@fiu.edu",
    "student16@fiu.edu", "student17@fiu.edu"],
                "tags": ["Career", "Medical"],
                "profilebanner": "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=400&h=250"
            },
            {
                "club": "club3@example.com",
                "title": "Hiking Adventure",
                "description": "Explore the great outdoors with us.",
                "start_time": timezone.now() - datetime.timedelta(days=20, hours=3),
                "end_time": timezone.now() - datetime.timedelta(days=20),
                "location": "Mountain Trail",
                "capacity": 30,
                "rsvps": ["student1@fiu.edu", "student2@fiu.edu", "student3@fiu.edu",
    "student4@fiu.edu", "student5@fiu.edu", "student6@fiu.edu",
    "student7@fiu.edu", "student8@fiu.edu", "student9@fiu.edu",
    "student10@fiu.edu", "student11@fiu.edu", "student12@fiu.edu",
    "student13@fiu.edu", "student14@fiu.edu", "student15@fiu.edu",
    "student16@fiu.edu"],
                "tags": ["Fitness", "Wellness"],
                "profilebanner":"https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=400&h=250",
        },
            {
                "club": "club1@example.com",
                "title": "Coding Workshop",
                "description": "Learn the basics of Python programming.",
                "start_time": timezone.now() - datetime.timedelta(days=25, hours=2),
                "end_time": timezone.now() - datetime.timedelta(days=25),
                "location": "Tech Lab",
                "capacity": 25,
                "rsvps": ["student1@fiu.edu", "student2@fiu.edu", "student3@fiu.edu",
    "student4@fiu.edu", "student5@fiu.edu", "student6@fiu.edu",
    "student7@fiu.edu", "student8@fiu.edu", "student9@fiu.edu",
    "student10@fiu.edu", "student11@fiu.edu", "student12@fiu.edu",
    "student13@fiu.edu", "student14@fiu.edu", "student15@fiu.edu"],
                "tags": ["Technology", "Career"],
                "profilebanner": "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=400&h=250"
            },
            {
                "club": "club2@example.com",
                "title": "Painting Class",
                "description": "Unleash your creativity with colors.",
                "start_time": timezone.now() - datetime.timedelta(days=30, hours=1),
                "end_time": timezone.now() - datetime.timedelta(days=30),
                "location": "Art Studio",
                "capacity": 20,
                "rsvps": ["student1@fiu.edu", "student2@fiu.edu", "student3@fiu.edu",
    "student4@fiu.edu", "student5@fiu.edu", "student6@fiu.edu",
    "student7@fiu.edu", "student8@fiu.edu", "student9@fiu.edu",
    "student10@fiu.edu", "student11@fiu.edu", "student12@fiu.edu",
    "student13@fiu.edu", "student14@fiu.edu"],
                "tags": ["Culture", "Wellness"],
                "profilebanner": "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=400&h=250"
            },
            {
                "club": "club3@example.com",
                "title": "Yoga Session",
                "description": "Relax and rejuvenate with yoga.",
                "start_time": timezone.now() - datetime.timedelta(days=35, hours=2),
                "end_time": timezone.now() - datetime.timedelta(days=35),
                "location": "Community Center",
                "capacity": 15,
                "rsvps": ["student1@fiu.edu", "student2@fiu.edu", "student3@fiu.edu",
    "student4@fiu.edu", "student5@fiu.edu", "student6@fiu.edu",
    "student7@fiu.edu", "student8@fiu.edu", "student9@fiu.edu",
    "student10@fiu.edu", "student11@fiu.edu", "student12@fiu.edu",
    "student13@fiu.edu"],
                "tags": ["Wellness", "Fitness"],
                "profilebanner": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&h=250"
            },
            {
                "club": "club1@example.com",
                "title": "Chess Strategy Seminar",
                "description": "Master advanced chess strategies.",
                "start_time": timezone.now() - datetime.timedelta(days=40, hours=3),
                "end_time": timezone.now() - datetime.timedelta(days=40),
                "location": "Main Hall B",
                "capacity": 30,
                "rsvps": ["student1@fiu.edu", "student2@fiu.edu", "student3@fiu.edu",
    "student4@fiu.edu", "student5@fiu.edu", "student6@fiu.edu",
    "student7@fiu.edu", "student8@fiu.edu", "student9@fiu.edu",
    "student10@fiu.edu", "student11@fiu.edu", "student12@fiu.edu"],
                "tags": ["Technology"],
                "profilebanner": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&h=250"
            },
            {
                "club": "club2@example.com",
                "title": "Photography Workshop",
                "description": "Learn the art of photography.",
                "start_time": timezone.now() - datetime.timedelta(days=45, hours=2),
                "end_time": timezone.now() - datetime.timedelta(days=45),
                "location": "Photo Studio",
                "capacity": 20,
                "rsvps": ["student1@fiu.edu", "student2@fiu.edu", "student3@fiu.edu",
    "student4@fiu.edu", "student5@fiu.edu", "student6@fiu.edu",
    "student7@fiu.edu", "student8@fiu.edu", "student9@fiu.edu",
    "student10@fiu.edu", "student11@fiu.edu"],
                "tags": ["Culture", "Career"],
                "profilebanner": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&h=250"
            },
            {
                "club": "club3@example.com",
                "title": "Trail Cleanup",
                "description": "Help us clean up the local trails.",
                "start_time": timezone.now() - datetime.timedelta(days=50, hours=1),
                "end_time": timezone.now() - datetime.timedelta(days=50),
                "location": "Forest Trail",
                "capacity": 40,
                "rsvps": ["student1@fiu.edu", "student2@fiu.edu", "student3@fiu.edu",
    "student4@fiu.edu", "student5@fiu.edu", "student6@fiu.edu",
    "student7@fiu.edu", "student8@fiu.edu", "student9@fiu.edu",
    "student10@fiu.edu"],
                "tags": ["Volunteer", "Wellness"],
                "profilebanner": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&h=250"
            },
            {
                "club": "club1@example.com",
                "title": "AI Seminar",
                "description": "Discover the future of artificial intelligence.",
                "start_time": timezone.now() - datetime.timedelta(days=55, hours=3),
                "end_time": timezone.now() - datetime.timedelta(days=55),
                "location": "Tech Auditorium",
                "capacity": 50,
                "rsvps": ["student1@fiu.edu", "student2@fiu.edu", "student3@fiu.edu",
    "student4@fiu.edu", "student5@fiu.edu", "student6@fiu.edu",
    "student7@fiu.edu", "student8@fiu.edu", "student9@fiu.edu"],
                "tags": ["Technology", "Career"],
                "profilebanner": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&h=250"
            },
            {
                "club": "club2@example.com",
                "title": "Cultural Night",
                "description": "Celebrate diversity and culture.",
                "start_time": timezone.now() - datetime.timedelta(days=60, hours=2),
                "end_time": timezone.now() - datetime.timedelta(days=60),
                "location": "Cultural Center",
                "capacity": 100,
                "rsvps": ["student1@fiu.edu", "student2@fiu.edu", "student3@fiu.edu",
    "student4@fiu.edu", "student5@fiu.edu", "student6@fiu.edu",
    "student7@fiu.edu", "student8@fiu.edu"],
                "tags": ["Culture", "Social"],
                "profilebanner": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&h=250"
            },
            {
                "club": "club3@example.com",
                "title": "Marathon Training",
                "description": "Prepare for the upcoming marathon.",
                "start_time": timezone.now() - datetime.timedelta(days=65, hours=1),
                "end_time": timezone.now() - datetime.timedelta(days=65),
                "location": "City Park",
                "capacity": 30,
                "rsvps": ["student1@fiu.edu", "student2@fiu.edu", "student3@fiu.edu",
    "student4@fiu.edu", "student5@fiu.edu", "student6@fiu.edu",
    "student7@fiu.edu"],
                "tags": ["Fitness", "Wellness"],
                "profilebanner": "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=400&h=250"
            },
            {
                "club": "club1@example.com",
                "title": "Robotics Workshop",
                "description": "Build and program your own robot.",
                "start_time": timezone.now() - datetime.timedelta(days=70, hours=3),
                "end_time": timezone.now() - datetime.timedelta(days=70),
                "location": "Robotics Lab",
                "capacity": 20,
                "rsvps": ["student1@fiu.edu", "student2@fiu.edu", "student3@fiu.edu",
    "student4@fiu.edu", "student5@fiu.edu"],
                "tags": ["Technology", "Career"],
                "profilebanner": "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=400&h=250"
            },
            {
                "club": "club2@example.com",
                "title": "Dance Class",
                "description": "Learn the basics of salsa dancing.",
                "start_time": timezone.now() - datetime.timedelta(days=75, hours=2),
                "end_time": timezone.now() - datetime.timedelta(days=75),
                "location": "Dance Studio",
                "capacity": 25,
                "rsvps": ["student1@fiu.edu", "student2@fiu.edu", "student3@fiu.edu"],
                "tags": ["Culture", "Wellness"],
                "profilebanner": "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&h=250"
            },
            {
                "club": "club3@example.com",
                "title": "Nature Walk",
                "description": "Explore the beauty of nature.",
                "start_time": timezone.now() - datetime.timedelta(days=80, hours=1),
                "end_time": timezone.now() - datetime.timedelta(days=80),
                "location": "Nature Reserve",
                "capacity": 30,
                "rsvps": ["student1@fiu.edu", "student2@fiu.edu"],
                "tags": ["Wellness", "Fitness"],
                "profilebanner": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&h=250"
            },
            {
                "club": "club1@example.com",
                "title": "Cybersecurity Talk",
                "description": "Learn how to protect your online presence.",
                "start_time": timezone.now() - datetime.timedelta(days=85, hours=3),
                "end_time": timezone.now() - datetime.timedelta(days=85),
                "location": "Tech Hall",
                "capacity": 40,
                "rsvps": ["student1@fiu.edu"],
                "tags": ["Technology", "Career"],
                "profilebanner": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&h=250"
            },
            {
                "club": "club2@example.com",
                "title": "Cooking Class",
                "description": "Master the art of Italian cooking.",
                "start_time": timezone.now() - datetime.timedelta(days=90, hours=2),
                "end_time": timezone.now() - datetime.timedelta(days=90),
                "location": "Culinary School",
                "capacity": 15,
                "rsvps": ["student1@fiu.edu"],
                "tags": ["Culture", "Wellness"],
                "profilebanner": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&h=250"
            },
            {
                "club": "club3@example.com",
                "title": "Community Cleanup",
                "description": "Join us in making our community cleaner.",
                "start_time": timezone.now() - datetime.timedelta(days=95, hours=1),
                "end_time": timezone.now() - datetime.timedelta(days=95),
                "location": "City Square",
                "capacity": 50,
                "rsvps": [],
                "tags": ["Volunteer", "Social"],
                "profilebanner": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&h=250"
            },
            # Add more events to ensure students meet the required number of past events attended
        ]

        clubs = {club["email"]: self.club_helper(club) for club in club_data}

        students = {student["email"]: self.student_helper(student) for student in student_data}

        for student_obj in student_data:
            student = students[student_obj["email"]]
            following = [clubs[club_email] for club_email in student_obj["following_clubs"]]
            student.following_clubs.set(following)

        for event in event_data:
            self.event_helper(event, clubs, students)

        for student in students.values():
            student.spirit_points = self.calculate_spirit_points(student)
            student.save()

        self.stdout.write(self.style.SUCCESS('Successfully created data!'))
