from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta
from ..models import Event,Student
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
            return Response(status=200, data={"Contains RSVP": event.rsvps.filter(user=request.user).exists()})
        else:
            event.rsvps.remove(student)
            return Response(status=200, data={"Contains RSVP": event.rsvps.filter(user=request.user).exists()})
    except Exception as e:
        print(e)
        return Response({'status': 'error', 'message': 'server error'}, status=404)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def is_rsvp(request):
    try:
        event_id = request.query_params.get('event_id')
        if not event_id:
            return Response({'status': 'error', 'message': 'event_id is required'}, status=400)

        event = Event.objects.get(id=event_id)
        return Response(status=200, data={"RSVP": event.rsvps.filter(user=request.user).exists()})
    except Event.DoesNotExist:
        return Response({'status': 'error', 'message': 'Event not found'}, status=404)
    except Exception as e:
        print(e)
        return Response({'status': 'error', 'message': 'server error'}, status=500)

@api_view(["GET"])
def filter_events(request,filter):
    try:
        events = Event.objects.filter(tags__icontains=filter)
        return Response({'status': 'success', 'data': EventSerializer(events, many=True).data})
    except Exception as e:
        print(e)
        return Response({'status': 'error', 'message': 'server error'}, status=404)