from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from ..models import Student
from django.conf import settings

class StudentProfileImageView(APIView):
    parser_classes = [JSONParser]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            # Get the Student object associated with the logged-in user
            student = Student.objects.get(user=request.user)
            # Check if the student has a profile picture
            if student.profile_picture:
                image_url = student.profile_picture
            else:
                # Use the default profile image URL
                image_url = f"{settings.AWS_S3_ENDPOINT_URL}/{settings.AWS_STORAGE_BUCKET_NAME}/default-profile.png"
                print(f"{image_url} is the default profile image URL")
            return Response({"image_url": image_url})
        except Student.DoesNotExist:
            return Response({"error": "Student profile not found"}, status=404)

    def post(self, request, *args, **kwargs):
        try:
            # Get the Student object associated with the logged-in user
            student = Student.objects.get(user=request.user)

            # Extract the profile_image_url from the request data
            profile_image_url = request.data.get('profile_image_url')
            if profile_image_url:
                student.profile_picture = profile_image_url  # Save the URL directly
                student.save()
                return Response({"message": "Profile image updated successfully", "image_url": student.profile_picture})
            else:
                return Response({"error": "No profile_image_url provided"}, status=400)
        except Student.DoesNotExist:
            return Response({"error": "Student profile not found"}, status=404)