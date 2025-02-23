from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import Student, CustomUser, Club
from django.utils import timezone



class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ("email",)

    def save(self, commit=True):
        user = super().save(commit=False)
        user.is_active = False
        user.is_staff = False
        user.is_email_verified = False

        if commit:
            user.save()

        return user

class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        fields = ("email",)

class StudentCreationForm(CustomUserCreationForm):
    major = forms.CharField(required=True)
    graduation_year = forms.IntegerField(required=True)
    first_name = forms.CharField(required=True)
    last_name = forms.CharField(required=True)

    class Meta:
        model = CustomUser
        fields = ("email",)

    def clean_email(self): # check if email is valid
        email = self.cleaned_data['email']
        if not email.endswith('@fiu.edu'):
            raise forms.ValidationError('Must use an FIU email address') 
        return email
    
    def clean_graduation_year(self): # check if graduation year is valid
        graduation_year = self.cleaned_data['graduation_year']
        current_year = timezone.now().year
        valid_years = range(current_year, current_year + 5)
        if graduation_year not in valid_years:
            raise forms.ValidationError(f"Graduation year must be one of {list(valid_years)}.")
        return graduation_year

    def save(self, commit=True):
        user = super().save(commit=False)

        user.email = self.cleaned_data["email"]
        user.role = CustomUser.STUDENT

        if commit:
            user.save()
            # Create associated Student profile
            Student.objects.create(
                user=user,
                first_name=self.cleaned_data.get('first_name'),
                last_name=self.cleaned_data.get('last_name'),
                major=self.cleaned_data.get('major'),
                graduation_year=self.cleaned_data.get('graduation_year')
            )
        return user


class ClubCreationForm(CustomUserCreationForm):
    club_name = forms.CharField(required=True)
    description = forms.CharField(required=True)

    class Meta:
        model = CustomUser
        fields = ("email",)

    def save(self, commit=True):
        user = super().save(commit=False)

        user.role = CustomUser.CLUB

        if commit:
            user.save()
            Club.objects.create(
                user=user,
                club_name=self.cleaned_data.get('club_name'),
                description=self.cleaned_data.get('description')
            )
        return user
