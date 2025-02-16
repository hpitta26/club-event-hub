from django.urls import path
from .views import EventListCreateView, EventDetailView, ClubListCreateView, ClubDetailView, StudentListCreateView, StudentDetailView

urlpatterns = [
    path('events/', EventListCreateView.as_view(), name='event-list-create'),
    path('events/<int:pk>/', EventDetailView.as_view(), name='event-detail'),
    path('clubs/', ClubListCreateView.as_view(), name='club-list-create'),
    path('clubs/<int:pk>/', ClubDetailView.as_view(), name='club-detail'),
    path('students/', StudentListCreateView.as_view(), name='student-list-create'),
    path('students/<int:pk>/', StudentDetailView.as_view(), name='student-detail')
]
