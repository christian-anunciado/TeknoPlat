from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('routes', views.getRoutes, name="routes"),
    path('sample', views.getSampleModel, name="sample"),
    path('users', views.getUserModel, name="users"),
    path('signup', views.addUserModel, name="signup"),
    path('auth', views.authUser, name="auth"),
    path('authUser', views.getAuthUser, name="authUser"),
    path('addSession', views.setSessionModel, name="addSession"),
    path('getRatings', views.getRateModel, name="getRatings"),
    path('updateRating/<str:pk>', views.update_Rating, name="updateRating"),
    path('rateSession', views.addRateModel, name="rateSession"),
    path('getAverageRatings', views.getAverageRatingModel,
         name="getAverageRatings"),
    path('averageRatingsSession', views.setAverageRatingModel,
         name="averageRatingsSession"),
    path('joinsession', views.getAllSessionModel, name="joinsession"),
    path('joinsession/<str:pk>', views.getSessionModel, name="joinsession-filter"),
    path('logout', views.logout, name="logout"),
    path('sessions', views.getAllSessionModel, name="sessions"),
    path('managementToken', views.generateManagementToken,
         name="getManagementToken"),
    path('generateAppToken', views.generateAppToken,
         name="generateAppToken"),
    path('get100MsKeys', views.get100MsKeys,
         name="get100MsKeys"),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
