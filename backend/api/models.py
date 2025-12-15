from django.db import models
from django.db.models import Sum

# Modelo para representar a los Clientes
class Cliente(models.Model):
    # Datos básicos del cliente
    nombre = models.CharField(max_length=100, help_text="Nombre completo del cliente")
    telefono = models.CharField(max_length=20, help_text="Número de contacto")
    direccion = models.TextField(blank=True, help_text="Dirección de residencia o negocio")
    fecha_registro = models.DateTimeField(auto_now_add=True, help_text="Fecha automática de creación")

    def __str__(self):
        return self.nombre

    @property
    def deuda_total(self):
        # Calcula el total de deuda pendiente
        pendiente = sum(d.saldo_pendiente for d in self.deudas.all())
        return pendiente

# Modelo para representar las Deudas
class Deuda(models.Model):
    ESTADOS = [
        ('PENDIENTE', 'Pendiente'),
        ('PAGADA', 'Pagada'),
        ('VENCIDA', 'Vencida'),
    ]

    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name='deudas', help_text="Cliente al que pertenece la deuda")
    monto = models.DecimalField(max_digits=10, decimal_places=2, help_text="Cantidad de dinero que debe")
    descripcion = models.TextField(help_text="Detalle de qué es la deuda (ej: Fiado de mercado)")
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_vencimiento = models.DateField(null=True, blank=True)
    estado = models.CharField(max_length=20, choices=ESTADOS, default='PENDIENTE')

    def __str__(self):
        return f"{self.cliente.nombre} - ${self.monto}"

    @property
    def total_pagado(self):
        return self.pagos.aggregate(Sum('monto'))['monto__sum'] or 0

    @property
    def saldo_pendiente(self):
        return self.monto - self.total_pagado

    def verificar_estado(self):
        # Método para actualizar el estado automáticamente
        if self.saldo_pendiente <= 0:
            self.estado = 'PAGADA'
        elif self.estado == 'PAGADA' and self.saldo_pendiente > 0:
            self.estado = 'PENDIENTE'
        self.save()

# Modelo para registrar los Pagos (Abonos)
class Pago(models.Model):
    deuda = models.ForeignKey(Deuda, on_delete=models.CASCADE, related_name='pagos')
    monto = models.DecimalField(max_digits=10, decimal_places=2, help_text="Cantidad abonada")
    fecha_pago = models.DateTimeField(auto_now_add=True)
    nota = models.CharField(max_length=200, blank=True, help_text="Nota opcional sobre el pago")

    def __str__(self):
        return f"Abono de ${self.monto}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Al guardar un pago, verificamos si la deuda se saldó
        self.deuda.verificar_estado()
