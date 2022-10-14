from rest_framework.serializers import ModelSerializer
from .models import SampleModel


class SampleModelSerializer(ModelSerializer):
    class Meta:
        model = SampleModel
        fields = '__all__'
