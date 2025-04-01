import random
from django.core.management.base import BaseCommand
from restapi.models import Student

class Command(BaseCommand):
    help = "Generate non-overlapping time slots for all 5 days of the week"

    def handle(self, *args, **kwargs):
        # Define the range of integers representing time slots (0 to 24)
        num_slots = list(range(24))  # 0 to 24, representing 30-minute intervals from 10:00 AM to 10:00 PM

        time_slots = [
            f"{hour:02d}:{minute:02d}-{end_hour:02d}:{end_minute:02d}"
            for hour in range(10, 22)  # 10:00 AM to 10:00 PM
            for minute, end_hour, end_minute in (
                (0, hour, 30),  # 10:00-10:30, 10:30-11:00, etc.
                (30, hour + 1, 0),  # Handle the transition to the next hour
            )
        ]

        # Function to generate non-overlapping chunks for a single day
        def generate_chunks():
            num_chunks = random.randint(1, 3)  # Number of chunks (1 to 3)
            selected_indices = set()  # To track selected time slot indices
            chunks = []

            for _ in range(num_chunks):
                # Generate a random non-overlapping chunk
                start_index = random.randint(0, len(num_slots) - 1)
                chunk_length = random.randint(2, 6)  # Chunk length (1 to 3 hours)

                # Ensure the chunk does not overlap with already selected indices
                while any(i in selected_indices for i in range(start_index, start_index + chunk_length)):
                    start_index = random.randint(0, len(num_slots) - 1)

                # Add the chunk to the selected indices
                chunk = list(range(start_index, min(start_index + chunk_length, len(num_slots))))
                selected_indices.update(chunk)
                chunks.append(chunk)

            return chunks

        # Iterate over all students
        students = Student.objects.all()
        for student in students:
            weekly_chunks = {}

            # Generate non-overlapping chunks for all 5 days of the week
            for day in ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]:
                # Generate chunks and flatten them into a single sorted list
                chunks = generate_chunks()
                flattened_and_sorted = sorted([slot for chunk in chunks for slot in chunk])
                # Map the flattened indices to their corresponding time slots
                time_slot_strings = [time_slots[i] for i in flattened_and_sorted]
                weekly_chunks[day] = time_slot_strings

            # Save the generated availability to the student object
            student.availability = weekly_chunks
            student.save()

            self.stdout.write(self.style.SUCCESS(f"Updated availability for {student.user.email}"))

        self.stdout.write(self.style.SUCCESS("Finished generating non-overlapping time slots and saving to students!"))