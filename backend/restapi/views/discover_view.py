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
    """
    Handles toggling an RSVP for a student to a specific event.
    Expects 'event_id' in the request data.
    Adds the student to the event's RSVPs if not already present,
    otherwise removes the student from the RSVPs.
    """
    try:
        # Retrieve the Event object based on the event_id provided in the POST request data.
        event = Event.objects.get(id=request.data['event_id'])
        # Retrieve the Student object associated with the currently authenticated user making the request.
        student = Student.objects.get(user=request.user)

        # Check if the student (identified by their associated user) is already in the event's RSVP list.
        # 'rsvps' is assumed to be a ManyToManyField relationship on the Event model linking to Student.
        if not event.rsvps.filter(user=request.user).exists():
            # If the student is not already in the RSVP list, add them.
            event.rsvps.add(student)
            if event.event_type.lower() == "regular":
              event.spirit_points = 15
            elif event.event_type.lower() == "workshop":
              event.spirit_points = 25
            elif event.event_type.lower() == "competition":
              event.spirit_points = 35
            student.spirit_points += event.spirit_points
            student.save()
            # Return a success response (HTTP 200). The data confirms the current RSVP status (True after adding).
            return Response(status=200, data={"Contains RSVP": event.rsvps.filter(user=request.user).exists()})
        else:
            # If the student is already in the RSVP list, remove them (toggle behavior).
            event.rsvps.remove(student)
            # Return a success response (HTTP 200). The data confirms the current RSVP status (False after removing).
            return Response(status=200, data={"Contains RSVP": event.rsvps.filter(user=request.user).exists()})
    # Catch any potential exceptions during the process (e.g., Event.DoesNotExist, Student.DoesNotExist, database errors).
    except Exception as e:
        # Print the exception details to the server console for debugging purposes.
        print(e)
        # Return an error response. The original code uses 404, which might indicate 'Not Found',
        # though 500 (Internal Server Error) or 400 (Bad Request if 'event_id' is missing) could also be appropriate depending on the error.
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
