import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, Plus, ArrowRight, Phone, MapPin, User } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { Cliente } from '../types';

interface NuevoClienteState {
  nombre: string;
  telefono: string;
  direccion: string;
}

const ListaClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [busqueda, setBusqueda] = useState<string>('');
  const [mostrarForm, setMostrarForm] = useState<boolean>(false);
  const [nuevoCliente, setNuevoCliente] = useState<NuevoClienteState>({
    nombre: '',
    telefono: '',
    direccion: ''
  });

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = () => {
    axios.get<Cliente[]>('http://localhost:8000/api/clientes/')
      .then(response => {
        setClientes(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error:", error);
        toast.error("Error al cargar clientes");
        setLoading(false);
      });
  };

  const guardarCliente = (e: React.FormEvent) => {
    e.preventDefault();
    const promise = axios.post<Cliente>('http://localhost:8000/api/clientes/', nuevoCliente)
      .then(() => {
        cargarClientes();
        setMostrarForm(false);
        setNuevoCliente({ nombre: '', telefono: '', direccion: '' });
      });

    toast.promise(promise, {
      loading: 'Guardando cliente...',
      success: 'Cliente guardado correctamente',
      error: 'Error al guardar cliente',
    });
  };

  const clientesFiltrados = clientes.filter(cliente => 
    cliente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    cliente.telefono.includes(busqueda)
  );

  return (
    <div className="animate-fade-in">
      <Toaster position="top-right" />
      
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
        <div>
          <h1 className="mb-2">Clientes</h1>
          <p className="text-slate-500">Gestiona tu lista de clientes y sus estados de cuenta</p>
        </div>
        <button className="btn btn-primary" onClick={() => setMostrarForm(true)}>
          <Plus size={18} /> Nuevo Cliente
        </button>
      </div>

      {/* Buscador */}
      <div className="card mb-8 p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            className="form-control pl-10" 
            placeholder="Buscar por nombre o teléfono..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      {/* Modal / Formulario Nuevo Cliente */}
      {mostrarForm && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-primary-600 p-4 text-white flex justify-between items-center">
              <h3 className="font-bold text-white m-0">Nuevo Cliente</h3>
              <button onClick={() => setMostrarForm(false)} className="text-white/80 hover:text-white" aria-label="Cerrar formulario">
                <Plus size={24} className="rotate-45" />
              </button>
            </div>
            <form onSubmit={guardarCliente} className="p-6">
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Nombre Completo</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <User size={18} />
                    </div>
                    <input type="text" className="form-control pl-10" required
                      value={nuevoCliente.nombre}
                      onChange={e => setNuevoCliente({...nuevoCliente, nombre: e.target.value})}
                      placeholder="Ej: Juan Pérez"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Teléfono</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Phone size={18} />
                    </div>
                    <input type="text" className="form-control pl-10" required
                      value={nuevoCliente.telefono}
                      onChange={e => setNuevoCliente({...nuevoCliente, telefono: e.target.value})}
                      placeholder="Ej: 300 123 4567"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Dirección (Opcional)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <MapPin size={18} />
                    </div>
                    <input type="text" className="form-control pl-10"
                      value={nuevoCliente.direccion}
                      onChange={e => setNuevoCliente({...nuevoCliente, direccion: e.target.value})}
                      placeholder="Ej: Calle 123 # 45-67"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-8">
                <button type="button" className="btn btn-ghost" onClick={() => setMostrarForm(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Guardar Cliente</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse text-slate-400">Cargando clientes...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientesFiltrados.length > 0 ? (
            clientesFiltrados.map(cliente => (
              <div key={cliente.id} className="card card-hover group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-lg border border-primary-100">
                    {cliente.nombre.charAt(0)}
                  </div>
                  <div className={`badge ${parseFloat(cliente.deuda_total) > 0 ? 'badge-danger' : 'badge-success'}`}>
                    {parseFloat(cliente.deuda_total) > 0 ? 'Con Deuda' : 'Al día'}
                  </div>
                </div>
                
                <h3 className="font-bold text-slate-800 mb-1 text-lg group-hover:text-primary-600 transition-colors">
                  {cliente.nombre}
                </h3>
                
                <div className="space-y-2 mb-6">
                  <div className="text-sm text-slate-500 flex items-center gap-2">
                    <Phone size={14} /> {cliente.telefono}
                  </div>
                  <div className="text-sm text-slate-500 flex items-center gap-2 truncate">
                    <MapPin size={14} /> {cliente.direccion || 'Sin dirección'}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-bold">Deuda Total</div>
                    <div className={`font-bold text-lg ${parseFloat(cliente.deuda_total) > 0 ? 'text-danger-600' : 'text-slate-700'}`}>
                      ${parseFloat(cliente.deuda_total).toLocaleString()}
                    </div>
                  </div>
                  <Link to={`/cliente/${cliente.id}`} className="btn btn-icon btn-secondary group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
              <div className="text-slate-400 mb-2">No se encontraron clientes</div>
              {busqueda && <button className="text-primary-600 font-medium hover:underline" onClick={() => setBusqueda('')}>Limpiar búsqueda</button>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ListaClientes;