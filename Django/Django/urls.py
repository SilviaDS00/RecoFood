from django.urls import path
from django.contrib import admin
from app.views import endpoint_prediccion, home

urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),
    path('predict/', endpoint_prediccion, name='predict'),
]
