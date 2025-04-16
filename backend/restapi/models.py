"""
describes model database model objects

Returns:
    Club: club object
    Student: user object
    Event: event object
"""

from django.db import models
from django.db.models import JSONField
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import AbstractUser
from django.utils.text import slugify
from .manager import CustomUserManager
import uuid
from django.contrib.auth.models import Permission, Group

class CustomUser(AbstractUser):
    username = None
    first_name = None
    last_name = None
    email = models.EmailField("email address", unique=True)

    is_email_verified = models.BooleanField(default=False)
    verification_token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
    

def club_directory_path(instance, filename):
    club_name_slug = slugify(instance.club_name)
    return f'{club_name_slug}/{filename}'


class Club(models.Model):
    user = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE, related_name='club_profile', primary_key=True # Link the pks
    )

    club_name = models.CharField(max_length=255, unique=True)    

    club_picture = models.FileField(
        upload_to=club_directory_path,
        # default='images/default-banner.png' ,
        blank=True, 
        null=True
    )
    club_banner = models.FileField(
        upload_to=club_directory_path,
        # default='images/default-banner.png',  
        blank=True, 
        null=True
    )
    description = models.TextField(blank=True, null=True)  # possibly change to required --> depending on form in the frontend
    slug = models.SlugField(unique=True, blank=True)
    social_media_handles = models.JSONField(blank=True, null=True)
    spirit_rating = models.PositiveIntegerField(
        default=1, validators=[MinValueValidator(0), MaxValueValidator(100)]
    )
    is_account_verified = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        club_group = Group.objects.get(name='CLUB')
        self.user.groups.add(club_group)
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
    spirit_points = models.PositiveIntegerField(default=10)

    password_change_token = models.CharField(max_length=100, blank=True)
    password_change_pending = models.BooleanField(default=False)
    new_password_hash = models.CharField(max_length=128, blank=True)
    profile_picture = models.URLField(max_length=500, blank=True, null=True) # Only supports selecting from preset dummy images

    availability = models.JSONField(blank=True, null=True)

    # admin --> is an admin of a specfic club

    following_clubs = models.ManyToManyField(
        Club, related_name='followers', blank=True
    )  # accessible through Club as followers
    
    def save(self, *args, **kwargs):
        student_group = Group.objects.get(name='STUDENT')
        self.user.groups.add(student_group)
        super().save(*args,**kwargs)


    def __str__(self):
        return str(self.user.email)

    def delete(self, *args, **kwargs):
        self.user.delete()
        super().delete(*args, **kwargs)




ALLOWED_TAGS = ["Technology","Medical","Career","Fitness","Social","Wellness","Culture","Politics","Volunteer"]
def validate_tags(tag_list):
    if not isinstance(tag_list, list):
        raise TypeError("Tags must be a list")
    for tag in tag_list:
        if tag not in ALLOWED_TAGS:
            raise ValueError(f"{tag} is not a valid tag. Tag must be one of {ALLOWED_TAGS}")

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
    profilepicture = models.ImageField(
        upload_to='club_profilepic/', blank=True, null=True
    )
    profilebanner = models.ImageField(
        upload_to='club_banner/', blank=True, null=True
    )

    # private/public boolean
    # tags --> type of event

    tags=JSONField(
        blank=True, validators=[validate_tags],default=list
    )

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
