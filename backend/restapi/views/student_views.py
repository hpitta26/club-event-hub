from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from ..models import Student, Event
from ..serializers import EventSerializer
from restapi.permissions import StudentPermission

@api_view(['GET'])
@permission_classes([IsAuthenticated, StudentPermission])
def get_student_events(request):
    try:
        student = Student.objects.get(user=request.user)
        events = student.rsvp_events
        events.order_by('-start_time')

        now = timezone.now()
        past_events = events.filter(start_time__lt=now)
        upcoming_events = events.filter(start_time__gt=now)

        serialized_past = EventSerializer(past_events, many=True, context={'request': request, 'student_context_rsvps': True, 'attending': True}).data
        serialized_upcoming = EventSerializer(upcoming_events, many=True, context={'request': request, 'student_context_rsvps': True, 'attending': True}).data
        return Response({'upcoming': serialized_upcoming, 'past': serialized_past}, status=200)
    except Student.DoesNotExist:
        return Response({'status': 'error', 'message': 'User is not a student'}, status=404)