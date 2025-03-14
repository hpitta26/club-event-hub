from django.urls import path
from .views import drf_views, auth_views, club_follow_views
from django.views.decorators.http import require_http_methods

urlpatterns = [
    path('events/', drf_views.EventListCreateView.as_view(), name='event-list-create'),
    path('events/<int:pk>/', drf_views.EventDetailView.as_view(), name='event-detail'),
    path('clubs/', drf_views.ClubListCreateView.as_view(), name='club-list-create'),
    path('clubs/<int:pk>/', drf_views.ClubDetailView.as_view(), name='club-detail'),
    path('clubs/slug/<slug:slug>', drf_views.ClubDetailBySlugView.as_view(), name='club-detail-by-slug'),
    path('students/', drf_views.StudentDetailView.as_view(), name='student-detail'),

    path('register/', require_http_methods(['POST'])(auth_views.register_view), name='register'),
    path('login/', require_http_methods(['POST'])(auth_views.login_view), name='login'),
    path('csrf-provider/', require_http_methods(['GET'])(auth_views.csrf_provider), name='provider'),
    path('logout/', require_http_methods(['GET'])(auth_views.logout_view), name='logout'),
    path('verify-session/', require_http_methods(['GET'])(auth_views.verify_session), name='verify-session'),
    path('verify-email/<str:token>/', auth_views.verify_email, name='verify-email'),

    path('following-clubs/', club_follow_views.get_following_clubs, name='following-clubs'),
    path('unfollow-club/<int:pk>/', club_follow_views.unfollow_club, name='unfollow-club'),
]