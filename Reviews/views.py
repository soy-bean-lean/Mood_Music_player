from urllib import request
from Reviews.models import UserReviews
from Reviews.serializers import Reviews_Serializer
from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.pagination import PageNumberPagination
from AddSongs.models import SongsName
from accounts.models import UserAccount
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

@permission_classes([IsAuthenticated])
class reviews_add(viewsets.ModelViewSet):
    queryset = UserReviews.objects.all()
    serializer_class = Reviews_Serializer
    filter_backends = [SearchFilter,OrderingFilter]
    def destroy(self, *args, **kwargs):
        try:
            _check_user_id_ = UserReviews.objects.filter(id=self.kwargs['pk']).values('user_id')
            if str((list(_check_user_id_))[0]["user_id"]) == str(self.request.user.id):
                pass
            else:
                return Response({"message":"not athorized"}, status=status.HTTP_400_BAD_REQUEST)
            UserReviews.objects.get(id=self.kwargs['pk']).delete()
            return Response({"message":"success"}, status=status.HTTP_200_OK)
        except:
            return Response({"message":"Something went wrong"}, status=status.HTTP_400_BAD_REQUEST)
    def partial_update(self, request, *args, **kwargs):
        if len(self.request.data["reviews"])>50:
            return Response({"message":"Must not be more than 100 character"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            _check_user_id_ = UserReviews.objects.filter(id=kwargs.get('pk')).values('user_id')
            if str((list(_check_user_id_))[0]["user_id"]) == str(self.request.user.id):
                pass
            else:
                return Response({"message":"not athorized"}, status=status.HTTP_400_BAD_REQUEST)
            instance = self.queryset.get(pk=kwargs.get('pk'))
            serializer = self.serializer_class(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        except:
            return Response({"message":"not athorized"}, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        emotions_category = list(SongsName.objects.filter(id=self.request.data['song_data']).values('category'))
        serializer.save(category=emotions_category[0]["category"],first_name=self.request.user.first,user_id=self.request.user.id)


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# @permission_classes([IsAuthenticated])
@api_view(('GET',))
def reviews(request,value):
    # print(value)
    try:
        _reviews_ = UserReviews.objects.filter(song_data=str(value)).values().order_by('-id')
    # _reviews_ = UserReviews.objects.filter(ID_id=str(value)).values('uuid')
    # print(_reviews_)
        # print(_reviews_)
        return Response(_reviews_, status=status.HTTP_200_OK)
    except:
        return Response({"message":"...?..."}, status=status.HTTP_400_BAD_REQUEST)

from textblob import TextBlob
@api_view(('GET',))
def analysis_reviews(request,value):
    try:

        _data_ = UserReviews.objects.filter(category=value).values()
        _list_data_ = list(_data_)

        _data_to_analyze_ = {}
        for _data_ragnger_ in range(len(_list_data_)):
            #     convert list to dic coz python dic conversion sucks
            _data_to_analyze_[_list_data_[_data_ragnger_]["id"]]=_list_data_[_data_ragnger_]["reviews"]
            _check_with_id_ = {}


        for key in _data_to_analyze_:
            result = TextBlob(_data_to_analyze_[key]).sentiment.polarity

            # if polarity of reviews less than 0 then not emotion matched
            if result<0:
                response__data__ = [{
                    "artist_name": "....",
                    "category": value,
                    "song_file": "Not yet Reviewd",
                    "song_name": "..."
                }]
                return Response(response__data__, status=status.HTTP_200_OK)

            _check_with_id_[key] = result
            _emotions_matched_ = max(_check_with_id_, key=_check_with_id_.get)
        # print(_emotions_matched_)


        # get comment details from user reviews as single data
        _user_reviews_data_single_ = list(UserReviews.objects.filter(id=_emotions_matched_).values())
        # print(_user_reviews_data_single_)


        # get the id of songs from DB single songs
        _songs_details_ = list(SongsName.objects.filter(id=_user_reviews_data_single_[0]["song_data_id"]).values())
        # print(_songs_details_)

        # send data to user
        return Response(_songs_details_, status=status.HTTP_200_OK)
    except:
        response__data__ = [{
            "artist_name": "....",
            "category": value,
            "song_file": "Not yet Reviewd",
            "song_name": "..."
        }]
        return Response(response__data__, status=status.HTTP_200_OK)
