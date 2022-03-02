from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.exceptions import InvalidToken

from accounts.models import UserAccount

class CookieTokenRefreshSerializer(TokenRefreshSerializer):
    refresh = None
    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get('refresh_token')
        if attrs['refresh']:
            return super().validate(attrs)
        else:
            raise InvalidToken('No valid token found in cookie \'refresh_token\'')

# from .serializers import MyTokenObtainPairSerializer
from accounts.serializer import MyTokenObtainPairSerializer
class CookieTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get('refresh'):
            cookie_max_age = 3600 * 24 * 14 # 14 days
            response.set_cookie('refresh_token', response.data['refresh'], max_age=cookie_max_age, httponly=True )
            del response.data['refresh']
        return super().finalize_response(request, response, *args, **kwargs)

class CookieTokenRefreshView(TokenRefreshView):
    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get('refresh'):
            cookie_max_age = 3600 * 24 * 14 # 14 days
            response.set_cookie('refresh_token', response.data['refresh'], max_age=cookie_max_age, httponly=True )
            del response.data['refresh']
        return super().finalize_response(request, response, *args, **kwargs)
    serializer_class = CookieTokenRefreshSerializer



import base64
from .serializer import Obtain_Refresh_And_Access
import json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.views import (TokenObtainPairView)
from datetime import datetime

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_new_access_and_refrsh_token_and(request):
    try:
        if request.COOKIES.get('refresh_token'):
            token = request.COOKIES.get('refresh_token')
            splitted_token = token.split(".")
            second_base64_string = splitted_token[1]
            second_base64_string_bytes = second_base64_string.encode('ascii')
            jwt_bytes = base64.b64decode(second_base64_string_bytes + b'=' * (-len(second_base64_string_bytes) % 4))
            jwt_decoded = jwt_bytes.decode('ascii')
            jwt_decoded = json.loads(jwt_decoded)
            exp = jwt_decoded["exp"]
            import time
            time_expired_check = exp - time.time()
            if time_expired_check <= 0:
                return Response({"message": "Refresh token Expired"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                pass
            if jwt_decoded["token_type"] != "refresh":
                return Response({"message": "Not valid refresh token"}, status=status.HTTP_400_BAD_REQUEST)
            else:
                pass
            if jwt_decoded["user_id"] == request.user.id:
                pass
            else:
                return Response({"message": "Something went wrong in space"}, status=status.HTTP_400_BAD_REQUEST)
            user = UserAccount.objects.get(id=request.user.id)
            refresh = Obtain_Refresh_And_Access.get_token(user)
            response = Response({"access": str(refresh.access_token)}, status=status.HTTP_200_OK)
            response.set_cookie('refresh_token', refresh, samesite="none", secure=True, httponly=True)
            return response
        else:
            return Response({"message": "Refresh token not provided"}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({"message": "Something went wrong in space"}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"message": "Something went wrong in space"}, status=status.HTTP_400_BAD_REQUEST)