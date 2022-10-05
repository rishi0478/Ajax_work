from pyexpat import model
from django.db import models

# Create your models here.

class User_data(models.Model):
    name = models.CharField(max_length=34)
    email = models.EmailField()
    password = models.CharField(max_length=14)
    
