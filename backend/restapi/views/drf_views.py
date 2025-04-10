"""
_summary_
"""

from rest_framework.generics import get_object_or_404
from rest_framework import generics, status
from ..models import Event, Student, Club
from ..serializers import EventSerializer, StudentSerializer, ClubSerializer
from restapi.permissions import ClubPermission, Admin, StudentPermission
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import user_passes_test
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

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
    parser_classes = [MultiPartParser, FormParser]

    def get_object(self):
        club_id=self.request.session.get('id')
        if not club_id:
            raise Exception("No Club ID found in session")
        return get_object_or_404(Club,user_id=club_id)

#Retrieve, update, or delete a single club through Slug instead of PK
class ClubDetailBySlugView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Club.objects.all()
    serializer_class = ClubSerializer
    lookup_field = 'slug'

# Retrieve, update, or delete a single student
class StudentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
