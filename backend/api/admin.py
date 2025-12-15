from django.contrib import admin
from .models import Cliente, Deuda, Pago

# Registramos los modelos para que aparezcan en el panel de administración
# Esto nos permite crear, editar y borrar datos sin programar nada extra.

@admin.register(Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'telefono', 'fecha_registro')
    search_fields = ('nombre',)

@admin.register(Deuda)
class DeudaAdmin(admin.ModelAdmin):
    list_display = ('cliente', 'monto', 'estado', 'fecha_creacion')
    list_filter = ('estado', 'fecha_creacion')

@admin.register(Pago)
class PagoAdmin(admin.ModelAdmin):
    list_display = ('deuda', 'monto', 'fecha_pago')
