from django.urls import path
from .views import drf_views, auth_views, club_follow_views, discover_view,club_profile_views, image_views, schedule_views, import_luma_events, student_views, spirit_views
from django.views.decorators.http import require_http_methods

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('events/', drf_views.EventListCreateView.as_view(), name='event-list-create'),
    path('events/<int:pk>/', drf_views.EventDetailView.as_view(), name='event-detail'),
    path('clubs/', drf_views.ClubDetailView.as_view(), name='club-detail'),
    path('import-events/', import_luma_events.import_luma_events, name="import-luma-events"),
    path('clubs/slug/<slug:slug>/', drf_views.ClubDetailBySlugView.as_view(), name='club-detail-by-slug'),
    path('students/', drf_views.StudentDetailView.as_view(), name='student-detail'),
    #path('all-students/', drf_views.StudentListView.as_view(), name='student-list'),

    path('register/', require_http_methods(['POST'])(auth_views.register_view), name='register'),
    path('login/', require_http_methods(['POST'])(auth_views.login_view), name='login'),
    path('csrf-provider/', require_http_methods(['GET'])(auth_views.csrf_provider), name='provider'),
    path('logout/', require_http_methods(['GET'])(auth_views.logout_view), name='logout'),
    path('verify-session/', require_http_methods(['GET'])(auth_views.verify_session), name='verify-session'),
    path('verify-email/<str:token>/', auth_views.verify_email, name='verify-email'), 

    path('following-clubs/', club_follow_views.get_following_clubs, name='following-clubs'),
    path('unfollow-club/<int:pk>/', club_follow_views.unfollow_club, name='unfollow-club'),
    path('follow-club/<int:pk>/', club_follow_views.follow_club, name='follow-club'),
    path('check-user-following/<int:pk>/',club_follow_views.check_user_following, name='check-user-following'),
    path('get-following-clubs-events/', club_follow_views.get_following_club_events, name='following-clubs-events'),

    path('get-week-events/', discover_view.get_events_this_week, name='get-week-events'),
    path('rsvp/', discover_view.rsvp, name='rsvp'),
    path('get-student-events/', student_views.get_student_events, name='get_student_events'),
    path('filter-events/<str:filter>/', discover_view.filter_events, name='filter-events'),

    path('get-club-events/<int:pk>/', club_profile_views.get_club_events, name='get-club-events'),
    path('get-weekly-club-events/<int:pk>/', club_profile_views.get_weekly_club_events, name='get-weekly-club-events'),

    path('student-profile-image/', image_views.StudentProfileImageView.as_view(), name='student-profile-image'),

    path('all-student-schedules/', schedule_views.get_all_student_availabilities, name='all-student-schedules'),
    path('student-schedule/', schedule_views.StudentAvailabilityView.as_view(), name='student-schedule'),
    path('club-profile-image/', image_views.ClubProfileImageView.as_view(), name='club-profile-image'),
    path('club-banner-image/', image_views.ClubProfileBannerView.as_view(), name='club-banner-image'),

    path('get-week-events/', discover_view.get_events_this_week, name='get-week-events'),

    path('get-spirit-points/', spirit_views.get_spirit_points, name='get_spirit_points'),
    path('get-top-students/', spirit_views.get_top_students, name='get_top_students'),
]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# That last little bit was added so that the media folder would be public and allow for files to be sent there
