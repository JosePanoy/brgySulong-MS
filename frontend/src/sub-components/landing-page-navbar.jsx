import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "../assets/css/landing-page-navbar.css";
import SulongLogo from "../assets/img/sulong-logo.png";

function LandingPageNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo-link">
        <img src={SulongLogo} alt="Sulong Logo" className="logo" />
      </Link>
      
      <div className="toggle-login-container">
        <button className="toggle-btn" onClick={toggleMenu}>
          <FaBars />
        </button>
        <Link to="/login" className="login-btn">
          <span>Login</span>
        </Link>
      </div>

      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/events">Events</Link>
        <Link to="/news">News</Link>
      </div>
    </nav>
  );
}

export default LandingPageNavbar;
