from datetime import datetime
import email
from msilib.schema import SelfReg
from multiprocessing import AuthenticationError
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import SampleModel
from .models import SessionModel
from .serializers import SampleModelSerializer
from .models import UserModel
from .serializers import UserModelSerializer
from .serializers import SessionModelSerializer
from .models import RatingModel
from .serializers import RatingModelSerializer
from .models import AverageRatingModel
from .serializers import AverageRatingModelSerializer
from .serializers import ReportModelSerializer
from django.db.models import Avg
import jwt
import datetime
import uuid
from django.conf import settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


# Learn more about django_rest_framework here:
# https://www.django-rest-framework.org/


# Create your views here.

# Sample API
@api_view(['GET'])
def getRoutes(request):

    routes = [
        {
            'Endpoint': '/teknoplat/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of teknoplat'
        },
        {
            'Endpoint': '/teknoplat/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single session object'
        },
        {
            'Endpoint': '/teknoplat/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new session with data sent in post request'
        },
        {
            'Endpoint': '/teknoplat/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing session with data sent in post request'
        },
        {
            'Endpoint': '/teknoplat/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting session'
        },
    ]

    return Response(routes)


@api_view(['GET'])
def getSampleModel(request):
    sampleModel = SampleModel.objects.all()
    serializer = SampleModelSerializer(sampleModel, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getUserModel(request):
    userModel = UserModel.objects.all()
    serializer = UserModelSerializer(userModel, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getSingleUser(request, pk):
    userModel = UserModel.objects.filter(id=pk)
    userSerializer = UserModelSerializer(userModel, many=True)
    return Response(userSerializer.data)


@api_view(['PUT'])
def updateUser(request, pk):
    userModel = UserModel.objects.get(id=pk)
    serializer = UserModelSerializer(
        userModel, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        print(serializer.errors)
        return Response(serializer.errors, status=400)


@api_view(['POST'])
def addUserModel(request):
    serializeUser = UserModelSerializer(data=request.data)
    if serializeUser.is_valid():
        serializeUser.save()
        return Response(200)
    return Response(serializeUser.errors)


# SessionModel


@api_view(['GET'])
def getAllSessionModel(request):
    sessionModel = SessionModel.objects.all()
    sessionSerializer = SessionModelSerializer(sessionModel, many=True)
    return Response(sessionSerializer.data)


@api_view(['GET'])
def getSessionModel(request, pk):
    sessionModel = SessionModel.objects.filter(searchID=pk)
    sessionSerializer = SessionModelSerializer(sessionModel, many=True)
    return Response(sessionSerializer.data)


@api_view(['GET'])
def getSessionByCreator(request, pk):
    sessionModel = SessionModel.objects.filter(creator=pk)
    sessionSerializer = SessionModelSerializer(sessionModel, many=True)
    return Response(sessionSerializer.data)


@api_view(['POST'])
def setSessionModel(request):
    serializeUser = SessionModelSerializer(data=request.data)
    if serializeUser.is_valid():
        serializeUser.save()
        return Response()
    return Response(serializeUser.errors)


@api_view(['PUT'])
def updateSession(request, pk):
    session = SessionModel.objects.get(id=pk)

    serializer = SessionModelSerializer(
        session, data=request.data, partial=True)
    if not serializer.is_valid():
        print(serializer.error)
        return Response(serializer.error)

    serializer.save()
    return Response(200)


@api_view(['GET'])
def getRateModel(request, pk):
    userModel = RatingModel.objects.filter(sessionID=pk)
    serializer = RatingModelSerializer(userModel, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getSingleRateModel(request, Upk, Spk):
    userModel = RatingModel.objects.filter(sessionID=Spk, creator=Upk)
    serializer = RatingModelSerializer(userModel, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def addReportModel(request):
    serializeUser = ReportModelSerializer(data=request.data)
    if serializeUser.is_valid():
        serializeUser.save()
        return Response()
    return Response(serializeUser.errors)


@api_view(['POST'])
def addRateModel(request):
    serializeUser = RatingModelSerializer(data=request.data)
    if serializeUser.is_valid():
        serializeUser.save()
        return Response(serializeUser.data)
    return Response(serializeUser.errors)


@api_view(['PUT'])
def update_Rating(request, pk):
    rate = RatingModel.objects.get(id=pk)

    rateSerializer = RatingModelSerializer(
        rate, data=request.data, partial=True)
    if not rateSerializer.is_valid():
        print(rateSerializer.error)
        return Response(rateSerializer.error)

    rateSerializer.save()
    return Response(200)


@api_view(['GET'])
def getAverageRatingModel(request, pk):
    userModel = AverageRatingModel.objects.filter(sessionID=pk)
    serializer = AverageRatingModelSerializer(userModel, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def setAverageRatingModel(request):
    sessionId = request.data['sessionID']
    rate = RatingModel.objects.filter(sessionID=sessionId).all()

    if rate is None:
        raise AuthenticationError("There are no rating in this session")

    serializer = AverageRatingModelSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors)


@api_view(['GET'])
def get100MsKeys(request):
    keys = {
        'APP_KEY_100MS': settings.APP_KEY_100MS,
        'SECRET_KEY_100MS': settings.SECRET_KEY_100MS,
    }
    return Response(keys)


@api_view(['GET'])
def generateManagementToken(request):
    app_access_key = settings.APP_KEY_100MS
    app_secret = settings.SECRET_KEY_100MS
    expires = 24 * 3600
    now = datetime.datetime.utcnow()
    exp = now + datetime.timedelta(seconds=expires)

    management_token = jwt.encode(payload={
        'access_key': app_access_key,
        'type': 'management',
        'version': 2,
        'jti': str(uuid.uuid4()),
        'iat': now,
        'exp': exp,
        'nbf': now
    }, key=app_secret)

    return Response(management_token)


@api_view(['POST'])
def generateAppToken(request):
    res = request.data
    app_access_key = settings.APP_KEY_100MS
    app_secret = settings.SECRET_KEY_100MS
    expires = 24 * 3600
    now = datetime.datetime.utcnow()
    exp = now + datetime.timedelta(seconds=expires)

    app_token = jwt.encode(payload={
        "access_key": app_access_key,
        "type": "app",
        "version": 2,
        "room_id": res['room_id'],
        "user_id": res['user_id'],
        "role": res['role'],
        "jti": str(uuid.uuid4()),
        "exp": exp,
        "iat": now,
        "nbf": now,
    }, key=app_secret)

    return Response(app_token)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, usermodel):
        token = super().get_token(usermodel)

        # Add custom claims
        token['username'] = usermodel.username
        token['first_name'] = usermodel.first_name
        token['last_name'] = usermodel.last_name
        token['is_superuser'] = usermodel.is_superuser
        # ...

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
