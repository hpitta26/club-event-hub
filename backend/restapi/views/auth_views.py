from django.contrib.auth import logout
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from restapi.models import CustomUser
from restapi.forms import ClubCreationForm, StudentCreationForm
from django.contrib.auth import login, authenticate
from django.views.decorators.csrf import csrf_protect
from django.core.mail import send_mail
from django.conf import settings

@api_view(['GET'])
@permission_classes([AllowAny])
@csrf_protect
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
@csrf_protect
def verify_session(request):
    try:
        user = request.user

        if user.is_authenticated:
            return Response(
                {"user": {"role": request.session['role']}},
                status=200
            )  # pass to front-end

        return Response(status=204)
    except CustomUser.DoesNotExist:
        return Response(
            {"errors": "Server error!"},
            status=500
        )

@api_view(['GET'])
@permission_classes([AllowAny])
@csrf_exempt
def logout_view(request):
    try:
        logout(request)
        request.session.clear()
        response = Response(status=200)
        response.delete_cookie('csrftoken')
        return response
    except AttributeError:
        response = Response({"errors": "Server error!"}, status=500)
        response.delete_cookie('csrftoken')
        return response

@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_protect
def register_view(request):
    print("Register route with data:", request.data)
    role = request.data.get("role")

    if role == "CLUB":
        form = ClubCreationForm(request.data)
    elif role == "STUDENT":
        form = StudentCreationForm(request.data)
    else:
        return Response({'error': 'Invalid form data'}, status=400)

    if form.is_valid():
        print("Form is valid")  # Debug print
        user = form.save()

        verification_link = f"http://localhost:5173/verify/{user.verification_token}"
        response = send_mail(
                'Verify your email',
                f'Verify your email, click this \
                    link to verify: {verification_link}',
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=False,
            )
        if response != 1:
            raise Exception('Failed to send email')

        return Response(
            {'message': 'Please check your email to verify your account'},
            status=200
        )
    print("Form errors:", form.errors)
    return Response({'errors': form.errors}, status=400)

@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_protect
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response(
            {'error': 'Please provide both email and password'},
            status=400
        )

    user = authenticate(email=email, password=password)

    if user is not None:
        user_groups = user.groups.all()
        group_names = [group.name for group in user_groups]

        if not group_names:
            return Response(
                {'error': 'Can not find users role...' },
                status=401
            )
            
        
        if not user.is_email_verified:
            error_message = 'Please verify your email before logging in'
            print(error_message)
            return Response(
                {'error': error_message },
                status=401
            )
        
        if "CLUB" in group_names and not user.club_profile.is_account_verified:
            print('User is a club and account is not verified')
            return Response(
                {'error': 'Please wait... your account has not been manually verified yet' },
                status=401
            )

        login(request, user)

        # pass only essential information that
        # has to persist through several pages like:
        #     profile_picture,
        #     uuid,
        #     name

        request.session['id'] = str(user.pk)  # populate session
        request.session['role'] = group_names   # populate session

        return Response({"user": {"role": group_names}}, status=200)
    
    error_message = 'Invalid account credentials'
    print(error_message)
    return Response(
        {'error': error_message}, status=401
    )