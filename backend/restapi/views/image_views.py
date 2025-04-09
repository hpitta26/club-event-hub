from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.permissions import IsAuthenticated
from ..models import Student
from ..models import Club
from django.conf import settings
from storages.backends.s3boto3 import S3Boto3Storage
from rest_framework.parsers import MultiPartParser, FormParser



from django.core.files.base import ContentFile
import base64

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
                student.profile_picture = profile_image_url
                student.save()
                return Response({"message": "Profile image updated successfully", "image_url": student.profile_picture})
            else:
                return Response({"error": "No profile_image_url provided"}, status=400)
        except Student.DoesNotExist:
            return Response({"error": "Student profile not found"}, status=404)
        


class ClubProfileImageView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        try:
            club = Club.objects.get(user=request.user)
            image_url = f"{settings.AWS_S3_ENDPOINT_URL}/{settings.AWS_STORAGE_BUCKET_NAME}/{club.club_name}/profile.png"
            print(f"{image_url} is the default profile image URL")                
            return Response({"image_url": image_url})
        except Club.DoesNotExist:
            return Response({"error": "Club doesn't exist..."}, status=404)
    
    def post(self, request, *args, **kwargs):
        storage = S3Boto3Storage()
        try: 
            club = Club.objects.get(user=request.user)
            print("file received:", request.FILES)
            profile_image_url = request.FILES.get("profile_image_url")
            if profile_image_url:
                club.club_picture = profile_image_url
                name ="profile.png"
                club.club_picture.save(name, profile_image_url)
                club.save()
                return Response({"message": "profile image updated successfully", "image_url": club.club_picture.url})
            else:
                return Response({"error": "No profile_image_url provided"}, status=400)
        except Student.DoesNotExist:
            return Response({"error": "Student profile not found"}, status=404)
        


class ClubProfileBannerView(APIView):
    # parser_classes = [JSONParser]
    # permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        try:
            club = Club.objects.get(user=request.user)
            image_url = f"{settings.AWS_S3_ENDPOINT_URL}/{settings.AWS_STORAGE_BUCKET_NAME}/{club.club_name}/banner.png"
            print(f"{image_url} is the default profile banner URL")                
            return Response({"image_url": image_url})
        except Club.DoesNotExist:
            return Response({"error": "Club doesn't exist..."}, status=404) 


    def post(self, request, *args, **kwargs):
        storage = S3Boto3Storage()
        try:
            club = Club.objects.get(user=request.user)
            print("file received:", request.FILES)
            banner_image_url = request.FILES.get('banner_image_url')
            
            if banner_image_url:
                club.club_banner = banner_image_url
                name ="banner.png"
                club.club_banner.save(name, banner_image_url)
                club.save() 
                return Response({"message": "Banner image updated successfully", "image_url": club.club_banner.url})
            else:
                return Response({"error": "No profile_image_url provided"}, status=400)
        except Club.DoesNotExist:
            return Response({"error": "Club profile not found"}, status=404)




        # except Club.DoesNotExist:
        #     return Response({"error": "Club doesn't exist..."}, status=404) 