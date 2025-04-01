from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from restapi.models import Student
from rest_framework.views import APIView

@api_view(['GET'])
# @permission_classes([IsAuthenticated])  # Ensure only authenticated users can access this view
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