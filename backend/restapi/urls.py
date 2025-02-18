from django.urls import path
from .views import drf_views, student_auth_views
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

urlpatterns = [
    path('events/', drf_views.EventListCreateView.as_view(), name='event-list-create'),
    path('events/<int:pk>/', drf_views.EventDetailView.as_view(), name='event-detail'),
    path('clubs/', drf_views.ClubListCreateView.as_view(), name='club-list-create'),
    path('clubs/<int:pk>/', drf_views.ClubDetailView.as_view(), name='club-detail'),
    path('students/', drf_views.StudentListCreateView.as_view(), name='student-list-create'),
    path('students/<int:pk>/', drf_views.StudentDetailView.as_view(), name='student-detail'),

    path('student-register/', csrf_exempt(require_http_methods(['POST', 'OPTIONS'])(student_auth_views.student_signup)), name='student-register'), # need to fix csrf_exempt
    path('student-login/', csrf_exempt(require_http_methods(['POST', 'OPTIONS'])(student_auth_views.student_login)), name='student-login'), # need to fix csrf_exempt
    path('student-verify/<str:token>/', student_auth_views.student_verify_email, name='student-verify-email'),
]
