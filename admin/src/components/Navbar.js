import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="admin-navbar">
      <div className="menu-toggle" onClick={toggleMenu}>
        ☰
      </div>
      <ul className="desktop-menu">
        <li><Link to="/dashboard">Tableau de Bord</Link></li>
        <li><Link to="/reservations">Réservations</Link></li>
        <li><Link to="/settings">Paramètres</Link></li>
        <li><Link to="/upload-menu">Charger Menu</Link></li>
        <li><Link to="/clients">Clients</Link></li>
        <li><Link to="/compose-email">Composer un Email</Link></li>
      </ul>
      <ul className={menuOpen ? 'mobile-menu show' : 'mobile-menu'}>
        <li><Link to="/dashboard" onClick={toggleMenu}>Tableau de Bord</Link></li>
        <li><Link to="/reservations" onClick={toggleMenu}>Réservations</Link></li>
        <li><Link to="/settings" onClick={toggleMenu}>Paramètres</Link></li>
        <li><Link to="/upload-menu" onClick={toggleMenu}>Charger Menu</Link></li>
        <li><Link to="/clients" onClick={toggleMenu}>Clients</Link></li>
        <li><Link to="/compose-email" onClick={toggleMenu}>Composer un Email</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;


