from django.urls import path
from . import views


urlpatterns = [
    path('routes', views.getRoutes, name="routes"),
    path('sample', views.getSampleModel, name="sample"),
    path('users', views.getUserModel, name="users"),
    path('add', views.addUserModel, name="addUsers"),
    path('auth', views.authUser, name="auth"),
    path('authUser', views.getAuthUser, name="authUser"),
    path('addSession', views.setSessionModel, name="addSession"),
    path('joinsession', views.getAllSessionModel, name="joinsession"),
    path('joinsession/<str:pk>', views.getSessionModel, name="joinsession-filter"),
    path('logout', views.logout, name="logout")
]
