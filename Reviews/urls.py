from django.urls import path ,include , re_path
from Reviews import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', views.reviews_add,basename='user_reviews')

urlpatterns = [
    path('add/reviews/',include(router.urls)),
    path('trending_songs/<str:value>/', views.analysis_reviews, name='_trending_songs_'),
    path('reviews/<str:value>/', views.reviews, name='_reviews_songs_'),
    # re_path(r'^analysis_reviews/<string>', views.analysis_reviews, name='_trending_songs_'),
]