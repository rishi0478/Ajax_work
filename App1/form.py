from dataclasses import fields
from pyexpat import model
from typing_extensions import Required
from django import forms
from .models import User_data
from django.forms import widgets
class StudentForm(forms.ModelForm):
    class Meta:
        model = User_data
        fields = ['name','email','password']

        widgets ={
            "name":forms.TextInput(attrs={"class":"form-control","id":"nameid"}),
            "email":forms.EmailInput(attrs={"class":"form-control","id":"emailid"}),
            "password":forms.PasswordInput(attrs={"class":"form-control","id":"passwordid"})
        }