from django.urls import path
from .views import drf_views, student_auth_views, auth_views, club_auth_views
from django.views.decorators.http import require_http_methods

urlpatterns = [
    path('events/', drf_views.EventListCreateView.as_view(), name='event-list-create'),
    path('events/<int:pk>/', drf_views.EventDetailView.as_view(), name='event-detail'),
    path('clubs/', drf_views.ClubListCreateView.as_view(), name='club-list-create'),
    path('clubs/<int:pk>/', drf_views.ClubDetailView.as_view(), name='club-detail'),
    path('students/', drf_views.StudentListCreateView.as_view(), name='student-list-create'),
    path('students/<int:pk>/', drf_views.StudentDetailView.as_view(), name='student-detail'),


    path('student-register/', require_http_methods(['POST'])(student_auth_views.student_signup), name='student-register'),
    path('student-login/', require_http_methods(['POST'])(student_auth_views.student_login), name='student-login'),

    path('club-register/', require_http_methods(['POST'])(club_auth_views.club_register), name='club-register'),
    path('club-login/', require_http_methods(['POST'])(club_auth_views.club_login), name='club-login'),

    path('csrf-provider/', require_http_methods(['GET'])(auth_views.csrf_provider), name='provider'),
    path('logout/', require_http_methods(['GET'])(auth_views.logout_view), name='logout'),
    path('verify-session/', require_http_methods(['GET'])(auth_views.verify_session), name='verify-session'),
    path('verify-email/<str:token>/', auth_views.verify_email, name='verify-email'),
]