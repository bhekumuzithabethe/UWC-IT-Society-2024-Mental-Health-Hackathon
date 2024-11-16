from django.shortcuts import render,redirect
from django.contrib.auth import (
    login,
    logout,
    authenticate
    )

from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import *
from core.models import *

# Create your views here.


def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = request.POST['username']
            password = request.POST['password']
            user = authenticate(username=username,password=password)

            if User.objects.filter(username=username).exists() and User.objects.filter(password=password).exists:
                if user is not None:
                    login(request,user)
                    return redirect('home')
                else:
                    messages.error(request, "Invalid username or password.")
                    return redirect('dologin')
            else:
               messages.error(request, "Username does not exist.")
               return redirect('dologin')            
        else:
            messages.error(request, "Failed to login.")
            return redirect('dologin')
    else:
        form = LoginForm()
        return render(request,"registration/login.html",{
            'form':form,
        }) 
    

@login_required()
def logout_view(request):
    logout(request)
    return redirect('dologin')


def create_user_account(request):
    if request.method=='POST':
        form = CreateUserForm(request.POST)
        username = request.POST['username']
        password1 = request.POST['password1']
        password2 = request.POST['password2']

        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username already exists.')
            return redirect('create-user-account')
        else:
            if password1 == password2:
                new_user = form.save()
                login(request,new_user)
                return redirect('user')
            else:
                messages.error(request, "Passwords don't match.")
                return redirect('create-user-account')

    else:
        form = CreateUserForm()
        return render(request,"registration/create_user_account.html",{
            'form':form,
        })