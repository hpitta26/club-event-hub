"""
_summary_
"""

from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from ..models import Club, Event, Student
from ..serializers import ClubSerializer, EventSerializer, StudentSerializer


from rest_framework import generics
from ..models import Event, Student, Club
from ..serializers import EventSerializer, StudentSerializer, ClubSerializer
from restapi.permissions import ClubPermission
# List all events or create a new event
class EventListCreateView(generics.ListCreateAPIView):
    #queryset = Event.objects.all()
    #queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [ClubPermission]

    def create(self, request, *args, **kwargs):
        """Override create to associate events with the club creating them."""
        club_id = request.session.get('id')

        # Fetch the club instance (assuming your Event model has a ForeignKey to Club)
        club_instance = get_object_or_404(Club, user_id=club_id)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(club=club_instance)  # Explicitly assign the club

        return Response(serializer.data, status=status.HTTP_201_CREATED)
        """Override create to associate events with the club creating them."""
        club_id = request.session.get('id')

        # Fetch the club instance (assuming your Event model has a ForeignKey to Club)
        club_instance = get_object_or_404(Club, user_id=club_id)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(club=club_instance)  # Explicitly assign the club

        return Response(serializer.data, status=status.HTTP_201_CREATED)

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

#Retrieve, update, or delete a single club through Slug instead of PK
class ClubDetailBySlugView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer
    lookup_field = 'slug'

# Retrieve, update, or delete a single student
class StudentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
