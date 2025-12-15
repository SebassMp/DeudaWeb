from rest_framework import serializers
from .models import Cliente, Deuda, Pago

# Los Serializers convierten los datos de la Base de Datos a formato JSON para que el Frontend los entienda

class PagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pago
        fields = '__all__' # Incluir todos los campos

class DeudaSerializer(serializers.ModelSerializer):
    # Incluimos los pagos relacionados para ver el historial
    pagos = PagoSerializer(many=True, read_only=True)
    # Campos calculados (read_only por defecto al no estar en el modelo como columnas)
    saldo_pendiente = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    total_pagado = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    
    class Meta:
        model = Deuda
        fields = '__all__'

class ClienteSerializer(serializers.ModelSerializer):
    # Incluimos las deudas del cliente para ver todo su estado de cuenta
    deudas = DeudaSerializer(many=True, read_only=True)
    deuda_total = serializers.DecimalField(max_digits=12, decimal_places=2, read_only=True)

    class Meta:
        model = Cliente
        fields = '__all__'
