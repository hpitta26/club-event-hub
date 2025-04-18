"""
_summary_
"""

from rest_framework.generics import get_object_or_404
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated

from ..models import Event, Student, Club
from ..serializers import EventSerializer, StudentSerializer, ClubSerializer, UserSerializer
from restapi.permissions import ClubPermission, Admin, StudentPermission
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import user_passes_test
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

import os
from django.core.files.base import ContentFile
from storages.backends.s3boto3 import S3Boto3Storage
import boto3
import re

# List all events or create a new event
class EventListCreateView(generics.ListCreateAPIView):
    serializer_class = EventSerializer
    permission_classes = [ClubPermission] # EXAMPLE OF HOW TO LIMIT PERMISSIONS

    def get_queryset(self):
        """List events only for the requesting club."""
        club_id = self.request.session.get('id')  # Fetch club ID from session
        if club_id is None:
            return Event.objects.none()  # Return empty if no club is found in session
        return Event.objects.filter(club__user_id=club_id)  # Use `user_id` instead of `id`

    @method_decorator(user_passes_test(lambda u: ClubPermission() or Admin(u)), name='dispatch') # ANOTHER EXAMPLE OF HOW TO LIMIT PERMISSIONS
    def create(self, request, *args, **kwargs):
        """Override create to associate events with the club creating them."""
        print(f"Session before event creation: {request.session.items()}")

        club_id = request.session.get('id')
        if not club_id:
            return Response({"error": "No Club ID found in session"}, status=status.HTTP_400_BAD_REQUEST)

        club_instance = get_object_or_404(Club, user_id=club_id)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(club=club_instance)  # Explicitly assign the club

        print(f"Session after event creation: {request.session.items()}")

        return Response(serializer.data, status=status.HTTP_201_CREATED)

from django.utils.decorators import method_decorator
# Retrieve, update, or delete a single event
class EventDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

# List all clubs or create a new club
class ClubListCreateView(generics.ListCreateAPIView):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer
    
# Retrieve, update, or delete a single club
class ClubDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self):
        club_id=self.request.session.get('id')
        if not club_id:
            raise Exception("No Club ID found in session")
        return get_object_or_404(Club,user_id=club_id)

    def get(self, request, *args, **kwargs):
        club = Club.objects.get(user=request.user)

        data = {
            "club_name": club.club_name,
            "description": club.description,
            "club_banner_url": club.club_banner.url if club.club_banner else None,
            "profile_picture_url": request.user.profile_picture.url if request.user.profile_picture else None,
            "email": request.user.email,
            "social_media_handles": club.social_media_handles if club.social_media_handles else "{\"twitter\": \"\", \"instagram\": \"\", \"linkedIn\": \"\"}",
        }
        return Response(data, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        data = {k: v for k, v in request.data.items() if v not in [None, "", [], {}, '']}
        print("Filtered patch data:", data)

        user = request.user
        club = Club.objects.get(user=user)

        user_serializer = UserSerializer(instance=user, data=data, partial=True)
        user_serializer.is_valid(raise_exception=True)
        user_serializer.save()

        club_serializer = ClubSerializer(instance=club, data=data, partial=True)
        club_serializer.is_valid(raise_exception=True)
        club_serializer.save()
        
        print(club_serializer.data)
        print(user_serializer.data)

        request.session["profile_picture"] = user_serializer.data.get("profile_picture")
        request.session["banner"] = club_serializer.data.get("club_banner")

        return Response({**user_serializer.data, **club_serializer.data}, status=status.HTTP_200_OK)

#Retrieve, update, or delete a single club through Slug instead of PK
class ClubDetailBySlugView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer
    lookup_field = 'slug'

# Retrieve, update, or delete a single student
class StudentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        student_id = self.request.session.get('id')
        if not student_id:
            raise Exception("No student ID found in session.")

        return get_object_or_404(Student, user_id=student_id)

    def patch(self, request, *args, **kwargs):
        data = {k: v for k, v in request.data.items() if v not in [None, "", [], {}, '']}

        user = request.user
        student = Student.objects.get(user=user)

        profile_url = data.pop("profile_picture_url", None)
        if profile_url:
            match = re.search(r'/dev-bucket/(.*)', profile_url)
            if match:
                s3_key = match.group(1)
                storage = S3Boto3Storage()
                s3 = storage.connection.meta.client
                bucket = storage.bucket_name

                response = s3.get_object(Bucket=bucket, Key=s3_key)
                file_data = response['Body'].read()
                filename = os.path.basename(s3_key)
                data['profile_picture'] = ContentFile(file_data, name=filename)
        print("Filtered patch data:", data)

        user_serializer = UserSerializer(instance=user, data=data, partial=True)
        user_serializer.is_valid(raise_exception=True)
        user_serializer.save()

        student_serializer = StudentSerializer(instance=student, data=data, partial=True)
        student_serializer.is_valid(raise_exception=True)
        student_serializer.save()

        request.session["profile_picture"] = user_serializer.data.get("profile_picture")

        print(student_serializer.data)
        print(user_serializer.data)

        return Response({**user_serializer.data, **student_serializer.data}, status=status.HTTP_200_OK)