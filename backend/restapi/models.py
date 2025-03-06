"""
describes model database model objects

Returns:
    Club: club object
    Student: user object
    Event: event object
"""

from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify
from .manager import CustomUserManager
import uuid




class CustomUser(AbstractUser):
    username = None
    first_name = None
    last_name = None
    email = models.EmailField("email address", unique=True)
    ADMIN = 'ADMIN'
    STUDENT = 'STUDENT'
    CLUB = 'CLUB'

    is_email_verified = models.BooleanField(default=False)
    verification_token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    ROLE_CHOICES = (
        (ADMIN, 'Admin'),
        (STUDENT, 'Student'),
        (CLUB, 'Club'),
    )

    role = models.CharField(
        max_length=10,
        choices=ROLE_CHOICES,
        default=STUDENT
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email




class Club(models.Model):
    user = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE, related_name='club_profile'
    )

    # profile_picture = models.ImageField(
    #     upload_to='club_profiles/', blank=True, null=True
    # )
    club_name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)  # possibly change to required --> depending on form in the frontend
    slug = models.SlugField(unique=True, blank=True)
    social_media_handles = models.JSONField(blank=True, null=True)
    spirit_rating = models.PositiveIntegerField(
        default=1, validators=[MinValueValidator(0), MaxValueValidator(100)]
    )

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.club_name)
        super().save(*args,**kwargs)

    @property
    def upcoming_events(self):
        return self.events.filter(start_time__gte=timezone.now())

    @property
    def passed_events(self):
        return self.events.filter(start_time__lt=timezone.now())

    def __str__(self):
        return str(self.club_name)

    def delete(self, *args, **kwargs):
        self.user.delete()
        super().delete(*args, **kwargs)




class Student(models.Model):
    user = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE, related_name='student_profile', primary_key=True # Link the pks
    )

    # profile_picture = models.ImageField(
    #     upload_to='student_profiles/', blank=True, null=True
    # )

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    major = models.CharField(max_length=255, blank=True, null=True)
    graduation_year = models.PositiveIntegerField(blank=True, null=True) # current_year =< grad_year =< current_year + 4
    spirit_points = models.PositiveIntegerField(default=0)

    password_change_token = models.CharField(max_length=100, blank=True)
    password_change_pending = models.BooleanField(default=False)
    new_password_hash = models.CharField(max_length=128, blank=True)

    # admin --> is an admin of a specfic club

    following_clubs = models.ManyToManyField(
        Club, related_name='followers', blank=True
    )  # accessible through Club as followers

    def __str__(self):
        return str(self.user.email)

    def delete(self, *args, **kwargs):
        self.user.delete()
        super().delete(*args, **kwargs)




class Event(models.Model):
    club = models.ForeignKey(
        Club, on_delete=models.CASCADE, related_name='events'
    )  # accessible through Club as events

    title = models.CharField(max_length=255)
    description = models.TextField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    location = models.CharField(max_length=255)
    capacity = models.PositiveIntegerField()
    # picture = models.ImageField(
    #     upload_to='event_thumbnails/', blank=True, null=True
    # )

    # private/public boolean
    # tags --> type of event

    rsvps = models.ManyToManyField(
        Student, related_name='rsvp_events', blank=True
    )  # accessible through Student as rsvp_events

    def __str__(self):
        return str(self.title)

    # Other Potential Ideas:
    # expanded_card --> could be MarkDown file
    # (allows for customizability like notion, obsidian, ...)




# ---- Additional Fields ----:
# blank=False --> required field (default)
# blank=True --> optional field

# null=False --> null not allowed (default)
# null=True --> null allowed
