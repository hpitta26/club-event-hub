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
    list_display = ('get_username', 'get_email', 'major', 'graduation_year')
    search_fields = ('user__username', 'user__email')

    def get_username(self, obj):
        return obj.user.username
    get_username.short_description = 'Username'

    def get_email(self, obj):
        return obj.user.email
    get_email.short_description = 'Email'

class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'club', 'start_time', 'end_time', 'location')
    search_fields = ('title', 'description', 'club__user__username')

admin.site.register(Club, ClubAdmin)
admin.site.register(Student, StudentAdmin)
admin.site.register(Event, EventAdmin)
