from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import SampleModel
from .serializers import SampleModelSerializer


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
