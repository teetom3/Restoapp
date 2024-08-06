import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="admin-navbar">
      <ul>
        <li><Link to="/dashboard">Tableau de Bord</Link></li>
        <li><Link to="/reservations">Réservations</Link></li>
        <li><Link to="/settings">Paramètres</Link></li>
        <li><Link to="/upload-menu">Charger Menu</Link></li>
        <li><Link to="/clients">Clients</Link></li>
        <li><Link to="/compose-email">Composer un Email</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
