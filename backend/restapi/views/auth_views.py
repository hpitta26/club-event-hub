from django.contrib.auth import logout
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from restapi.models import CustomUser


@api_view(['GET'])
@permission_classes([AllowAny])
def verify_email(request, token):
    try:
        user = CustomUser.objects.get_by_verify_token(token)

        if user.is_email_verified:
            return Response(status=205)

        user.is_active = True  # Activate user
        user.is_email_verified = True # Set email as verified
        user.save()

        return Response(
            {"message": "Email verified successfully!"},
            status=200
        )
    except CustomUser.DoesNotExist:
        print('User does not exist...')
        return Response(
            {"message": "Error verifying email!"},
            status=500
        )

@api_view(['GET'])
@permission_classes([AllowAny])
@csrf_exempt
@ensure_csrf_cookie # Ensures that the Response from this view sets a CSRF Cookie
def csrf_provider(request):
    return Response({'csrfToken': request.META.get('CSRF_COOKIE', '')}, status=200)

@api_view(['GET'])
@permission_classes([AllowAny])
def verify_session(request):
    try:
        if request.session.has_key('id'):
            user = CustomUser.objects.get(id=request.session['id'])
            if not user:
                return Response(status=204)
            return Response(
                {"user": {"role": request.session['role']}},
                status=200
            )  # pass to front-end

        return Response(status=204)
    except user.DoesNotExist:
        return Response(
            {"errors": "Server error!"},
            status=500
        )


@api_view(['GET'])
@permission_classes([AllowAny])
def logout_view(request):
    try:
        logout(request)
        request.session.clear()
        response = Response(status=200)
        # When you Delete the Cookie --> the browser will have no CSRF_token (so Login and Register will return a 403 error)
        # When you refresh the page --> If a CSRF_token isn't present you will be assigned a new one
        response.delete_cookie('csrftoken')
        return response
    except AttributeError:
        response = Response({"errors": "Server error!"}, status=500)
        response.delete_cookie('csrftoken')
        return response
