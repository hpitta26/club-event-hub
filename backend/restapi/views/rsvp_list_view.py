from ..models import Student, Club, Event
from ..serializers import ClubSerializer, EventSerializer, StudentSerializer
from django.views.decorators.csrf import csrf_protect
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET'])
@csrf_protect
def get_rsvp_list(request,event_id):
    try: 
        event = Event.objects.filter(id = event_id)
        rsvp_list = event.rsvps.all()
        serialized_students = StudentSerializer(rsvp_list, many=True).data
        return Response(serialized_students, status=status.HTTP_200_OK)

    except Club.DoesNotExist or Event.DoesNotExist:
        return Response({"error": "Event not found"}, status=status.HTTP_404_NOT_FOUND)

