import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "../../../assets/css/dashboard/admin-main-nav.css";
import SulongLogo from "../../../assets/img/sulong-logo.png";

function AdminMainNav() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    navigate("/");
  };

  return (
    <>
      <nav className="admin-main-nav">
        <div className="admin-main-nav__left">
          <img src={SulongLogo} alt="Sulong Logo" className="admin-main-nav__logo" />
          <FaBars className="admin-main-nav__menu-icon" />
        </div>
        <div className="admin-main-nav__buttons">
          <button className="admin-main-nav__button">Fax</button>
          <button className="admin-main-nav__button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </nav>

      <div className="admin-main-nav__subnav">
        <button className="admin-main-nav__subnav-btn">Dashboard</button>
        <button className="admin-main-nav__subnav-btn">Reports</button>
        <button className="admin-main-nav__subnav-btn">Users</button>
        <button className="admin-main-nav__subnav-btn">Settings</button>
        <button className="admin-main-nav__subnav-btn">Help</button>
      </div>
    </>
  );
}

export default AdminMainNav;
