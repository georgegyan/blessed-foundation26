from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/joinus/', include('joinus.urls')),
    path('api/donations/', include('donations.urls')),
]
