from django.contrib import admin
from .models import Club, Student, Event

class ClubAdmin(admin.ModelAdmin):
    list_display = ('get_username', 'get_email', 'description', 'spirit_rating')
    search_fields = ('user__username', 'user__email')

    def get_username(self, obj):
        return obj.user.username
    get_username.short_description = 'Username'

    def get_email(self, obj):
        return obj.user.email
    get_email.short_description = 'Email'

class StudentAdmin(admin.ModelAdmin):
    list_display = ('get_username', 'get_email', 'major', 'graduation_year', 'get_following_clubs')
    search_fields = ('user__username', 'user__email')
    filter_horizontal = ('following_clubs',)  # Makes club selection easier in admin panel

    def get_username(self, obj):
        return obj.user.username
    get_username.short_description = 'Username'

    def get_email(self, obj):
        return obj.user.email
    get_email.short_description = 'Email'

    def get_following_clubs(self, obj):
        return ", ".join([club.name for club in obj.following_clubs.all()]) if obj.following_clubs.exists() else "None"
    get_following_clubs.short_description = 'Following Clubs'

class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'club', 'start_time', 'end_time', 'location')
    search_fields = ('title', 'description', 'club__user__username')

admin.site.register(Club, ClubAdmin)
admin.site.register(Student, StudentAdmin)
admin.site.register(Event, EventAdmin)
