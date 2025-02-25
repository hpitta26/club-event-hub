from django.urls import path
from .views import drf_views, student_auth_views, club_follow_views
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

urlpatterns = [
    path('events/', drf_views.EventListCreateView.as_view(), name='event-list-create'),
    path('events/<int:pk>/', drf_views.EventDetailView.as_view(), name='event-detail'),
    path('clubs/', drf_views.ClubListCreateView.as_view(), name='club-list-create'),
    path('clubs/<int:pk>/', drf_views.ClubDetailView.as_view(), name='club-detail'),
    path('students/', drf_views.StudentListCreateView.as_view(), name='student-list-create'),
    path('students/<int:pk>/', drf_views.StudentDetailView.as_view(), name='student-detail'),

    path('student-register/', require_http_methods(['POST', 'OPTIONS'])(student_auth_views.student_signup), name='student-register'),
    path('student-login/', require_http_methods(['POST', 'OPTIONS'])(student_auth_views.student_login), name='student-login'),
    path('student-logout/', require_http_methods(['GET'])(student_auth_views.student_logout), name='student-logout'),
    path('student-verify-session/', require_http_methods(['GET'])(student_auth_views.student_verify_session), name='student-verify-session'),
    path('student-verify-email/<str:token>/', student_auth_views.student_verify_email, name='student-verify-email'),

    path('following-clubs', club_follow_views.get_following_clubs, name='following-clubs'),
    path('unfollow-club/<int:pk>/', club_follow_views.unfollow_club, name='unfollow-club')
    #path('follow-club/<int:pk>'),
]