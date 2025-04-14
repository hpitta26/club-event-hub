from collections import defaultdict
from django.db.models import Count, Q
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta
from ..models import Event, Student, Club
from ..serializers import EventSerializer, ClubSerializer
from restapi.permissions import StudentPermission

@api_view(["GET"])
@permission_classes([])
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
def filter_events(request,filter):
    try:
        events = Event.objects.filter(tags__icontains=filter)
        return Response({'status': 'success', 'data': EventSerializer(events, many=True).data})
    except Exception as e:
        print(e)
        return Response({'status': 'error', 'message': 'server error'}, status=404)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def collaborative_filter(request):
    try:
        session_student = Student.objects.get(user=request.user)
        past_events = Event.objects.filter(rsvps=session_student).order_by("-start_time")[:10]

        student_count = defaultdict(int)

        for past_event in past_events:
            for iterated_student in past_event.rsvps.exclude(user_id=session_student.user_id):
                student_count[iterated_student] += 1

        sorted_students = sorted(student_count.items(), key=lambda x: x[1], reverse=True)
        top_students = [student[0] for student in sorted_students]
        recommended_events = Event.objects.filter(rsvps__in=top_students).exclude(rsvps=session_student).distinct()
        # List is reversed so that events belonging to most similar students are returned first
        return Response(EventSerializer(list(recommended_events)[::-1][:10], many=True).data)

    except Student.DoesNotExist:
        return Response({'status': 'error', 'message': 'Student not found'}, status=404)

@api_view(["GET"])
def get_new_clubs(request):
    try:
        clubs = Club.objects.all()
        return Response(ClubSerializer(clubs[::-1][:6], many=True).data)
    except Exception as e:
        print(e)
        return Response({'status': 'error', 'message': 'server error'}, status=404)

@api_view(["GET"])
def get_recommended_clubs(request):
    try:
        session_student = Student.objects.get(user=request.user)
        following_clubs_ids = session_student.following_clubs.all().values_list('user_id', flat=True)
        excluded_ids = set(following_clubs_ids)

        student_count = defaultdict(int)
        past_events = Event.objects.filter(rsvps=session_student)[:10]

        for past_event in past_events:
            for iterated_student in past_event.rsvps.exclude(user_id=session_student.user_id):
                student_count[iterated_student] += 1

        sorted_students = sorted(student_count.items(), key=lambda x: x[1], reverse=True)
        top_students = [student[0] for student in sorted_students]

        similar_clubs = (Club.objects.filter(Q(events__rsvps__in=top_students))
                         .exclude(user_id__in=excluded_ids)).distinct()

        remaining = 6 - len(similar_clubs)
        if remaining > 0:
            popular_clubs = Club.objects.annotate(
                popularity=Count('followers')
            ).exclude(user_id__in=excluded_ids.union({club.user_id for club in similar_clubs})
            ).order_by('-popularity')[:remaining]

            recommended_clubs = list(similar_clubs)+ list(popular_clubs)
        else:
            recommended_clubs = list(similar_clubs)[::-1]

        return Response(ClubSerializer(recommended_clubs[:6], many=True).data)

    except Exception as e:
        print(e)
        return Response({'status': 'error', 'message': 'server error'}, status=404)
