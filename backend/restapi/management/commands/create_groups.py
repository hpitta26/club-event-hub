from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth.models import Group, Permission

class Command(BaseCommand):
    help = 'Creates group permissions'

    def handle(self, *args, **options):
        club_group, created_club = Group.objects.get_or_create(name='CLUB')
        if (created_club):
            change_club = Permission.objects.get(codename='change_club')
            view_club = Permission.objects.get(codename='view_club')
            view_event = Permission.objects.get(codename='view_event')
            change_event = Permission.objects.get(codename='change_event')
            delete_event = Permission.objects.get(codename='delete_event')

            club_group.permissions.add(change_club)
            club_group.permissions.add(view_club)
            club_group.permissions.add(view_event)
            club_group.permissions.add(change_event)
            club_group.permissions.add(delete_event)
            self.stdout.write(self.style.SUCCESS('Successfully created CLUB group!'))

        student_group, created_student = Group.objects.get_or_create(name='STUDENT')
        if (created_student):
            view_student = Permission.objects.get(codename='view_student')
            change_student = Permission.objects.get(codename='change_student')
            view_club = Permission.objects.get(codename='view_club')
            view_event = Permission.objects.get(codename='view_event')

            student_group.permissions.add(view_student)
            student_group.permissions.add(view_club)
            student_group.permissions.add(change_student)
            student_group.permissions.add(view_event)

            self.stdout.write(self.style.SUCCESS('Successfully created STUDENT group!'))

        admin_group, created_admin = Group.objects.get_or_create(name='ADMIN')
        if (created_admin):
            view_student = Permission.objects.get(codename='view_student')
            view_club = Permission.objects.get(codename='view_club')
            view_customuser = Permission.objects.get(codename='view_customuser')
            view_event = Permission.objects.get(codename='view_event')

            change_student = Permission.objects.get(codename='change_student')
            change_club = Permission.objects.get(codename='change_club')
            change_customuser = Permission.objects.get(codename='change_customuser')
            change_event = Permission.objects.get(codename='change_event')

            delete_student = Permission.objects.get(codename='delete_student')
            delete_club = Permission.objects.get(codename='delete_club')
            delete_customuser = Permission.objects.get(codename='delete_customuser')
            delete_event = Permission.objects.get(codename='delete_event')

            admin_group.permissions.add(view_student)
            admin_group.permissions.add(view_club)
            admin_group.permissions.add(view_customuser)
            admin_group.permissions.add(view_event)

            admin_group.permissions.add(change_student)
            admin_group.permissions.add(change_club)
            admin_group.permissions.add(change_customuser)
            admin_group.permissions.add(change_event)

            admin_group.permissions.add(delete_student)
            admin_group.permissions.add(delete_club)
            admin_group.permissions.add(delete_customuser)
            admin_group.permissions.add(delete_event)

            self.stdout.write(self.style.SUCCESS('Successfully created ADMIN group!'))
    