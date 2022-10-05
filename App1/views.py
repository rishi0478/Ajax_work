from tkinter.font import names
from urllib import request
from django.shortcuts import render,redirect
from .models import User_data
from App1.form import StudentForm
from .models import User_data
from django.http import JsonResponse


# Create your views here.

def create_user(request):
    if request.method =="GET":
        my = StudentForm()
        stu = User_data.objects.all()

        return render(request,'index.html',{'form':my,"data":stu})
    elif request.method == "POST":
        form_template = StudentForm(request.POST)
        if form_template.is_valid():
            u_id = request.POST.get('my_id')
            # print(u_id)
            name = request.POST.get('name')
            email = request.POST.get('email')
            password = request.POST.get('password')

            if u_id == '':
                data = User_data.objects.create(name = name , email=email , password = password)
                data.save()
            else:
                data = User_data(id = u_id ,name = name , email=email , password = password)
                data.save()

            details = User_data.objects.values()
            user_details = list(details)


            return JsonResponse({"status":"save",'raw_data':user_details})

        else:
            return JsonResponse({"status":"Invalid data"})

def delete_function(request):
    if request.method == "POST":

        id = request.POST.get("unique_key")
        print(id)
        get_instance = User_data.objects.get(id = id)
        get_instance.delete()
        return JsonResponse({"Status":1})

def edit_function(request):
    id = request.GET.get('key')
    print(id," Edit id of particular user")
    instance = User_data.objects.get(id = id)
    print(instance)
    raw_data = {"id":instance.id,"name":instance.name,"email":instance.email,"password":instance.password}
    print((raw_data))
    return JsonResponse({"response":raw_data})


    
