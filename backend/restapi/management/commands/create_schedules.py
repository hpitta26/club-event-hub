import random
from django.core.management.base import BaseCommand
from restapi.models import Student

class Command(BaseCommand):
    help = "Populate availability field for existing students"

    def handle(self, *args, **kwargs):
        # Define the time slots (30-minute intervals from 10:00 AM to 10:00 PM)
        time_slots = [
            f"{hour:02d}:{minute:02d}-{hour:02d}:{'30' if minute == 0 else '00'}"
            for hour in range(10, 22)  # 10:00 AM to 10:00 PM
            for minute in (0, 30)
        ]

        # Iterate over all students
        students = Student.objects.all()
        for student in students:
            availability = {}

            # Generate availability for each weekday
            for day in ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]:
                # Determine the number of chunks (1 to 3)
                num_chunks = random.randint(1, 3)
                day_availability = []

                for _ in range(num_chunks):
                    # Determine the start time of the chunk (skewed toward after 3 PM)
                    start_index = random.randint(14, len(time_slots) - 1)  # Skewed start time
                    chunk_length = random.randint(2, 8)  # 1 to 4 hours (2 to 8 slots)

                    # Ensure the chunk doesn't exceed the day's time slots
                    end_index = min(start_index + chunk_length, len(time_slots))
                    chunk = time_slots[start_index:end_index]

                    # Add the chunk to the day's availability
                    day_availability.extend(chunk)

                # Ensure no duplicate time slots and sort them
                availability[day] = sorted(set(day_availability))

            # Assign the generated availability to the student
            student.availability = availability
            student.save()

            self.stdout.write(
                self.style.SUCCESS(f"Updated availability for {student.user.email}")
            )

        self.stdout.write(self.style.SUCCESS("Finished populating student schedules!"))