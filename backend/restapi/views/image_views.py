from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from ..models import Student
from django.conf import settings

class StudentProfileImageView(APIView):
    parser_classes = [MultiPartParser, FormParser]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            # Get the Student object associated with the logged-in user
            student = Student.objects.get(user=request.user)
            # Check if the student has a profile picture
            if student.profile_picture:
                image_url = student.profile_picture.url
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
            # Update the profile_picture field with the uploaded file
            student.profile_picture = request.FILES['profile_image']
            student.save()
            return Response({"message": "Profile image uploaded successfully", "image_url": student.profile_picture.url})
        except Student.DoesNotExist:
            return Response({"error": "Student profile not found"}, status=404)