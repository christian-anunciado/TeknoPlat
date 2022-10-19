from django.urls import path
from . import views

urlpatterns = [
    path('routes', views.getRoutes, name="routes"),
    path('sample', views.getSampleModel, name="sample"),
    path('users', views.getUserModel, name="users"),
    path('add', views.addUserModel, name="addUsers")
]
