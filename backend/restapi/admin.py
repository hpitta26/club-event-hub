from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Club, Student, Event, CustomUser
from .forms import CustomUserCreationForm, CustomUserChangeForm

class ClubAdmin(admin.ModelAdmin):
    list_display = ('get_email', 'club_name', 'description', 'spirit_rating')
    search_fields = ('user__email',)

    def get_email(self, obj):
        return obj.user.email
    get_email.short_description = 'Email'

class StudentAdmin(admin.ModelAdmin):
    list_display = ('get_email', 'first_name', 'last_name', 'major', 'graduation_year')
    search_fields = ('user__email',)

    def get_email(self, obj):
        return obj.user.email
    get_email.short_description = 'Email'

class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'club', 'start_time', 'end_time', 'location')
    search_fields = ('title', 'description', 'club__user__email')

class NewUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ("email", "is_staff", "is_active", "role", "is_email_verified", "created_at", "updated_at")
    list_filter = ("email", "is_staff", "is_active", "role", "is_email_verified", "created_at", "updated_at")
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Permissions", {"fields": ("is_staff", "is_active", "groups", "user_permissions")}),
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