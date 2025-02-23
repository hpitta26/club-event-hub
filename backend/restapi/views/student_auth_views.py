"""
_summary_

Returns:
    _type_: _description_
"""
from django.contrib.auth import login, authenticate
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_protect
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from restapi.forms import StudentCreationForm
from restapi.models import Student


@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_protect # Ensures Requests include a valid CSRF token (if token if missing or invalid -> request is rejected with a 403 error)
def student_signup(request):
    print("Received signup request:", request.method)  # Debug print
    print("Request data:", request.data)  # Debug print
    form = StudentCreationForm(request.data)
    if form.is_valid():
        print("Form is valid")  # Debug print
        user = form.save()

        # Send verification email to the Student
        verification_link = f"http://localhost:5173/verify/{user.verification_token}"
        response = send_mail(
                'Verify your FIU email',
                f'Verify your FIU email, click this \
                    link to verify: {verification_link}',
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=False,
            )
        if response != 1:
            return Response(
                {'message': 'Failed to send verification email'},
                status=400
            )

        return Response(
            {'message': 'Please check your email to verify your account'},
            status=200
        )
    print("Form was invalid:", form.errors)
    return Response({'errors': form.errors}, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_protect
def student_login(request):
    school_email = request.data.get('email')
    password = request.data.get('password')

    if not school_email or not password:
        return Response(
            {'errors': 'Please provide both email and password'},
            status=400
        )

    user = authenticate(email=school_email, password=password)

    if user is not None:
        if not user.is_email_verified:
            return Response(
                {'errors': 'Please verify your email before logging in'},
                status=401
            )

        login(request, user)

        # pass only essential information that
        # has to persist through several pages like:
        #     profile_picture,
        #     uuid,
        #     name

        request.session['id'] = str(user.pk)  # populate session
        request.session['role'] = user.role  # populate session

        return Response({"user": {"role": user.role}}, status=200)
    return Response(
        {'errors': 'Invalid email or password'}, status=401
    )
