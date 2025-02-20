from django.contrib.auth import logout
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from restapi.models import Student, Club

@api_view(['GET'])
@permission_classes([AllowAny])
def verify_email(request, token):
    try:
        student = Student.objects.get(verification_token=token)

        if student.email_verified:
            return Response(status=205)
        user = student.user
        user.is_active = True  # Activate user
        user.save()

        student.email_verified = True # Set email as verified
        student.save()

        return Response(
            {"message": "Email verified successfully!"},
            status=200
        )
    except Student.DoesNotExist:
        print('Student does not exist...')

    try:
        club = Club.objects.get(verification_token=token)

        if club.email_verified:
            return Response(status=205)
        user = club.user
        user.is_active = True
        user.save()

        club.email_verified = True
        club.save()

    except Club.DoesNotExist:
        print('Club does not exist...')
        return Response(
            {"status": "success", "message": "Email verified successfully!"},
            status=200
        )

@api_view(['GET'])
@permission_classes([AllowAny])
@csrf_exempt
@ensure_csrf_cookie
def csrf_provider(request):
    return Response({'csrfToken': request.META.get('CSRF_COOKIE', '')}, status=200)

@api_view(['GET'])
@permission_classes([AllowAny])
def verify_session(request):
    try:
        if request.session.has_key('id'):
            user = Student.objects.get(id=request.session['id'])
            if not user:
                return Response(status=204)
            return Response(
                {"user": {"name": request.session['name']}},
                status=200
            )  # pass to front-end

        return Response(status=204)
    except user.DoesNotExist:
        return Response(
            {"message": "Server error!"},
            status=500
        )


@api_view(['GET'])
@permission_classes([AllowAny])
def logout_view(request):
    try:
        logout(request)
        request.session.clear()
        response = Response(status=200)
        response.delete_cookie('csrftoken')
        return response
    except AttributeError:
        response = Response({"message": "Server error!"}, status=500)
        response.delete_cookie('csrftoken')
        return response
