from rest_framework import serializers
from AddImageForModeCheck.models import AddImageForModeCheckUser

class AddImageForModeCheckUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AddImageForModeCheckUser
        # fields = ['Company_Name','Company_Contact_No','Company_Email','Company_image']
        fields = '__all__'