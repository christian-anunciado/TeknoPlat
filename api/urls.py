from django.urls import path
from . import views

urlpatterns = [
    path('routes', views.getRoutes, name="routes"),
    path('sample', views.getSampleModel, name="sample"),
    path('joinsession', views.getAllSessionModel, name="joinsession"),
    path('joinsession/<str:pk>', views.getSessionModel, name = "joinsession-filter"),
    path('addsession', views.setSessionModel, name="addsession"),
]
