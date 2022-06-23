from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class User(AbstractUser):
    pass

    def __str__(self):
        return f"{self.id}: {self.username}"

class Score(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name="student")
    type_of_exercise = models.CharField(max_length=280)
    points = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.student} has scored in {self.type_of_exercise}"