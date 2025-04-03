from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta
from ..models import Event, Student
from ..serializers import EventSerializer
from restapi.permissions import StudentPermission

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_events_this_week(request):
    try:
        now = timezone.now()
        time_diff = now + timedelta(days=7)
        events = Event.objects.filter(start_time__gte=now, start_time__lte=time_diff).order_by('start_time')

        serialized_events = EventSerializer(events, many=True, context={'request': request, 'student_context_rsvps': True, 'attending': True}).data
        return Response(serialized_events, status=200)
    except Exception as e:
        print(e)
        return Response({'status': 'error', 'message': 'server error'}, status=404)

@api_view(["POST"])
@permission_classes([IsAuthenticated, StudentPermission])
def rsvp(request):
    try:
        event = Event.objects.get(id=request.data['event_id'])
        student = Student.objects.get(user=request.user)
        if not event.rsvps.filter(user=request.user).exists():
            event.rsvps.add(student)
            return Response(status=200)
        return Response(status=204)
    except Exception as e:
        print(e)
        return Response({'status': 'error', 'message': 'server error'}, status=404)

