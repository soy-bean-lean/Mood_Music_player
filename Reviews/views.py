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
from django.shortcuts import get_list_or_404, get_object_or_404

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
                return Response({"message":"not athorized"}, status=status.HTTP_200_OK)
            UserReviews.objects.get(id=self.kwargs['pk']).delete()
            return Response({"message":"success"}, status=status.HTTP_200_OK)
        except:
            return Response({"message":"Something went wrong"}, status=status.HTTP_200_OK)
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
    #     # print(value)
    # _data_ = UserReviews.objects.all()
    # print(_data_)
    #     print("sdfsdf")
        _data_ = UserReviews.objects.filter(category=value).values()
        _list_data_ = list(_data_)
        # print(_list_data_)
        # {
        #     15:"good":
        #}
        _data_to_analyze_ = {}
        for _data_ragnger_ in range(len(_list_data_)):
            _data_to_analyze_[_list_data_[_data_ragnger_]["id"]]=_list_data_[_data_ragnger_]["reviews"]
        _check_with_id_ = {}
        for key in _data_to_analyze_:
            result = TextBlob(_data_to_analyze_[key]).sentiment.polarity
            _check_with_id_[key] = result
            _trending_ = max(_check_with_id_, key=_check_with_id_.get)
        Trending_songs = list(UserReviews.objects.filter(id=_trending_).values())
        _songs_name_ = list(SongsName.objects.filter(song_name=Trending_songs[0]["songs_name_id"]).values('song_name','artist_name','song_file','category'))
        return Response(_songs_name_, status=status.HTTP_200_OK)
    except:
        # Are you(Happy 😀) (sad 😔) (neutral 🙂)
        # (fear 😳) (diguest 🤢) (surprise 😲) (angry 😡)
        # _list_cat_ =["happy","sad","neutral","fear","diguest","surprise","angry"]
        # for _data_ in _list_cat_:
        # if _data_== value:
        response__data__ = [{
            "artist_name": "....",
            "category": value,
            "song_file": "Not yet Reviewd",
            "song_name": "..."
        }]
        return Response(response__data__, status=status.HTTP_200_OK)
