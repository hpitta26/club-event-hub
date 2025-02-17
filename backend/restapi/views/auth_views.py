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




@api_view(['GET', 'POST', 'OPTIONS'])
@permission_classes([AllowAny])
@ensure_csrf_cookie    
def signup(request):
    print("Received request:", request.method)  # Debug print
    print("Request data:", request.data)  # Debug print
    
    if request.method == 'OPTIONS':
        return Response(status=200)
        
    if request.method == 'GET':
        return Response({'message': 'CSRF cookie set'})
        
    if request.method == 'POST':
        print("Processing POST request")  # Debug print
        form = StudentCreationForm(request.data)
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
                    verification_token=verification_token
                )
                
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
                    user.delete()  # Clean up if email fails
                    return Response({
                        'status': 'error',
                        'message': 'Failed to send verification email'
                    }, status=400)
                
                return Response({
                    'status': 'success',
                    'message': 'Please check your email to verify your account'
                })
            except Exception as e:
                print("Error:", str(e))  # Debug print
                if 'user' in locals():
                    user.delete()
                return Response({
                    'status': 'error',
                    'message': str(e)
                }, status=400)
        else:
            print("Form errors:", form.errors)  # Debug print
            return Response({
                'status': 'error',
                'errors': form.errors
            }, status=400)





@api_view(['GET'])
@permission_classes([AllowAny])
def verify_email(request, token):
    try:
        student = Student.objects.get(verification_token=token)
        user = student.user
        user.is_active = True  # Activate user
        user.save()

        student.email_verified = True
        student.verification_token = ''
        student.save()

        return Response({"status": "success", "message": "Email verified successfully!"}, status=200)

    except Student.DoesNotExist:
        return Response({"status": "error", "message": "Invalid or expired token!"}, status=400)




@api_view(['POST'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def user_login(request):
    if request.method == 'POST':
        school_email = request.data.get('school_email', '')
        password = request.data.get('password', '')

        username = school_email.split('@')[0] if '@' in school_email else school_email # could be something different

        if not username or not password:
            return Response({
                'status': 'error',
                'message': 'Please provide both email and password'
            }, status=400)

        user = authenticate(username=username, password=password)

        if user is not None:
            if not user.is_active:
                return Response({
                    'status': 'error',
                    'message': 'Please verify your email before logging in'
                }, status=401)

            login(request, user)
            # IMPORTANT: Send User data back to the frontend --> ONLY sending success message right now
            return Response({"status": "success", "redirect_url": "http://localhost:5173/home"}, status=200)

        return Response({
            'status': 'error',
            'message': 'Invalid email or password'
        }, status=401)



            
# def user_logout(request):
#     logout(request)
#     return redirect('users:login')