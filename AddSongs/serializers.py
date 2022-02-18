from rest_framework import serializers
from AddSongs.models import SongsName

class Songs_Name_Serializer(serializers.ModelSerializer):
    class Meta:
        model = SongsName
        fields = '__all__'