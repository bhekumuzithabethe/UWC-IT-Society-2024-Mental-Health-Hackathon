from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
#User Model   
class User(AbstractUser):
    user_type = models.CharField(max_length=50,default='1')
    profile_pic = models.ImageField(upload_to='profile pictures')
    date_created = models.DateField(auto_now_add=True)
    date_modified = models.DateField(auto_now=True)

    def __str__(self):
        return self.username
    