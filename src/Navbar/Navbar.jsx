import React from 'react';
import { useHistory } from 'react-router-dom';
import './navbar.css';
import { Link, NavLink } from 'react-router-dom';
import logo from "../style/img/M2L.png"




const Navbar = () => {
  

  

  return (
    <div>
      <nav className="Navbar" id="navbar">
      <div className='navbar-logo'>
  <img src={logo} alt="Logo" />
</div>
        <ul className='stylenav'>
          <li> 
          <Link to="/">
            Accueil {/* Correction du mot Accueil */}
            </Link>
          </li>
          <li>
            Formations
          </li>
          <li>
          <Link to="/seconnecter">
            Se connecter
            </Link>
          </li>
          
          <li className='button-17'>
          <Link to="/register">
            S'enregistrer
            </Link>
          </li>
          
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
