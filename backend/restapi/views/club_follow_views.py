from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from ..models import Student, Club
from ..serializers import ClubSerializer
from django.views.decorators.csrf import csrf_protect

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@csrf_protect
def get_following_clubs(request):
    try:
        student = Student.objects.get(user=request.user)
        following_clubs = student.following_clubs.all() 
        serialized_clubs = ClubSerializer(following_clubs, many=True).data

        return Response({'status': 'success', 'data': serialized_clubs})
    except Student.DoesNotExist:
        return Response({'status': 'error', 'message': 'User is not a student'}, status=404)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
@csrf_protect
def unfollow_club(request, pk):
    try:
        student = Student.objects.get(user=request.user)
        club = Club.objects.get(user_id=pk)

        if club in student.following_clubs.all():
            student.following_clubs.remove(club)
            return Response({'status': 'success', 'message': f'Unfollowed {club.club_name}'})
        else:
            return Response({'status': 'error', 'message': 'Not following this club'}, status=400)
    
    except Student.DoesNotExist:
        return Response({'status': 'error', 'message': 'User is not a student'}, status=404)
    except Club.DoesNotExist:
        return Response({'status': 'error', 'message': 'Club not found'}, status=404)

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
@csrf_protect
def follow_club(request, pk):
    try:
        student = Student.objects.get(user=request.user)
        club = Club.objects.get(user_id=pk)
        if club not in student.following_clubs.all():
            student.following_clubs.add(club)
            return Response({'status': 'success', 'message': f'Followed {club.club_name}'})
        else:
            return Response({'status': 'error', 'message': 'Not following this club'}, status=400)
    except Club.DoesNotExist:
        return Response({'status': 'error', 'message': 'Club not found'}, status=404)
    except Student.DoesNotExist:
        return Response({'status': 'error', 'message': 'Student not found'}, status=404)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@csrf_protect
def check_user_following(request,pk):
    try:
        student = Student.objects.get(user=request.user)
        club = Club.objects.get(user_id=pk)
        if club in student.following_clubs.all():
            return Response(True)
        else:
            return Response(False)
    except Club.DoesNotExist:
        return Response({'status': 'error', 'message': 'Club not found'}, status=404)
    except Student.DoesNotExist:
        return Response({'status': 'error', 'message': 'Student not found'}, status=404)
