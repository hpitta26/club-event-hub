"""
_summary_

Returns:
    _type_: _description_
"""
import uuid
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
@csrf_protect
def student_signup(request):
    print("Received signup request:", request.method)  # Debug print
    print("Request data:", request.data)  # Debug print
    form = StudentCreationForm(request.data)
    if form.is_valid():
        print("Form is valid")  # Debug print
        user = form.save(commit=False)
        user.is_active = False
        user.save()

        # Create verification token
        verification_token = str(uuid.uuid4())

        # Create student profile and save verification token
        Student.objects.create(
            user=user,
            major=form.cleaned_data.get('major'),
            graduation_year=form.cleaned_data.get('graduation_year'),
            verification_token=verification_token  # token that will be sent through email
        )

        # Send verification email to the Student
        verification_link = f"http://localhost:5173/verify/{verification_token}"
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
    school_email = request.data.get('school_email')
    password = request.data.get('password')

    if not school_email or not password:
        return Response(
            {'message': 'Please provide both email and password'},
            status=400
        )

    username = school_email.split('@')[0]
    user = authenticate(username=username, password=password)

    if user is not None:
        if not user.student_profile.email_verified:
            return Response(
                {'message': 'Please verify your email before logging in'},
                status=401
            )

        login(request, user)

        # pass only essential information that
        # has to persist through several pages like:
        #     profile_picture,
        #     uuid,
        #     name

        request.session['id'] = user.pk  # populate session
        request.session['name'] = user.first_name   # populate session

        return Response({"user": {"name": user.first_name}}, status=200)
    return Response(
        {'message': 'Invalid email or password'}, status=401
    )
