import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Phone, MapPin, Calendar, Plus, DollarSign, FileText, Check, X, AlertCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { Cliente } from '../types';

interface NuevaDeudaState {
  monto: string;
  descripcion: string;
  fecha_vencimiento: string;
}

interface NuevoPagoState {
  monto: string;
  nota: string;
}

const DetalleCliente: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [mostrarFormDeuda, setMostrarFormDeuda] = useState<boolean>(false);
  const [nuevaDeuda, setNuevaDeuda] = useState<NuevaDeudaState>({ 
    monto: '', 
    descripcion: '', 
    fecha_vencimiento: '' 
  });
  
  const [pagoActivo, setPagoActivo] = useState<number | null>(null);
  const [nuevoPago, setNuevoPago] = useState<NuevoPagoState>({ 
    monto: '', 
    nota: '' 
  });

  useEffect(() => {
    cargarCliente();
  }, [id]);

  const cargarCliente = () => {
    axios.get<Cliente>(`http://localhost:8000/api/clientes/${id}/`)
      .then(response => {
        setCliente(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error:", error);
        toast.error("Error al cargar detalles del cliente");
        setLoading(false);
      });
  };

  const guardarDeuda = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    const deudaData = { ...nuevaDeuda, cliente: parseInt(id) };
    const promise = axios.post('http://localhost:8000/api/deudas/', deudaData)
      .then(() => {
        cargarCliente();
        setMostrarFormDeuda(false);
        setNuevaDeuda({ monto: '', descripcion: '', fecha_vencimiento: '' });
      });

    toast.promise(promise, {
      loading: 'Registrando deuda...',
      success: 'Deuda registrada correctamente',
      error: 'Error al registrar deuda',
    });
  };

  const guardarPago = (e: React.FormEvent, deudaId: number) => {
    e.preventDefault();
    const pagoData = { ...nuevoPago, deuda: deudaId };
    const promise = axios.post('http://localhost:8000/api/pagos/', pagoData)
      .then(() => {
        cargarCliente();
        setPagoActivo(null);
        setNuevoPago({ monto: '', nota: '' });
      });

    toast.promise(promise, {
      loading: 'Procesando pago...',
      success: 'Pago registrado correctamente',
      error: 'Error al registrar pago',
    });
  };

  if (loading) return <div className="flex justify-center items-center h-full min-h-[400px]"><div className="animate-pulse text-slate-400">Cargando...</div></div>;
  if (!cliente) return <div className="text-center py-10">Cliente no encontrado</div>;

  return (
    <div className="animate-fade-in">
      <Toaster position="top-right" />
      
      <div className="mb-6">
        <Link to="/clientes" className="btn btn-ghost pl-0 text-slate-500 hover:text-primary-600 transition-colors gap-2">
          <ArrowLeft size={18} /> Volver a la lista
        </Link>
      </div>

      {/* Encabezado del Cliente */}
      <div className="card mb-8 border-0 shadow-md overflow-hidden relative">
        <div className="h-2 bg-gradient-to-r from-primary-500 to-primary-700 w-full absolute top-0 left-0"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 pt-4">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-2xl border border-primary-100">
              {cliente.nombre.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 mb-2">{cliente.nombre}</h1>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-500 text-sm">
                <span className="flex items-center gap-2">
                  <Phone size={16} /> {cliente.telefono}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin size={16} /> {cliente.direccion || 'Sin dirección registrada'}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar size={16} /> Registrado: {new Date(cliente.fecha_registro).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-right min-w-[200px]">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Deuda Total Actual</div>
            <div className={`text-3xl font-bold ${parseFloat(cliente.deuda_total) > 0 ? 'text-danger-600' : 'text-success-600'}`}>
              ${parseFloat(cliente.deuda_total).toLocaleString()}
            </div>
            {parseFloat(cliente.deuda_total) > 0 && (
              <div className="text-xs text-danger-600 mt-1 font-medium flex items-center justify-end gap-1">
                <AlertCircle size={12} /> Requiere atención
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
          <button 
            className={`btn ${mostrarFormDeuda ? 'btn-secondary' : 'btn-primary'}`} 
            onClick={() => setMostrarFormDeuda(!mostrarFormDeuda)}
          >
            {mostrarFormDeuda ? <X size={18} /> : <Plus size={18} />}
            {mostrarFormDeuda ? 'Cancelar' : 'Nueva Deuda'}
          </button>
        </div>
      </div>

      {/* Formulario Nueva Deuda */}
      {mostrarFormDeuda && (
        <div className="card mb-8 bg-slate-50 border border-primary-200 animate-fade-in shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-primary-700 font-bold flex items-center gap-2">
              <FileText size={20} /> Registrar Nueva Deuda
            </h3>
          </div>
          
          <form onSubmit={guardarDeuda}>
            <div className="grid-dashboard mb-0">
              <div className="form-group">
                <label className="form-label" htmlFor="monto">Monto a cobrar ($)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-500 font-bold">$</span>
                  </div>
                  <input type="number" id="monto" className="form-control pl-8" required
                    value={nuevaDeuda.monto}
                    onChange={e => setNuevaDeuda({...nuevaDeuda, monto: e.target.value})}
                    placeholder="0.00"
                    autoFocus
                  />
                </div>
              </div>
              <div className="form-group md:col-span-2">
                <label className="form-label" htmlFor="descripcion">Concepto / Descripción</label>
                <input type="text" id="descripcion" className="form-control" required
                  value={nuevaDeuda.descripcion}
                  onChange={e => setNuevaDeuda({...nuevaDeuda, descripcion: e.target.value})}
                  placeholder="Ej: Compra de materiales de construcción"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="fecha_vencimiento">Fecha Vencimiento</label>
                <input type="date" id="fecha_vencimiento" className="form-control"
                  value={nuevaDeuda.fecha_vencimiento}
                  onChange={e => setNuevaDeuda({...nuevaDeuda, fecha_vencimiento: e.target.value})}
                  title="Fecha de vencimiento"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6 pt-4 border-t border-slate-200">
              <button type="button" className="btn btn-ghost mr-2" onClick={() => setMostrarFormDeuda(false)}>Cancelar</button>
              <button type="submit" className="btn btn-primary px-6">Guardar Deuda</button>
            </div>
          </form>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-slate-800">Historial de Movimientos</h3>
        <div className="badge badge-primary">
          {cliente.deudas.length} registros
        </div>
      </div>
      
      {cliente.deudas.length > 0 ? (
        <div className="flex flex-col gap-6">
          {cliente.deudas.map(deuda => (
            <div key={deuda.id} className={`card overflow-hidden transition-all duration-300 ${deuda.estado === 'PAGADA' ? 'bg-slate-50 border-slate-200 opacity-80 hover:opacity-100' : 'bg-white border-slate-300 shadow-sm hover:shadow-md'}`}>
              
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Columna Izquierda: Info Principal */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`badge ${deuda.estado === 'PAGADA' ? 'badge-success' : deuda.estado === 'VENCIDA' ? 'badge-danger' : 'badge-warning'}`}>
                        {deuda.estado}
                      </span>
                      <span className="text-sm text-slate-400 flex items-center gap-1">
                        <Calendar size={14} /> {new Date(deuda.fecha_creacion).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-slate-800 mb-2">{deuda.descripcion}</h4>
                  
                  {deuda.fecha_vencimiento && (
                    <div className="text-sm text-slate-500 flex items-center gap-1 mb-6">
                      <AlertCircle size={14} className={deuda.estado === 'VENCIDA' ? 'text-danger-500' : ''} /> 
                      Vence: <span className={deuda.estado === 'VENCIDA' ? 'text-danger-600 font-bold' : ''}>{new Date(deuda.fecha_vencimiento).toLocaleDateString()}</span>
                    </div>
                  )}

                  {/* Barra de Progreso */}
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2">
                      <span>Progreso de pago</span>
                      <span>{Math.round((parseFloat(deuda.total_pagado) / parseFloat(deuda.monto)) * 100)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden mb-3">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${deuda.estado === 'PAGADA' ? 'bg-success-500' : 'bg-primary-500'}`}
                        style={{ width: `${(parseFloat(deuda.total_pagado) / parseFloat(deuda.monto)) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-success-600 font-medium">Pagado: ${parseFloat(deuda.total_pagado).toLocaleString()}</span>
                      {deuda.estado !== 'PAGADA' && (
                        <span className="text-danger-600 font-bold">Resta: ${parseFloat(deuda.saldo_pendiente).toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Columna Derecha: Acciones y Pagos */}
                <div className="flex-1 lg:border-l lg:border-slate-100 lg:pl-8 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pagos Realizados</h5>
                    <div className="text-xl font-bold text-slate-800">${parseFloat(deuda.monto).toLocaleString()}</div>
                  </div>

                  <div className="flex-1 mb-4 space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                    {deuda.pagos.length > 0 ? (
                      deuda.pagos.map(pago => (
                        <div key={pago.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm">
                          <div>
                            <div className="font-medium text-slate-700">Abono</div>
                            <div className="text-xs text-slate-400">{new Date(pago.fecha_pago).toLocaleDateString()}</div>
                            {pago.nota && <div className="text-xs text-slate-500 mt-1 italic">"{pago.nota}"</div>}
                          </div>
                          <div className="font-bold text-success-600">+${parseFloat(pago.monto).toLocaleString()}</div>
                        </div>
                      ))
                    ) : (
                      <div className="py-8 text-center text-sm text-slate-400 italic border border-dashed border-slate-200 rounded-lg">
                        Sin pagos registrados
                      </div>
                    )}
                  </div>

                  {/* Botón de Pagar */}
                  {deuda.estado !== 'PAGADA' && (
                    <div className="mt-auto">
                      {pagoActivo === deuda.id ? (
                        <form onSubmit={(e) => guardarPago(e, deuda.id)} className="bg-white p-4 rounded-lg border border-primary-200 shadow-lg animate-fade-in relative z-10">
                          <h6 className="text-sm font-bold text-primary-700 mb-3">Registrar Nuevo Abono</h6>
                          <div className="flex gap-3 mb-3">
                            <div className="flex-1">
                              <label className="text-xs font-bold text-slate-500 block mb-1" htmlFor={`pago-monto-${deuda.id}`}>Monto</label>
                              <input type="number" id={`pago-monto-${deuda.id}`} className="form-control form-control-sm" required
                                value={nuevoPago.monto}
                                onChange={e => setNuevoPago({...nuevoPago, monto: e.target.value})}
                                placeholder="$0.00"
                                autoFocus
                              />
                            </div>
                            <div className="flex-[1.5]">
                              <label className="text-xs font-bold text-slate-500 block mb-1" htmlFor={`pago-nota-${deuda.id}`}>Nota</label>
                              <input type="text" id={`pago-nota-${deuda.id}`} className="form-control form-control-sm"
                                value={nuevoPago.nota}
                                onChange={e => setNuevoPago({...nuevoPago, nota: e.target.value})}
                                placeholder="Opcional"
                              />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button type="submit" className="btn btn-primary btn-sm flex-1 justify-center">Confirmar Pago</button>
                            <button type="button" className="btn btn-secondary btn-sm" onClick={() => setPagoActivo(null)}>Cancelar</button>
                          </div>
                        </form>
                      ) : (
                        <button 
                          className="btn btn-primary w-full justify-center py-2.5 shadow-sm hover:shadow-md transition-all" 
                          onClick={() => setPagoActivo(deuda.id)}
                        >
                          <DollarSign size={18} /> Registrar Nuevo Abono
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="w-16 h-16 bg-success-50 rounded-full flex items-center justify-center mx-auto mb-4 text-success-600">
            <Check size={32} />
          </div>
          <h3 className="text-slate-800 font-medium mb-2">¡Todo limpio!</h3>
          <p className="text-slate-500 mb-6">Este cliente no tiene deudas registradas actualmente.</p>
          <button className="btn btn-primary" onClick={() => setMostrarFormDeuda(true)}>
            <Plus size={18} /> Crear primera deuda
          </button>
        </div>
      )}
    </div>
  );
}

export default DetalleCliente;