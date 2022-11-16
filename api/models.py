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
    lastname = models.TextField(max_length=20)
    email = models.TextField(max_length=30)
    username = models.TextField(max_length=15)
    password = models.TextField(max_length=15)


class SessionModel(models.Model):
    id = models.AutoField(primary_key=True)
    userID = models.IntegerField(blank=True, null=True)
    sessionID = models.IntegerField(blank=True, null=True)
    sessionName = models.CharField(max_length=30)
    sessionDescription = models.TextField(max_length=250)
    sessionPassword = models.CharField(max_length=30)
    searchID = models.TextField(max_length=30, blank=True, null=True)
    status = models.IntegerField(blank=True, null=True)
    startsAt = models.DateTimeField(auto_now=True)
    endsAt = models.DateTimeField(auto_now=True)

class RatingModel(models.Model):
    punctuality = models.IntegerField(null = True)
    presentation = models.IntegerField(null = True)
    delivery = models.IntegerField(null = True)
    innovativeness = models.IntegerField(null = True)
    feedback = models.CharField(max_length = 500)
    userID = models.ForeignKey(UserModel, on_delete = models.CASCADE, null = True)

