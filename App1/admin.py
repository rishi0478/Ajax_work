from django.contrib import admin
from .models import User_data
# Register your models here.

@admin.register(User_data)

class StudentRegistration(admin.ModelAdmin):
    list_display = ['name','email','password']