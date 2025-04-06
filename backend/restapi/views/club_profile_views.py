from datetime import timedelta

from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..serializers import EventSerializer
from ..models import Club,Event

@api_view(['GET'])
def get_club_events(request,pk):
    try:
        club = Club.objects.get(user_id=pk)
        now = timezone.now()
        time_diff = now + timedelta(weeks=1)
        events = Event.objects.filter(club=club,start_time__gte=time_diff)
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)
    except Club.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_weekly_club_events(request,pk):
    try:
        club = Club.objects.get(user_id=pk)
        now = timezone.now()
        time_diff = now + timedelta(weeks=1)
        events = Event.objects.filter(club=club, start_time__gt=now, start_time__lt=time_diff)
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)
    except Club.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)