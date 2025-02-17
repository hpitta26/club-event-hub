from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Student

class StudentCreationForm(UserCreationForm):
    email = forms.EmailField(required=True)
    major = forms.CharField(required=False)
    graduation_year = forms.IntegerField(required=False)
    
    class Meta:
        model = User
        fields = ("username", "email", "password1", "password2", "first_name", "last_name")
    
    def clean_email(self):
        email = self.cleaned_data['email']
        if not email.endswith('@fiu.edu'):
            raise forms.ValidationError('Must use an FIU email address')
        return email

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data["email"]
        
        if commit:
            user.save()
            # Create associated Student profile
            student = Student.objects.create(
                user=user,
                major=self.cleaned_data.get('major'),
                graduation_year=self.cleaned_data.get('graduation_year')
            )
        return user

class LoginForm(forms.Form):
    school_email = forms.EmailField()
    password = forms.CharField(widget=forms.PasswordInput)

class UserSettingsForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']