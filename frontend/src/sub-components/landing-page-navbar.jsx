import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import "../assets/css/landing-page-navbar.css";
import SulongLogo from "../assets/img/sulong-logo.png";

function LandingPageNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <img src={SulongLogo} alt="Sulong Logo" className="logo" />
      
      <div className="toggle-login-container">
        <button className="toggle-btn" onClick={toggleMenu}>
          <FaBars />
        </button>
        <button className="login-btn">
          <span>Login</span>
        </button>
      </div>

      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <a href="#events">Events</a>
        <a href="#news">News</a>
      </div>
    </nav>
  );
}

export default LandingPageNavbar;
