# AddImageForModeCheck
from tabnanny import check
from django.shortcuts import render
from AddSongs.models import SongsName
from AddImageForModeCheck.models import AddImageForModeCheckUser , Analysis_in_chart
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAdminUser

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
from rest_framework.decorators import api_view , permission_classes
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
   # try:
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
      if(face_emotions=="happy"):
         print(face_emotions)
         _data_from_DB_ = Analysis_in_chart.objects.filter().values();
         if _data_from_DB_:
            print(_data_from_DB_[0]["happy"])
            Analysis_in_chart.objects.filter().update(happy=_data_from_DB_[0]["happy"]+1)
         else:
            _save_analytic_ = Analysis_in_chart(happy=1)
            _save_analytic_.save()
      if(face_emotions=="angry"):
         print(face_emotions)
         _data_from_DB_ = Analysis_in_chart.objects.filter().values();
         if _data_from_DB_:
            print(_data_from_DB_[0]["angry"])
            Analysis_in_chart.objects.filter().update(angry=_data_from_DB_[0]["angry"]+1)
         else:
            _save_analytic_ = Analysis_in_chart(angry=1)
            _save_analytic_.save()

      if(face_emotions=="sad"):
         print(face_emotions)
         _data_from_DB_ = Analysis_in_chart.objects.filter().values();
         if _data_from_DB_:
            print(_data_from_DB_[0]["sad"])
            Analysis_in_chart.objects.filter().update(sad=_data_from_DB_[0]["sad"]+1)
         else:
            _save_analytic_ = Analysis_in_chart(sad=1)
            _save_analytic_.save()

      if(face_emotions=="neutral"):
         print(face_emotions)
         _data_from_DB_ = Analysis_in_chart.objects.filter().values();
         if _data_from_DB_:
            print(_data_from_DB_[0]["neutral"])
            Analysis_in_chart.objects.filter().update(neutral=_data_from_DB_[0]["neutral"]+1)
         else:
            _save_analytic_ = Analysis_in_chart(neutral=1)
            _save_analytic_.save()

      if(face_emotions=="fear"):
         print(face_emotions)
         _data_from_DB_ = Analysis_in_chart.objects.filter().values();
         if _data_from_DB_:
            print(_data_from_DB_[0]["fear"])
            Analysis_in_chart.objects.filter().update(fear=_data_from_DB_[0]["fear"]+1)
         else:
            _save_analytic_ = Analysis_in_chart(fear=1)
            _save_analytic_.save()


      if(face_emotions=="diguest"):
         print(face_emotions)
         _data_from_DB_ = Analysis_in_chart.objects.filter().values();
         if _data_from_DB_:
            print(_data_from_DB_[0]["diguest"])
            Analysis_in_chart.objects.filter().update(diguest=_data_from_DB_[0]["diguest"]+1)
         else:
            _save_analytic_ = Analysis_in_chart(diguest=1)
            _save_analytic_.save()

      if(face_emotions=="surprise"):
         print(face_emotions)
         _data_from_DB_ = Analysis_in_chart.objects.filter().values();
         if _data_from_DB_:
            print(_data_from_DB_[0]["surprise"])
            Analysis_in_chart.objects.filter().update(surprise=_data_from_DB_[0]["surprise"]+1)
         else:
            _save_analytic_ = Analysis_in_chart(surprise=1)
            _save_analytic_.save()
      return Response(_song_list_response_,status=status.HTTP_200_OK)
      # return Response({"message": "You are " + face_emotions},status=status.HTTP_200_OK)
   # except:
      # print("Error was hit")
      # return Response({"message": "Do You even Have a Face"}, status=status.HTTP_400_BAD_REQUEST)



# @permission_classes([IsAdminUser])
# @api_view(('GET',))
# def analysis_in_chart():
#     pass

@permission_classes([IsAdminUser])
@api_view(('GET',))
def analysis_in_chart_show_(req):
   _data_analyze_ = Analysis_in_chart.objects.all().values()
   _data_extract_for_percentage_calculate = list(_data_analyze_)
   category = ["happy","sad","neutral","fear","diguest","surprise","angry"]
   _total_data_= 0
   for category_loop in category:
      # print(category_loop)
      # print(_data_extract_for_percentage_calculate[0][category_loop])
      _total_data_ += _data_extract_for_percentage_calculate[0][category_loop]
   # print(_total_data_)
   # print(_data_analyze_["sad"])
   # print(_data_analyze_["neutral"])
   # print(_data_analyze_["fear"])
   # print(_data_analyze_["diguest"])
   # print(_data_analyze_["surprise"])
   # print(_data_analyze_["angry"])
      # print(category_data[category[loop_date]])
   color_for_data = ["#4cd964","#e8c5c9","#abafc2","#7ae5f5","#E38627","#bb86fc","#ff2d55"]
   data = []
   for _data_for_category_ in range(0,7):
      # print(category[_data_for_category_]+ " : " +str(_data_extract_for_percentage_calculate[0][category[_data_for_category_]]))
      calculated_percentage = (str(((_data_extract_for_percentage_calculate[0][category[_data_for_category_]])/_total_data_)*100))[0:2]
      data.append({ "title": category[_data_for_category_], "value": float(calculated_percentage), "color": color_for_data[_data_for_category_] })
   # print(data)

   return Response(data, status=status.HTTP_200_OK)
