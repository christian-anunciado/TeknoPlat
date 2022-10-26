from datetime import datetime
import email
from msilib.schema import SelfReg
from multiprocessing import AuthenticationError
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import SampleModel
from .models import SessionModel
from .serializers import SampleModelSerializer
from .models import UserModel
from .serializers import UserModelSerializer
from .serializers import SessionModelSerializer
import jwt, datetime


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



@api_view(['POST'])
def addUserModel(request):
    serializeUser = UserModelSerializer(data=request.data)
    if serializeUser.is_valid():
        serializeUser.save()
        return Response(200)
    return Response(serializeUser.errors)

@api_view(['POST'])
def authUser(request):
    email = request.data['email']
    password = request.data['password']

    user = UserModel.objects.filter(email=email).first()

    if user is None:
        return Response("User not found")

    if not user.password:
        return Response("Incorrect password")

    payload = {
        'id': user.userID,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
        'iat': datetime.datetime.utcnow()
    }

    token = jwt.encode(payload, 'secret', algorithm='HS256')

    res = Response()

    res.set_cookie(key='jwt', value = token, httponly = True)
    res.data = {
        'jwt':token
    }

    return res

@api_view(['GET'])
def getAuthUser(request):
    token = request.COOKIES.get('jwt')

    if not token:
        Response("Unauthenticated")

    try:
        payload = jwt.decode(token, 'secret', algorithms = ['HS256'])
    except jwt.ExpiredSignatureError:
        Response("Unauthenticated")
    
    user = UserModel.objects.filter(userID=payload['id']).first()
    serializer = UserModelSerializer(user)
    return Response(serializer.data)

@api_view(['POST'])
def logout(reqest):
    response = Response()
    response.delete_cookie('jwt')
    response.data = {
        'message':'successfully logged out'
    }
    return response

#SessionModel

@api_view(['GET'])
def getAllSessionModel(request):
    sessionModel = SessionModel.objects.all()
    sessionSerializer = SessionModelSerializer(sessionModel, many=True)
    return Response(sessionSerializer.data)


@api_view(['GET'])
def getSessionModel(request, pk):
    sessionModel = SessionModel.objects.filter(id = pk)
    sessionSerializer = SessionModelSerializer(sessionModel, many=True)
    return Response(sessionSerializer.data)



@api_view(['POST'])
def setSessionModel(request):
    serializeUser = SessionModelSerializer(data=request.data)
    if serializeUser.is_valid():
        serializeUser.save()
        return Response()
    return Response(serializeUser.errors)
    