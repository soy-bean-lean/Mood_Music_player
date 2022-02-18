from rest_framework import serializers
from Reviews.models import UserReviews

class Reviews_Serializer(serializers.ModelSerializer):
    class Meta:
        model = UserReviews
        fields = '__all__'
