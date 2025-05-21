import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "../../../assets/css/dashboard/admin-main-nav.css";
import SulongLogo from "../../../assets/img/sulong-logo.png";
import LogoutDiv from "../../../sub-components/logout-div";

function AdminMainNav() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setShowModal(false);

    setTimeout(() => {
      localStorage.removeItem("jwt_token");
      navigate("/");
    }, 3500); // Delay for GIF
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
          <button className="admin-main-nav__button" onClick={() => setShowModal(true)}>
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

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div className="admin-main-nav__modal">
          <div className="admin-main-nav__modal-content">
            <p>Are you sure you want to log out?</p>
            <div className="admin-main-nav__modal-buttons">
              <button className="admin-main-nav__button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="admin-main-nav__button" onClick={handleLogout}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logging Out Overlay */}
      {isLoggingOut && <LogoutDiv />}
    </>
  );
}

export default AdminMainNav;
