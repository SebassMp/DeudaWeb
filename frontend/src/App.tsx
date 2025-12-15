import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ListaClientes from './components/ListaClientes';
import DetalleCliente from './components/DetalleCliente';
import Dashboard from './components/Dashboard';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clientes" element={<ListaClientes />} />
            <Route path="/cliente/:id" element={<DetalleCliente />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;