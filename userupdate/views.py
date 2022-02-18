from rest_framework.response import Response
from accounts.models import UserAccount
from accounts.serializer import User_Serializer

from rest_framework import status
from rest_framework import viewsets

from rest_framework.permissions import IsAuthenticated


class UserViewSet(viewsets.ViewSet):
    permission_classes=[IsAuthenticated]
    def list(self,request):
        test = UserAccount.objects.all()
        serializer = User_Serializer(test,many=True)
        return Response(serializer.data)

    permission_classes=[IsAuthenticated]
    def partial_update(self,request,pk):
        id = pk
        # print(id)
        # print("===========================")
        # print(request.user.id)
        # print(request.data)
        # print("===========================")
        user_data = UserAccount.objects.get(pk=id)
        # print(user_data)
        serializer = User_Serializer(user_data,data=request.data,partial=True)
        # print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Data update'},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

