from unittest.util import _MAX_LENGTH
from django.db import models

# Create your models here.


class SampleModel(models.Model):
    modelBody = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.modelBody[0:50]

class UserModel(models.Model):
    userID = models.AutoField(primary_key=True)
    firstname = models.TextField(max_length=50)
    lastname = models.TextField(max_length = 20)
    email = models.TextField(max_length = 30)
    username= models.TextField(max_length = 15)
    password = models.TextField(max_length = 15)
