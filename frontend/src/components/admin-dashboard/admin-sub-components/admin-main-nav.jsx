import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import LogoutButton from "../../../assets/gif/logout.gif";
import "../../../assets/css/dashboard/admin-main-nav.css";
import SulongLogo from "../../../assets/img/sulong-logo.png";
import LogoutDiv from "../../../sub-components/logout-div";
import AdminSlideNav from "./admin-slide-nav";

function AdminMainNav() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isSlideNavVisible, setIsSlideNavVisible] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user_data");
    if (user) {
      setUserData(JSON.parse(user));
    }

    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMobileOrTablet(true);
      } else {
        setIsMobileOrTablet(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setShowModal(false);
    setTimeout(() => {
      localStorage.removeItem("jwt_token");
      navigate("/");
    }, 3500);
  };

  const toggleSlideNav = () => {
    setIsSlideNavVisible(!isSlideNavVisible);
  };

  return (
    <>
      <nav className="admin-main-nav">
        <div className="admin-main-nav__left">
          <img
            src={SulongLogo}
            alt="Sulong Logo"
            className="admin-main-nav__logo"
          />
          {isMobileOrTablet && (
            <FaBars className="admin-main-nav__menu-icon" onClick={toggleSlideNav} />
          )}
          {userData ? (
            <div className="admin-main-nav__user-info">
              <span className="online-status"></span>
              <span className="user-info__brgy-position">
                {userData.brgy_position}{" "}
              </span>
              <span className="user-info__brgy-position">
                {userData.fname} {userData.lname}
              </span>
            </div>
          ) : (
            <span>Loading...</span>
          )}
        </div>
        <div className="admin-main-nav__buttons">
          <button className="admin-main-nav__button">Fax</button>
          <img
            src={LogoutButton}
            alt="Logout"
            className="logout-button-img"
            onClick={() => setShowModal(true)}
          />
        </div>
      </nav>

      <div className="admin-main-nav__subnav">
        <button className="admin-main-nav__subnav-btn">Dashboard</button>
        <button className="admin-main-nav__subnav-btn">Settings</button>
        <button className="admin-main-nav__subnav-btn">Help</button>
      </div>

      {showModal && (
        <div className="admin-main-nav__modal">
          <div className="admin-main-nav__modal-content">
            <p>Are you sure you want to log out?</p>
            <div className="admin-main-nav__modal-buttons">
              <button
                className="admin-main-nav__button"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="admin-main-nav__button" onClick={handleLogout}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoggingOut && <LogoutDiv />}

      <AdminSlideNav isVisible={isSlideNavVisible} />
    </>
  );
}

export default AdminMainNav;
