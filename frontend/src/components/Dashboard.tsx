import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DollarSign, Users, AlertTriangle, CheckCircle, ArrowRight, TrendingUp, LucideIcon } from 'lucide-react';
import { DashboardStats } from '../types';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  variant: 'primary' | 'success' | 'warning' | 'danger';
  icon: LucideIcon;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, variant, icon: Icon }) => {
  const variants = {
    primary: { bg: 'bg-primary-50', text: 'text-primary-600' },
    success: { bg: 'bg-success-50', text: 'text-success-600' },
    warning: { bg: 'bg-warning-50', text: 'text-warning-600' },
    danger: { bg: 'bg-danger-50', text: 'text-danger-600' },
  };
  
  const styles = variants[variant];

  return (
    <div className="card card-hover">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-1">{title}</h3>
          <div className="text-2xl font-bold text-slate-800">{value}</div>
        </div>
        <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${styles.bg} ${styles.text}`}>
          <Icon size={24} />
        </div>
      </div>
      <div className="text-xs text-slate-500 flex items-center gap-1">
        <TrendingUp size={14} className="text-success-600" />
        <span>{subtitle}</span>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    total_por_cobrar: 0,
    total_recaudado: 0,
    clientes_activos: 0,
    deudas_vencidas: 0,
    top_deudores: []
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get<DashboardStats>('http://localhost:8000/api/dashboard/')
      .then(response => {
        setStats(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error cargando dashboard:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="text-slate-400 animate-pulse">Cargando métricas...</div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="mb-2">Dashboard</h1>
          <p className="text-slate-500">Resumen general de tu cartera de cobros</p>
        </div>
        <Link to="/clientes" className="btn btn-primary">
          <Users size={18} />
          Nuevo Cliente
        </Link>
      </div>

      <div className="grid-dashboard">
        <StatCard 
          title="Por Cobrar" 
          value={`$${stats.total_por_cobrar ? stats.total_por_cobrar.toLocaleString() : '0'}`} 
          subtitle="Total deuda pendiente"
          variant="primary"
          icon={DollarSign}
        />
        <StatCard 
          title="Recaudado" 
          value={`$${stats.total_recaudado ? stats.total_recaudado.toLocaleString() : '0'}`} 
          subtitle="Pagos recibidos"
          variant="success"
          icon={CheckCircle}
        />
        <StatCard 
          title="Clientes Activos" 
          value={stats.clientes_activos} 
          subtitle="Con deuda pendiente"
          variant="warning"
          icon={Users}
        />
        <StatCard 
          title="Vencidas" 
          value={stats.deudas_vencidas} 
          subtitle="Deudas expiradas"
          variant="danger"
          icon={AlertTriangle}
        />
      </div>

      <div className="grid-2-cols">
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Top Deudores</h3>
            <Link to="/clientes" className="btn btn-ghost btn-sm">Ver todos</Link>
          </div>
          
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Deuda Total</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {stats.top_deudores && stats.top_deudores.length > 0 ? (
                  stats.top_deudores.map((deudor) => (
                    <tr key={deudor.id}>
                      <td>
                        <div className="font-medium text-slate-900">{deudor.nombre}</div>
                        <div className="text-xs text-slate-500">{deudor.telefono}</div>
                      </td>
                      <td className="font-bold text-slate-700">
                        ${parseFloat(deudor.deuda_total).toLocaleString()}
                      </td>
                      <td>
                        <span className="badge badge-danger">Pendiente</span>
                      </td>
                      <td className="text-right">
                        <Link to={`/cliente/${deudor.id}`} className="btn btn-icon btn-ghost text-primary-600">
                          <ArrowRight size={18} />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-slate-500">
                      No hay deudores registrados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="card bg-primary-600 text-white border-none">
            <h3 className="text-white mb-2">Resumen Mensual</h3>
            <p className="text-primary-100 text-sm mb-6">
              Mantén tus cobros al día revisando las deudas próximas a vencer.
            </p>
            <button className="btn bg-white text-primary-700 border-none w-full hover:bg-primary-50">
              Ver Reporte Completo
            </button>
          </div>

          <div className="card">
            <h3 className="mb-4">Acciones Rápidas</h3>
            <div className="flex flex-col gap-3">
              <Link to="/clientes" className="btn btn-secondary justify-between w-full">
                <span className="flex items-center gap-2"><Users size={16}/> Gestionar Clientes</span>
                <ArrowRight size={16} />
              </Link>
              <button className="btn btn-secondary justify-between w-full">
                <span className="flex items-center gap-2"><DollarSign size={16}/> Registrar Pago Rápido</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;