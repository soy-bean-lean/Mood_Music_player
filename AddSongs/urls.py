from django.urls import path ,include
from AddSongs import views
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('_admin_', views.songs_name_upload,basename='songs_uploads_from_admin')
router.register('_songs_', views.SongsReadOnlyModelViewSet,basename='SongsReadOnly')

urlpatterns = [
    path('upload/songs/',include(router.urls)),
]
