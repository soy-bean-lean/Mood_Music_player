from unicodedata import name
from django.contrib import admin
from django.urls import path,include , re_path

from django.conf.urls.static import static
from django.conf import settings
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

# from . import views
from .views import logout , get_user_data
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    # path('',views.index,name='INDEX'),
    path('data/', include('AddSongs.urls')),
    path('admin/', admin.site.urls),
    path('image/uploads/', include('AddImageForModeCheck.urls')),
    path('api/', include('Reviews.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.social.urls')),
    # path('', include('authuserdata.urls')),
    path('accounts/', include('accounts.urls')),
    path('user/data/', get_user_data, name='_user_data_'),
    path('updateuserdata/', include('userupdate.urls')),
    path('payments_check/', include('payment.urls')),
    path('logout/', logout, name='logout'),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT )

urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
