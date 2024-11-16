from django.urls import path
from .views import *
urlpatterns = [
    path('home/', chatbot, name="home"),
    path('meditation/', meditation, name="meditation"),
    path('task-management/', task_management, name="task-management"),

]
