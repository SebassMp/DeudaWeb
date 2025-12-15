from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum, Count, Q, F, Value, DecimalField
from django.db.models.functions import Coalesce
from django.utils import timezone
from .models import Cliente, Deuda, Pago
from .serializers import ClienteSerializer, DeudaSerializer, PagoSerializer

# Las Vistas (Views) son las que reciben las peticiones de la web y deciden qué responder.
# Usamos 'ModelViewSet' que crea automáticamente las funciones de:
# - Listar (GET)
# - Crear (POST)
# - Actualizar (PUT)
# - Borrar (DELETE)

class DashboardViewSet(viewsets.ViewSet):
    """
    Vista optimizada para métricas del negocio.
    """
    def list(self, request):
        # 1. Total por cobrar
        # Calculamos la suma de todas las deudas que NO están pagadas
        deudas_activas = Deuda.objects.exclude(estado='PAGADA')
        total_deuda_bruta = deudas_activas.aggregate(
            total=Coalesce(Sum('monto'), Value(0, output_field=DecimalField()))
        )['total']
        
        # Calculamos cuánto se ha pagado parcialmente de esas deudas activas
        pagos_parciales = Pago.objects.filter(deuda__in=deudas_activas).aggregate(
            total=Coalesce(Sum('monto'), Value(0, output_field=DecimalField()))
        )['total']
        
        total_por_cobrar = total_deuda_bruta - pagos_parciales

        # 2. Total Recaudado Histórico (Suma de TODOS los pagos registrados)
        total_recaudado = Pago.objects.aggregate(
            total=Coalesce(Sum('monto'), Value(0, output_field=DecimalField()))
        )['total']

        # 3. Clientes Deudores (Clientes únicos con deudas pendientes o vencidas)
        clientes_activos = Cliente.objects.filter(
            deudas__estado__in=['PENDIENTE', 'VENCIDA']
        ).distinct().count()

        # 4. Deudas Vencidas
        hoy = timezone.now().date()
        # Contamos deudas que ya están marcadas como VENCIDA o que están PENDIENTE pero su fecha ya pasó
        deudas_vencidas = Deuda.objects.filter(
            Q(estado='VENCIDA') | Q(estado='PENDIENTE', fecha_vencimiento__lt=hoy)
        ).count()

        # 5. Top Deudores
        # Usamos nombres de anotación que NO colisionen con properties del modelo
        top_deudores = Cliente.objects.annotate(
            _deuda_bruta=Coalesce(
                Sum('deudas__monto', filter=~Q(deudas__estado='PAGADA')), 
                Value(0, output_field=DecimalField())
            ),
            _pagado_acumulado=Coalesce(
                Sum('deudas__pagos__monto', filter=~Q(deudas__estado='PAGADA')), 
                Value(0, output_field=DecimalField())
            )
        ).annotate(
            _saldo_pendiente=F('_deuda_bruta') - F('_pagado_acumulado')
        ).filter(_saldo_pendiente__gt=0).order_by('-_saldo_pendiente')[:5]

        top_deudores_data = [
            {
                'id': c.id,
                'nombre': c.nombre,
                'deuda_total': float(c._saldo_pendiente)
            }
            for c in top_deudores
        ]

        return Response({
            'total_por_cobrar': float(total_por_cobrar),
            'total_recaudado': float(total_recaudado),
            'clientes_activos': clientes_activos,
            'deudas_vencidas': deudas_vencidas,
            'top_deudores': top_deudores_data
        })

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all() # Consultar todos los clientes
    serializer_class = ClienteSerializer

class DeudaViewSet(viewsets.ModelViewSet):
    queryset = Deuda.objects.all()
    serializer_class = DeudaSerializer

class PagoViewSet(viewsets.ModelViewSet):
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer
