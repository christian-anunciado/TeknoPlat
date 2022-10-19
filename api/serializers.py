from rest_framework.serializers import ModelSerializer
from .models import SampleModel, SessionModel


class SampleModelSerializer(ModelSerializer):
    class Meta:
        model = SampleModel
        fields = '__all__'


class SessionModelSerializer(ModelSerializer):
    class Meta:
        model = SessionModel
        fields = '__all__'
