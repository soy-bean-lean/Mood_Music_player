from django.urls import path , include
from accounts import views
from rest_framework_simplejwt.views import (TokenRefreshView)
# from rest_framework.routers import DefaultRouter
from .views import CookieTokenRefreshView, CookieTokenObtainPairView # Import the above views
# router = DefaultRouter()
# router.register('acc', views.RegisterView,basename='Register_acc')

urlpatterns = [
    # path('register/',include(router.urls)),
    path('accounts_data/token/', CookieTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('accounts_data/token/refresh/', CookieTokenRefreshView.as_view(), name='token_refresh'),
]

