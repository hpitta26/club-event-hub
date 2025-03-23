from datetime import timedelta
from django.utils import timezone

from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes

from ..serializers import EventSerializer
from ..models import Event

class ClubEventsView(generics.ListAPIView):
    serializer_class = EventSerializer

    def get_queryset(self):
        club_id = self.kwargs['pk']
        return Event.objects.filter(club__user_id=club_id)

class ClubWeekEventsView(generics.ListAPIView):
    serializer_class = EventSerializer

    def get_queryset(self):
        club_id = self.kwargs['pk']
        now = timezone.now()
        time_diff = now + timedelta(days=7)

        return Event.objects.filter(club__user_id=club_id,start_time__gte=now,start_time__lte=time_diff)
