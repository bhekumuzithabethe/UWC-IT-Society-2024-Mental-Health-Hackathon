from django.urls import path
from . import views
urlpatterns = [
    path('',views.login_view,name='dologin'),
    path('dologout/',views.logout_view,name='dologout'),

    path('create-user-account/',views.create_user_account,name='create-user-account'),
    
]
