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
    path('user/<str:pk>', views.getSingleUser, name="user"),
    path('updateUser/<str:pk>', views.updateUser, name="updateUser"),
    path('signup', views.addUserModel, name="signup"),
    path('addSession', views.setSessionModel, name="addSession"),
    path('updateSession/<str:pk>', views.updateSession, name="updateSession"),
    path('getRatings/<str:pk>', views.getRateModel, name="getRatings"),
    path('getRating/<str:Upk>/<str:Spk>',
         views.getSingleRateModel, name="getSingleRateModel"),
    path('updateRating/<str:pk>', views.update_Rating, name="updateRating"),
    path('rateSession', views.addRateModel, name="rateSession"),
    path('getAverageRatings/<str:pk>', views.getAverageRatingModel,
         name="getAverageRatings"),
    path('averageRatingsSession', views.setAverageRatingModel,
         name="averageRatingsSession"),
    path('joinsession', views.getAllSessionModel, name="joinsession"),
    path('joinsession/<str:pk>', views.getSessionModel, name="joinsession-filter"),
    path('sessionByCreator/<str:pk>',
         views.getSessionByCreator, name="getSessionByCreator"),
    path('sessions', views.getAllSessionModel, name="sessions"),
    path('managementToken', views.generateManagementToken,
         name="getManagementToken"),
    path('generateAppToken', views.generateAppToken,
         name="generateAppToken"),
    path('get100MsKeys', views.get100MsKeys,
         name="get100MsKeys"),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('addReport', views.addReportModel, name="addReport"),
]
