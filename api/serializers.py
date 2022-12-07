from rest_framework.serializers import ModelSerializer
from .models import SampleModel
from .models import UserModel
from .models import SessionModel
from .models import RatingModel
from .models import AverageRatingModel
from rest_framework import serializers


class SampleModelSerializer(ModelSerializer):
    class Meta:
        model = SampleModel
        fields = '__all__'


class UserModelSerializer(ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    first_name = serializers.CharField(max_length=45)
    last_name = serializers.CharField(max_length=45)
    email = serializers.EmailField(required=True)
    institute = serializers.CharField(max_length=45)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = UserModel
        fields = ['id', 'first_name', 'last_name',
                  'email', 'username', 'institute', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class SessionModelSerializer(ModelSerializer):
    class Meta:
        model = SessionModel
        fields = '__all__'

    def create(self, validated_data):
        creatorID = validated_data.pop('creator')
        creator_instance = UserModel.objects.get(id=creatorID.id)
        session_instance = self.Meta.model(
            **validated_data, creator=creator_instance)
        session_instance.save()
        return session_instance


class RatingModelSerializer(ModelSerializer):
    class Meta:
        model = RatingModel
        fields = '__all__'

class AverageRatingModelSerializer(ModelSerializer):
    class Meta:
        model = AverageRatingModel
        fields = '__all__'
