from rest_framework.serializers import ModelSerializer
from .models import SampleModel
from .models import UserModel
from .models import SessionModel
from .models import RatingModel
from .models import AverageRatingModel
from .models import ReportModel
from rest_framework import serializers
from django.db.models import Avg


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
                  'email', 'username', 'institute', 'password', 'is_superuser']

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

class ReportModelSerializer(ModelSerializer):
    class Meta:
        model = ReportModel
        fields = '__all__'

    def create(self, validated_data):
        creatorID = validated_data.pop('creator')
        sessionID = validated_data.pop('sessionID')

        creator_instance = UserModel.objects.get(id=creatorID.id)
        session_instance = SessionModel.objects.get(id=sessionID.id)

        report_instance = self.Meta.model(
            **validated_data, creator=creator_instance, sessionID=session_instance)
        report_instance.save()
        return report_instance
class RatingModelSerializer(ModelSerializer):
    class Meta:
        model = RatingModel
        fields = '__all__'

    def create(self, validated_data):
        creatorID = validated_data.pop('creator')
        sessionID = validated_data.pop('sessionID')

        creator_instance = UserModel.objects.get(id=creatorID.id)
        session_instance = SessionModel.objects.get(id=sessionID.id)

        rating_instance = self.Meta.model(
            **validated_data, creator=creator_instance, sessionID=session_instance)
        rating_instance.save()
        return rating_instance


class AverageRatingModelSerializer(ModelSerializer):
    class Meta:
        model = AverageRatingModel
        fields = '__all__'

    def create(self, validated_data):
        sessionId = validated_data.pop('sessionID').id

        avePunctionality = RatingModel.objects.filter(
            sessionID=sessionId).all().aggregate(Avg('punctuality'))

        avePresentation = RatingModel.objects.filter(
            sessionID=sessionId).all().aggregate(Avg('presentation'))

        aveDelivery = RatingModel.objects.filter(
            sessionID=sessionId).all().aggregate(Avg('delivery'))

        aveInnovativeness = RatingModel.objects.filter(
            sessionID=sessionId).all().aggregate(Avg('innovativeness'))

        sID = SessionModel.objects.get(id=sessionId)

        averageRating = self.Meta.model(AveragePunctuality=avePunctionality.get('punctuality__avg'), AveragePresentation=avePresentation.get(
            'presentation__avg'), AverageDelivery=aveDelivery.get('delivery__avg'), AverageInnovativeness=aveInnovativeness.get('innovativeness__avg'), sessionID=sID)

        averageRating.save()

        return averageRating
