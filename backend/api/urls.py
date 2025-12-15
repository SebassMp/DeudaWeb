from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClienteViewSet, DeudaViewSet, PagoViewSet, DashboardViewSet

# El Router crea automáticamente las URLs necesarias para nuestra API
router = DefaultRouter()
router.register(r'clientes', ClienteViewSet)
router.register(r'deudas', DeudaViewSet)
router.register(r'pagos', PagoViewSet)
# Registramos el dashboard como una ruta base, pero como es ViewSet sin modelo, 
# necesitamos especificar el basename
router.register(r'dashboard', DashboardViewSet, basename='dashboard')

urlpatterns = [
    path('', include(router.urls)),
]
