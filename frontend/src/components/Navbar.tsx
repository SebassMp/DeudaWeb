import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Settings, Wallet } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <div className="brand">
          <Wallet size={28} className="brand-icon" />
          <span>DeudaWeb</span>
        </div>
      </div>
      
      <div className="sidebar-menu">
        <Link to="/" className={`sidebar-item ${isActive('/')}`}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        <Link to="/clientes" className={`sidebar-item ${isActive('/clientes')}`}>
          <Users size={20} />
          <span>Clientes</span>
        </Link>
      </div>

      <div className="sidebar-footer">
        <button className="sidebar-item">
          <Settings size={20} />
          <span>Configuración</span>
        </button>
        <div className="copyright">
          &copy; 2025 DeudaWeb v1.0
        </div>
      </div>
    </nav>
  );
}

export default Navbar;