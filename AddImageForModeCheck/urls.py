from django.urls import path ,include
from AddImageForModeCheck import views
from rest_framework.routers import DefaultRouter

# from django.conf.urls.static import static
# from django.conf import settings
# from django.contrib.staticfiles.urls import staticfiles_urlpatterns

#creating routers
# router = DefaultRouter()

# #Register _Company_Name_ with Router
# router.register('', views.image_upload,basename='image_upload_from_front')

urlpatterns = [
    # path('upload/image/',include(router.urls)),
    path('upload/image/', views.image_uplaod_detect, name='__see_data__'),
    # path('_data_in_pie_/data/', views.analysis_in_chart, name='_songs_pie_chart_'),
    path('_data_in_pie_/data/show', views.analysis_in_chart_show_, name='_songs_pie_chart_'),
    # path('api/image/', views._list, name='_upload_mp3_songs_'),
]


# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
# urlpatterns += staticfiles_urlpatterns()