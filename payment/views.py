from django.shortcuts import render
from urllib import request
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from .models import PaymentsDetails
from accounts.models import UserAccount
from accounts.serializer import User_Serializer


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import datetime

# @permission_classes([IsAuthenticated])
@api_view(('GET',))
def payment_handle(request,value):
    # print("subcription : " +request.GET["subcription"])
    # print("oid: " +request.GET["oid"])
    # print("amt: " +request.GET["amt"])
    # print("refId: " +request.GET["refId"])
    # print("id : " +str(request.user.id))
    # try:

        # if(monthly)
        data = PaymentsDetails.objects.filter(Time_for_subcriptions=request.GET["subcription"]).values()
        # print(len(data))
        # print((data[0]["Time_for_subcriptions"]))
        # return Response({"message":"Good"}, status=status.HTTP_200_OK)
        # # check order id order_id
        check_oid = UserAccount.objects.all()
        for ccc in check_oid.iterator():
            if request.GET["oid"]==ccc.order_id:
                return Response({"message":"something went wrong"}, status=status.HTTP_400_BAD_REQUEST)

        # print((data[0]["money_for_subscription"]))
        # print(data)
        import requests as req
        import xml.etree.ElementTree as ET
        url ="https://uat.esewa.com.np/epay/transrec"
        _data_send_ = {
            'amt': data[0]["money_for_subscription"],
            'scd': 'EPAYTEST',
            'rid': request.GET["refId"],
            'pid': request.GET["oid"],
        }
        respose_from_esewa = req.post(url, _data_send_)
        _status_success_or_fail_ = ET.fromstring(respose_from_esewa.content)
        _response_esewa_ = str(_status_success_or_fail_[0].text.strip())
        _check_response_ = "Success"
        print(_response_esewa_)
        if _response_esewa_.__eq__(_check_response_):
            UserAccount.objects.filter(id=request.user.id).update(
                        payment_options=str(data[0]["Time_for_subcriptions"]),
                        order_id=str(request.GET["oid"]))
            UserAccount.objects.filter(id=request.user.id).update(date_of_subcription=datetime.datetime.now())
        else:
            return Response({"message":"something went wrong!!!"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(_data_send_, status=status.HTTP_200_OK)
    # except:
    #         return Response({"message":"something went wrong"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(('GET',))
def save_payment(req):
    try:
        save_data = PaymentsDetails(money_for_subscription='100', Time_for_subcriptions='monthly')
        save_data.save()
        save_data = PaymentsDetails(money_for_subscription='10000', Time_for_subcriptions='yearly')
        save_data.save()
        return Response(PaymentsDetails.objects.all().values(), status=status.HTTP_200_OK)
    except:

        obj1 = PaymentsDetails.objects.get(pk=1)
        obj1.money_for_subscription = '50'
        obj1.save()
        obj2 = PaymentsDetails.objects.get(pk=2)
        obj2.money_for_subscription = '1200'
        obj2.save()
        # MyModel.objects.filter(field1='Computer').update(field2='cool')

        return Response(PaymentsDetails.objects.all().values(), status=status.HTTP_200_OK)



from accounts.models import UserAccount
from accounts.serializer import User_Serializer

from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import api_view , permission_classes

from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter, OrderingFilter
from django.db.models import Q
from rest_framework import filters

class MyPagin(PageNumberPagination):
    page_size = 4
    page_query_param = "load_data"

class GET_SET_SUBSC_READ_DATA(viewsets.ModelViewSet):
    pagination_class = MyPagin
    queryset = UserAccount.objects.filter(~Q(is_superuser=True))
    serializer_class = User_Serializer
    filter_backends = [SearchFilter,OrderingFilter]
    search_fields = ["id","email","is_active","first_name","last_name","profile_pic","payment_options","order_id","date_of_subcription"]
    # permission_classes=[IsAdminUser]

# @permission_classes([IsAdminUser])
# class GET_SET_SUBSC(viewsets.ViewSet):
    # def list(self,request):
    #     send_response_data = UserAccount.objects.filter(~Q(is_superuser=True))
    #     paginator = MyPagin()
    #     page = paginator.paginate_queryset(send_response_data, request)
    #     if page is not None:
    #         serializer = User_Serializer(page, many=True)
    #         return paginator.get_paginated_response(serializer.data)
    #     else:
    #         serializer = User_Serializer(send_response_data, many=True)
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    # def retrieve(self,request,pk=None):
    #     id = pk
    #     if id is not None:
    #         book = UserAccount.objects.get(id=pk)
    #         serializer = User_Serializer(book)
    #         return Response(serializer.data)
    # def partial_update(self,request,pk):
    #     id = pk
    #     send_response_data = UserAccount.objects.get(pk=id)
    #     serializer = User_Serializer(send_response_data,data=request.data,partial=True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response({'message':'Data updated'},status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)





# @permission_classes([IsAdminUser])
# @api_view(('GET',))
# def data_payment(req):
#     data_payment = UserAccount.objects.all().values("id","email","first_name","profile_pic","payment_options","order_id","date_of_subcription")
#     return Response(data_payment, status=status.HTTP_200_OK)



# @api_view(('GET',))
# @permission_classes([IsAuthenticated])
# def subciption_details(req):
#     # "payment_options": "monthly"
#     user_data = UserAccount.objects.filter().values('payment_options')
#     return Response(user_data, status=status.HTTP_200_OK)




# @permission_classes([IsAdminUser])
# @api_view(('GET',))
# def delete_payments(req,value):
#     # print(value)
#     return Response({"message":"delete subrciption"}, status=status.HTTP_200_OK)
