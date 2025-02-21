from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator


class Club(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='club_profile') # Extend django auth User model
    # User -->  username, password, first_name, last_name, email
    # is_staff, is_active, is_superuser, last_login, date_joined

    # profile_picture = models.ImageField(upload_to='club_profiles/', blank=True, null=True)
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True) # possibly change to required --> depending on form in the frontend
    social_media_handles = models.JSONField(blank=True, null=True)
    spirit_rating = models.PositiveIntegerField(default=1, validators=[MinValueValidator(0), MaxValueValidator(100)])

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def upcoming_events(self):
        return self.events.filter(start_time__gte=timezone.now())
    
    @property
    def passed_events(self):
        return self.events.filter(start_time__lt=timezone.now())
    
    def __str__(self):
        return self.name
    


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile') # Extend django auth User model
    # User -->  username, password, first_name, last_name, email
    # is_staff, is_active, is_superuser, last_login, date_joined

    # profile_picture = models.ImageField(upload_to='student_profiles/', blank=True, null=True)
    major = models.CharField(max_length=255, blank=True, null=True)
    graduation_year = models.PositiveIntegerField(blank=True, null=True, validators=[MinValueValidator(timezone.now().year)])
    spirit_points = models.PositiveIntegerField(default=0)
    
    email_verified = models.BooleanField(default=False)
    verification_token = models.CharField(max_length=100, blank=True)
    password_change_token = models.CharField(max_length=100, blank=True)
    password_change_pending = models.BooleanField(default=False)
    new_password_hash = models.CharField(max_length=128, blank=True)

    # admin --> is an admin of a specfic club

    following_clubs = models.ManyToManyField(Club, related_name='followers', blank=True) # accessible through Club as followers

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.username



class Event(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='events') # accessible through Club as events
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    location = models.CharField(max_length=255)
    capacity = models.PositiveIntegerField()
    # picture = models.ImageField(upload_to='event_thumbnails/', blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # private/public boolean
    # tags --> type of event

    rsvps = models.ManyToManyField(Student, related_name='rsvp_events', blank=True) # accessible through Student as rsvp_events

    def __str__(self):
        return self.title

    # Other Potential Ideas:
    # expanded_card --> could be MarkDown file (allows for customizability like notion, obsidian, ...)





# ---- Additional Fields ----:
# blank=False --> required field (default)
# blank=True --> optional field

# null=False --> null not allowed (default)
# null=True --> null allowed