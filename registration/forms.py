from django import forms
from django.contrib.auth.forms import UserCreationForm,UserChangeForm
from core.models import *
  
class LoginForm(forms.Form):

    username = forms.CharField(widget=forms.TextInput())
    password = forms.CharField(widget=forms.PasswordInput())

class CreateUserForm(UserCreationForm):
    
    class Meta:
        model =User
        fields =('username','password1','password2')
