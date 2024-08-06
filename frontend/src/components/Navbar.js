import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">La Barraca</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/menu">Notre Carte</Link>
        </li>
        <li>
          <Link to="/about">À Propos de Nous</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
