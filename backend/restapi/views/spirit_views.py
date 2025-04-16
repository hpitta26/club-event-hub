from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from restapi.models import Student

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_spirit_points(request):
    try:
        student = Student.objects.get(user=request.user)
        return Response({"spirit_points": student.spirit_points}, status=200)
    except Student.DoesNotExist:
        return Response({"error": "Student profile not found"}, status=404)
    
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from restapi.models import Student

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_top_students(request):
    try:
        # Get all students ordered by spirit points in descending order
        students = Student.objects.all().order_by('-spirit_points')

        top_students = []
        rank = 1
        for student in students[:50]:
            top_students.append({
                "id": student.user.id,
                "name": f"{student.first_name} {student.last_name}",
                "points": student.spirit_points,
                "avatar": f"https://placehold.co/40x40/47ACDF/FFFFFF?text={student.first_name[0]}{student.last_name[0]}",
                "rank": rank,
                "events_attended": student.rsvp_events.count(),
            })
            rank += 1

        logged_in_student = Student.objects.get(user=request.user)
        logged_in_student_data = {
            "id": logged_in_student.user.id,
            "name": f"{logged_in_student.first_name} {logged_in_student.last_name}",
            "points": logged_in_student.spirit_points,
            "avatar": f"https://placehold.co/40x40/47ACDF/FFFFFF?text={logged_in_student.first_name[0]}{logged_in_student.last_name[0]}",
            "rank": None,  # Will be calculated below
            "events_attended": logged_in_student.rsvp_events.count(),
        }

        # Determine the logged-in student's rank
        for idx, student in enumerate(students):
            if student == logged_in_student:
                logged_in_student_data["rank"] = idx + 1
                break

        # Remove the logged-in student from the top 50 if they are already included
        top_students = [student for student in top_students if student["id"] != logged_in_student.user.id]

        return Response({
            "status": "success",
            "top_students": top_students,
            "logged_in_student": logged_in_student_data,
        }, status=200)
    except Student.DoesNotExist:
        return Response({"error": "Student profile not found"}, status=404)
    except Exception as e:
        return Response({"error": str(e)}, status=500)