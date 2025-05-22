import React from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/dashboard/admin-slide-nav.css";
import BrgyInfo from "../../../assets/img/nav icons/brgy-info.png";
import BrgyNews from "../../../assets/img/nav icons/news.png";
import BrgyResident from "../../../assets/img/nav icons/resident.png";
import BrgyInventory from "../../../assets/img/nav icons/inventory.png";
import BrgyFeedback from "../../../assets/img/nav icons/feedback.png";
import BrgyAnalytics from "../../../assets/img/nav icons/analytics.png";
import BrgySettings from "../../../assets/img/nav icons/permission.png";
import BrgySupport from "../../../assets/img/nav icons/support.png";

function AdminSlideNav({ isVisible }) {
  return (
    <div className={`admin-slide-nav ${isVisible ? "active" : ""}`}>
      <Link to="/brgy-information" className="admin-slide-nav-button">
        <img src={BrgyInfo} alt="Barangay Info" className="admin-slide-nav-icon" />
        Barangay Information
      </Link>
      <Link to="/brgy-news" className="admin-slide-nav-button">
        <img src={BrgyNews} alt="Barangay News" className="admin-slide-nav-icon" />
        Barangay News
      </Link>
      <Link to="/brgy-residents" className="admin-slide-nav-button">
        <img src={BrgyResident} alt="Residents" className="admin-slide-nav-icon" />
        Residents
      </Link>
      <Link to="/brgy-inventory" className="admin-slide-nav-button">
        <img src={BrgyInventory} alt="Inventory" className="admin-slide-nav-icon" />
        Inventory
      </Link>
      <Link to="/brgy-feedback" className="admin-slide-nav-button">
        <img src={BrgyFeedback} alt="Feedback" className="admin-slide-nav-icon" />
        Feedback
      </Link>
      <Link to="/brgy-analytics" className="admin-slide-nav-button">
        <img src={BrgyAnalytics} alt="Analytics" className="admin-slide-nav-icon" />
        Analytics
      </Link>
      <Link to="/brgy-settings" className="admin-slide-nav-button">
        <img src={BrgySettings} alt="Settings" className="admin-slide-nav-icon" />
        Settings
      </Link>
      <Link to="/brgy-support" className="admin-slide-nav-button">
        <img src={BrgySupport} alt="Support" className="admin-slide-nav-icon" />
        Support
      </Link>
    </div>
  );
}

export default AdminSlideNav;
