from datetime import timedelta
from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework.response import Response


from ..serializers import EventSerializer
from ..models import Club,Event

@api_view(["GET"])
def get_club_events(request,pk):

    try:
        club = Club.objects.get(pk=pk)
        now = timezone.now()
        events = Event.objects.filter(club=club,start_time__gte=now)
        club_events = EventSerializer(events, many=True)
        return Response(club_events.data)
    except Club.DoesNotExist:
        return Response({"status":"error", "message":"Club does not exist"},status=404)

@api_view(["GET"])
def get_weekly_club_events (request,pk):
    try:
        club = Club.objects.get(pk=pk)
        now = timezone.now()
        time_diff = now + timedelta(weeks=1)
        events = Event.objects.filter(club=club, start_time__gte=now, start_time__lte=time_diff)
        week_club_events = EventSerializer(events, many=True)
        return Response(week_club_events.data)
    except Club.DoesNotExist:
        return Response({"status":"error", "message":"Club does not exist"},status=404)
