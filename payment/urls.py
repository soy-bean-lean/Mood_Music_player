from django.urls import path ,include
from payment import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
# router.register('___data___', views.GET_SET_SUBSC,basename='SUBS')
router.register('___data___readonly__', views.GET_SET_SUBSC_READ_DATA,basename='GET_SET_SUBSC_READ_DATA_ReadOnly')


urlpatterns = [
    path('_admin_set_subcription/',include(router.urls)),
    # path('data_payment/', views.data_payment, name='data_payment'),
    # path('subciption_details/', views.data_payment, name='data_payment'),
    path('save/', views.save_payment, name='save_payment'),
    path('Verify-Transaction/api/<str:value>/', views.payment_handle, name='payment_handle'),
    # path('_delete_payment_subcription_/<str:value>/', views.delete_payments, name='delete_payments'),
]