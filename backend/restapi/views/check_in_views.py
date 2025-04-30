from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from ..models import Event,Student,EventCheckIn
from ..permissions import ClubPermission

@api_view(['POST'])
@permission_classes([IsAuthenticated,ClubPermission])
def check_in_student(request,event_id,student_id):

    #makes sure that that the event belongs to the club
    event = get_object_or_404(Event,id=event_id)

    if event.club.user != request.user:
        return Response({"error": "You don't have permission to check in students for this event"}, status=403)

    #get student
    student = get_object_or_404(Student,user_id = student_id)

    #make sure that student is actually RSVP'd to this event
    if not event.rsvps.filter(user_id = student_id).exists():
        return Response({"error": "This student has not RSVP'd to this event"}, status=400)
    
    #make sure that the student is already checkin
    if EventCheckIn.objects.filter(event=event,student = student).exists():
        return Response({"error" : "Student is already checked in"}, status=400)
    
    check_in = EventCheckIn.objects.create(
        event = event,
        student=student,
    )
    return Response({
        "success" : True,
        "message": f"{student.first_name} {student.last_name} checked in successfully",
        "timestamp" : check_in.timestamp
    }, status=201)
