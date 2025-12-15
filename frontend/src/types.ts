export interface Pago {
  id: number;
  monto: string;
  fecha_pago: string;
  nota?: string;
  deuda: number;
}

export interface Deuda {
  id: number;
  monto: string;
  descripcion: string;
  fecha_creacion: string;
  fecha_vencimiento?: string;
  estado: 'PENDIENTE' | 'PAGADA' | 'VENCIDA';
  total_pagado: string;
  saldo_pendiente: string;
  pagos: Pago[];
  cliente: number;
}

export interface Cliente {
  id: number;
  nombre: string;
  telefono: string;
  direccion?: string;
  fecha_registro: string;
  deuda_total: string;
  deudas: Deuda[];
}

export interface DashboardStats {
  total_por_cobrar: number;
  total_recaudado: number;
  clientes_activos: number;
  deudas_vencidas: number;
  top_deudores: Cliente[];
}
