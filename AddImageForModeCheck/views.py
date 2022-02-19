# AddImageForModeCheck
from django.shortcuts import render
from AddSongs.models import SongsName
from AddImageForModeCheck.models import AddImageForModeCheckUser
# from AddImageForModeCheck.serializers import AddImageForModeCheckUserSerializer
# from rest_framework import viewsets
# from rest_framework.filters import SearchFilter, OrderingFilter
# from rest_framework.pagination import PageNumberPagination

# class Paginate_Data(PageNumberPagination):
#     page_size = 4
#     page_query_param = "load_data"

# class image_upload(viewsets.ModelViewSet):
#     pagination_class = Paginate_Data
#     queryset = AddImageForModeCheckUser.objects.all()
#     serializer_class = AddImageForModeCheckUserSerializer
#     filter_backends = [SearchFilter,OrderingFilter]
from rest_framework_simplejwt.views import *
from rest_framework.decorators import api_view
import io
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
import io

import cv2
import os
import matplotlib.pyplot as plt
import numpy as np
from deepface import DeepFace
import cv2
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

from PIL import Image
from io import BytesIO
from base64 import b64decode

@csrf_exempt
@api_view(['POST'])
# @api_view(['GET'])
def image_uplaod_detect(request):
   try:
      json_data = request.body
      stream = io.BytesIO(json_data)
      user_data_dic = JSONParser().parse(stream)
      # print(user_data_dic)
      imagestr = user_data_dic["image"]
      im = Image.open(BytesIO(b64decode(imagestr.split(',')[1])))
      im.save("C://Users//kcros//PycharmProjects//facial_recog_play_song//backup//core//images_of_user//"+user_data_dic["name"]+".jpeg")
      img1 = cv2.imread("C://Users//kcros//PycharmProjects//facial_recog_play_song//backup//core//images_of_user//"+user_data_dic["name"]+".jpeg")
      result = DeepFace.analyze(img1, actions= ['emotion'])
      face_emotions = result["dominant_emotion"]
      # print(face_emotions)
      _song_list_response_ = SongsName.objects.filter(category=face_emotions).values()
      # print("==============================")
      # print(face_emotions)
      # print("==============================")
      # _song_list_response_ = {"message": "You are " + face_emotions}
      # print(_song_list_response_)
      return Response(_song_list_response_,status=status.HTTP_200_OK)
      # return Response({"message": "You are " + face_emotions},status=status.HTTP_200_OK)
   except:
      # print("Error was hit")
      return Response({"message": "Do You even Have a Face"}, status=status.HTTP_400_BAD_REQUEST)

