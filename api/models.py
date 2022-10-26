from email.policy import default
from enum import unique
from unittest.util import _MAX_LENGTH
from django.db import models

# Create your models here.


class SampleModel(models.Model):
    modelBody = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.modelBody[0:50]

class SessionModel(models.Model):
    id = models.AutoField(primary_key = True)
    userID = models.IntegerField(blank = True, null = True)
    sessionID = models.IntegerField(blank = True, null = True)
    sessionName = models.CharField(max_length = 30)
    sessionDescription = models.TextField(max_length = 250)
    sessionPassword = models.CharField(max_length = 30)
    searchID = models.IntegerField(blank = True, null = True)
    status = models.IntegerField(blank = True, null = True)
    startsAt = models.DateTimeField(auto_now=True)
    endsAt = models.DateTimeField(auto_now=True)
