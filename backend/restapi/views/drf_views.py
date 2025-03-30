"""
_summary_
"""

from rest_framework import generics
from rest_framework.generics import get_object_or_404
from ..models import Event, Student, Club
from ..serializers import EventSerializer, StudentSerializer, ClubSerializer
from restapi.permissions import ClubPermission, Admin, StudentPermission
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import user_passes_test
from rest_framework.parsers import MultiPartParser, FormParser



# List all events or create a new event
class EventListCreateView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [ClubPermission] # EXAMPLE OF HOW TO LIMIT PERMISSIONS

    @method_decorator(user_passes_test(lambda u: ClubPermission(u) or Admin(u)), name='dispatch') # ANOTHER EXAMPLE OF HOW TO LIMIT PERMISSIONS
    def create(self, request, *args, **kwargs):
        request.data['club'] = request.session['id']
        print(request.data)
        return super().create(request, *args, **kwargs)

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
    #Added these fields for parsing
    parser_classes = [MultiPartParser, FormParser]

# Retrieve, update, or delete a single student
class StudentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer