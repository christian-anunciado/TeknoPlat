from unittest.util import _MAX_LENGTH
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

# Create your models here.


class SampleModel(models.Model):
    modelBody = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.modelBody[0:50]


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password, **extra_fields):
        email = self.normalize_email(email)

        user = self.model(email=email, **extra_fields)

        user.set_password(password)

        user.save()

        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser has to have is_staff being True")

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser has to have is_superuser being True")

        return self.create_user(email=email, password=password, **extra_fields)


class UserModel(AbstractUser):
    email = models.CharField(max_length=80, unique=True)
    username = models.CharField(max_length=45, null=True)
    institute = models.CharField(max_length=45, null=True)

    objects = CustomUserManager()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

# class UserModel(AbstractUser):
#     userID = models.AutoField(primary_key=True)
#     firstname = models.TextField(max_length=50)
#     lastname = models.TextField(max_length=20)
#     email = models.TextField(max_length=30, unique=True)
#     institute = models.TextField(max_length=100, default='None')
#     username = None
#     password = models.TextField(max_length=15)


#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = []

class SessionModel(models.Model):
    STATUS = [
        (1, "Active"),
        (0, "Inactive"),
    ]
    id = models.AutoField(primary_key=True)
    creator = models.ForeignKey(
        UserModel, on_delete=models.CASCADE, null=True)
    sessionID = models.CharField(max_length=250, null=False)
    sessionName = models.CharField(max_length=30, null=False)
    sessionDescription = models.TextField(max_length=250, null=False)
    sessionPassword = models.CharField(max_length=30, blank=True, null=True)
    searchID = models.TextField(max_length=30, blank=True, null=True)
    status = models.IntegerField(null=True, choices=STATUS, default=0)
    startsAt = models.DateTimeField(null=True)

    def __str__(self):
        return self.sessionName

    class Meta:
        verbose_name = "Session Name"
        verbose_name_plural = "Session Rooms"


class RatingModel(models.Model):
    punctuality = models.IntegerField(null=True)
    presentation = models.IntegerField(null=True)
    delivery = models.IntegerField(null=True)
    innovativeness = models.IntegerField(null=True)
    feedback = models.CharField(max_length=500)
    # creator = models.ForeignKey(UserModel, on_delete = models.CASCADE, null = True)
    # sessionID = models.ForeignKey(SessionModel, on_delete = models.CASCADE, null = True)

class AverageRatingModel(models.Model):
    AveragePunctuality = models.FloatField(null=True)
    AveragePresentation = models.FloatField(null=True)
    AverageDelivery = models.FloatField(null=True)
    AverageInnovativeness = models.FloatField(null=True)
    sessionID = models.ForeignKey(SessionModel, on_delete = models.CASCADE, null = True)

    