from django.urls import path ,include
from userupdate import views
from rest_framework.routers import DefaultRouter

#creating routers
router = DefaultRouter()

#Register BookViewSet with Router
router.register('_update_data_', views.UserViewSet,basename='UserData')

urlpatterns = [
    path('',include(router.urls)),
]