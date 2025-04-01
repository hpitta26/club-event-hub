from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from restapi.models import Student
from rest_framework.views import APIView

@api_view(['GET'])
# @permission_classes([IsAuthenticated]) 
def get_all_student_availabilities(request):
    try:
        # Query all students and retrieve their availability
        students = Student.objects.all()
        availabilities = [
            {
                "student_email": student.user.email,
                "availability": student.availability,
            }
            for student in students
        ]

        return Response({"status": "success", "data": availabilities}, status=200)
    except Exception as e:
        return Response({"status": "error", "message": str(e)}, status=500)
    

class StudentAvailabilityView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            # Get the Student object associated with the logged-in user
            student = Student.objects.get(user=request.user)
            
            # Handle blank or null availability
            availability = student.availability or {
                "Monday": [],
                "Tuesday": [],
                "Wednesday": [],
                "Thursday": [],
                "Friday": [],
            }
            
            return Response({"availability": availability}, status=200)
        except Student.DoesNotExist:
            return Response({"error": "Student profile not found"}, status=404)

    def post(self, request, *args, **kwargs):
        try:
            student = Student.objects.get(user=request.user)

            availability = request.data.get("availability", {})

            valid_days = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday"}
            if not isinstance(availability, dict) or not valid_days.issubset(availability.keys()):
                return Response(
                    {"error": "Invalid availability structure. Ensure all weekdays are included."},
                    status=400,
                )

            def clean_time_slots(day_slots):
                unique_slots = list(set(day_slots)) 
                return sorted(unique_slots, key=lambda slot: slot.split("-")[0])  # Sort by start time

            cleaned_availability = {}
            for day, times in availability.items():
                if not isinstance(times, list):
                    return Response(
                        {"error": f"Invalid availability format for {day}. Must be a list of time slots."},
                        status=400,
                    )
                cleaned_availability[day] = clean_time_slots(times)

            student.availability = cleaned_availability
            student.save()

            return Response({"message": "Availability updated successfully."}, status=200)
        except Student.DoesNotExist:
            return Response({"error": "Student profile not found"}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)