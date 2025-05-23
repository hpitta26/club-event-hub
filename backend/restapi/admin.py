from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Club, Student, Event, CustomUser
from .forms import CustomUserCreationForm, CustomUserChangeForm

class ClubAdmin(admin.ModelAdmin):
    list_display = ('get_email', 'club_name', 'is_account_verified', 'description', 'spirit_rating')
    search_fields = ('user__email',)

    def get_email(self, obj):
        return obj.user.email
    get_email.short_description = 'Email'

class StudentAdmin(admin.ModelAdmin):
    list_display = ('get_email', 'major', 'graduation_year', 'spirit_points', 'get_following_clubs')
    search_fields = ('user__email',)
    filter_horizontal = ('following_clubs',)
    fields = ('user', 'major', 'graduation_year', 'spirit_points', 'following_clubs')

    def get_email(self, obj):
        return obj.user.email
    get_email.short_description = 'Email'

    def get_following_clubs(self, obj):
        return ", ".join([club.club_name for club in obj.following_clubs.all()]) if obj.following_clubs.exists() else "None"
    get_following_clubs.short_description = 'Following Clubs'

class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'club', 'start_time', 'end_time', 'location')
    search_fields = ('title', 'description', 'club__user__email')

class NewUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ("id", "email", "is_staff", "is_active", "is_email_verified", "created_at", "updated_at")
    list_filter = ("email", "is_staff", "is_active", "is_email_verified", "created_at", "updated_at")
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Permissions", {"fields": ("is_staff", "is_active", "is_email_verified", "groups", "user_permissions")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "email", "password1", "password2", "is_staff",
                "is_active", "groups", "user_permissions"
            )}
        ),
    )
    search_fields = ("email",)
    ordering = ("email",)

admin.site.register(CustomUser, NewUserAdmin)
admin.site.register(Club, ClubAdmin)
admin.site.register(Student, StudentAdmin)
admin.site.register(Event, EventAdmin)