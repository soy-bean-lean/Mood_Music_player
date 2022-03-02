from AddSongs.models import SongsName
from AddSongs.serializers import Songs_Name_Serializer
from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

class Paginate_Data(PageNumberPagination):
    page_size = 6
    page_query_param = "load_data"


@permission_classes([IsAdminUser])
class songs_name_upload(viewsets.ModelViewSet):
    pagination_class = Paginate_Data
    queryset = SongsName.objects.all()
    serializer_class = Songs_Name_Serializer
    filter_backends = [SearchFilter,OrderingFilter]
    search_fields = ['song_name','artist_name','song_file','cover_photo','category']
    # lookup_field = 'song_name'



class SongsReadOnlyModelViewSet(viewsets.ReadOnlyModelViewSet):
    pagination_class = Paginate_Data
    queryset = SongsName.objects.all()
    serializer_class = Songs_Name_Serializer
    filter_backends = [SearchFilter,OrderingFilter]
    search_fields = ['song_name','artist_name','song_file','cover_photo','category']
    lookup_field = 'song_name'
    permission_classes=[IsAuthenticated]
