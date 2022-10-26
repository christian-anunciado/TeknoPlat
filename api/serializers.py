from rest_framework.serializers import ModelSerializer
from .models import SampleModel
from .models import UserModel
from .models import SessionModel


class SampleModelSerializer(ModelSerializer):
    class Meta:
        model = SampleModel
        fields = '__all__'

class UserModelSerializer(ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['userID', 'firstname', 'lastname', 'email', 'username', 'password']


class SessionModelSerializer(ModelSerializer):
    class Meta:
        model = SessionModel
        fields = '__all__'