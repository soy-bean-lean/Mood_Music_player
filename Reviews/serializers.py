from attr import fields
from rest_framework import serializers
from Reviews.models import UserReviews

class Reviews_Serializer(serializers.ModelSerializer):
    class Meta:
        model = UserReviews
        fields = '__all__'
        # fields = ['id','song_data','reviews']
