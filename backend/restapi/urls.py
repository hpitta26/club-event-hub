from django.urls import path
from .views import EventListCreateView, EventDetailView, ClubListCreateView, ClubDetailView, StudentListCreateView, StudentDetailView, signup, user_login, verify_email
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
urlpatterns = [
    path('events/', EventListCreateView.as_view(), name='event-list-create'),
    path('events/<int:pk>/', EventDetailView.as_view(), name='event-detail'),
    path('clubs/', ClubListCreateView.as_view(), name='club-list-create'),
    path('clubs/<int:pk>/', ClubDetailView.as_view(), name='club-detail'),
    path('students/', StudentListCreateView.as_view(), name='student-list-create'),
    path('students/<int:pk>/', StudentDetailView.as_view(), name='student-detail'),
    path('register/', 
         csrf_exempt(require_http_methods(['POST', 'OPTIONS'])(signup)), 
         name='register'),
    path('login/', csrf_exempt(require_http_methods(['POST', 'OPTIONS'])(user_login)), name='login'),
    path('verify/<str:token>/', verify_email, name='verify_email'),
]
