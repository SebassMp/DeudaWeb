from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls), # Panel de administración de Django
    path('api/', include('api.urls')), # Incluimos las rutas de nuestra API
]
