from threading import activeCount
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
User = get_user_model()


class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        # fields = ('id', 'email', 'first','last','profile_pic')
        fields = '__all__'

from rest_framework import serializers
from accounts.models import UserAccount
class User_Serializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccount
        fields = '__all__'

    def create(self, data):
        return UserAccount.objects.create_user(**data)

# =====================Login token genreated===================================
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['email'] = user.email
        token['first'] = user.first
        token['last'] = user.last
        token['is_superuser'] = user.is_superuser
        token['is_staff'] = user.is_staff
        return token
