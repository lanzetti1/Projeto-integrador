import random
from socket import AF_KEY
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse
from django.db.models import Max
from django.contrib.auth.decorators import login_required
from pkg_resources import add_activation_listener
from json import dumps

from .models import User, Score

# renders home page
def index(request):
    typesOfExercise = ["soma", "subtracao", "multiplicacao", "divisao", "aleatorio"]
    return render(request, "mathFarmApp/index.html", {
        "typesOfExercise": typesOfExercise
    })

def exercise(request, type):
    user_points = len(Score.objects.filter(student=request.user))
    print(user_points)
    # print(request.method)
    if request.method == "POST":
        data = request.POST
        print(data)
        # print(data["type"])
        if request.user.is_authenticated and (data["action"] == "point"):
            # print("is auth")
            # print("got a point")
            student_id = request.user
            type_of_exercise = data["type"]
            # print(type_of_exercise)
            score = Score(student=student_id, type_of_exercise=type_of_exercise, points=1)
            score.save()
        return render(request, "mathFarmApp/exercise.html", {
            "type": data["type"], 
            "verb": data["verb"],
            "user_points": user_points
        })

    typesOfExercise = ["soma", "subtracao", "multiplicacao", "divisao", "aleatorio"]
    verbs = ["mais", "menos", "vezes", "dividido por"]
    if type == typesOfExercise[0]:
        verb = verbs[0]
    elif type == typesOfExercise[1]:
        verb = verbs[1]
    elif type == typesOfExercise[2]:
        verb = verbs[2]
    elif type == typesOfExercise[3]:
        verb = verbs[3]
    else:
        randomNumber = random.randint(0, 3)
        type = typesOfExercise[randomNumber]
        verb = verbs[randomNumber]

    return render(request, "mathFarmApp/exercise.html", {
        "type": type, 
        "verb": verb,
        "user_points": user_points
    })



# BLOCKS OF CODE RELATED WITH LOGIN

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "mathFarmApp/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "mathFarmApp/login.html")

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

# displays a registration form to the user, and creates a new user when the form is 
# submitted
def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "mathFarmApp/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "mathFarmApp/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "mathFarmApp/register.html")