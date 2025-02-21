from ..models import Event, Student, Club
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.core.mail import send_mail
from restapi.forms import StudentCreationForm
import uuid
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie
import uuid




@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
@ensure_csrf_cookie    
def student_signup(request):
    print("Received signup request:", request.method)  # Debug print
    print("Request data:", request.data)  # Debug print
        
    if request.method == 'GET': # when would this be hit?
        return Response({'message': 'CSRF cookie set'})
        
    if request.method == 'POST':
        print("Processing POST request")  # Debug print
        form = StudentCreationForm(request.data) # verify if Data matches Student_Model --> redundant since already verified on frontend
        if form.is_valid():
            print("Form is valid")  # Debug print
            try:
                user = form.save(commit=False)
                user.is_active = False
                user.save()
                
                # Create verification token
                verification_token = str(uuid.uuid4())
                
                # Create student profile and save verification token
                student = Student.objects.create(
                    user=user,
                    major=form.cleaned_data.get('major'),
                    graduation_year=form.cleaned_data.get('graduation_year'),
                    verification_token=verification_token # token that will be sent through email
                )
                
                # Send verification email to the Student
                verification_link = f"http://localhost:5173/verify/{verification_token}"
                try:
                    send_mail(
                        'Verify your FIU email',
                        f'Verify your FIU email, click this link to verify: {verification_link}',
                        settings.DEFAULT_FROM_EMAIL,
                        [user.email],
                        fail_silently=False,
                    )
                except Exception as e:
                    print("Email error:", str(e))  # Debug print
                    user.delete()  # Clean up if email fails --> could also store failed attempt?
                    return Response({'status': 'error', 'message': 'Failed to send verification email'}, status=400)
                
                return Response({'status': 'success', 'message': 'Please check your email to verify your account'})
        
            except Exception as e:
                print("Error:", str(e))  # Debug print
                if 'user' in locals():
                    user.delete()
                return Response({'status': 'error', 'message': str(e)}, status=400)
     
        else:
            print("Form errors:", form.errors)  # Debug print --> form was invalid (shouldn't happens because of frontend check)
            return Response({'status': 'error', 'errors': form.errors}, status=400)




@api_view(['GET'])
@permission_classes([AllowAny])
def student_verify_email(request, token):
    try:
        student = Student.objects.get(verification_token=token)
        user = student.user
        user.is_active = True  # Activate user
        user.save()

        student.email_verified = True # Set email as verified
        student.verification_token = ''
        student.save()

        return Response({"status": "success", "message": "Email verified successfully!"}, status=200)

    except Student.DoesNotExist:
        return Response({"status": "error", "message": "Invalid or expired token!"}, status=400)




@api_view(['GET'])
@permission_classes([AllowAny])
def student_verify_session(request):
    try:
        if request.session.has_key('id'):
            user = Student.objects.get(id=request.session['id'])
            if not user:
                return Response(status=204)
            return Response({"user": {"name": request.session['name']}}, status=200)  # pass to front-end
        else:
            return Response(status=204)
    except Exception as e:
        print(e)
        return Response({"status": "error", "message": "Server error!"}, status=500)




@api_view(['POST'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def student_login(request):
    if request.method == 'POST':
        school_email = request.data.get('school_email')
        password = request.data.get('password')

        if not school_email or not password: # this will never hit since you are defaulting=''
            return Response({'status': 'error', 'message': 'Please provide both email and password'}, status=400)

        username = school_email.split('@')[0] if '@' in school_email else school_email # username --> first part of email

        user = authenticate(username=username, password=password)

        if user is not None:
            if not user.student_profile.email_verified:
                return Response({'status': 'error', 'message': 'Please verify your email before logging in'}, status=401)

            login(request, user)
            """
            pass only essential information that has to persist through several pages like:
                profile_picture,
                uuid,
                name
            """
            request.session['id'] = user.pk; # populate session
            request.session['name'] = user.first_name;  # populate session
        
            return Response({"user": {"name": user.first_name}}, status=200)  # then pass to frontend

        return Response({'status': 'error','message': 'Invalid email or password'}, status=401) # User DoesNotExist




@api_view(['GET'])
@permission_classes([AllowAny])
def student_logout(request):
    try:
        logout(request)
        request.session.clear()
        return Response(status=200)
    except Exception:
        return Response({"status": "error", "message": "Server error!"}, status=500)