import React from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/css/dashboard/admin-side-nav.css';
import BrgyInfo from '../../../assets/img/nav icons/brgy-info.png';
import BrgyNews from '../../../assets/img/nav icons/news.png';
import BrgyResident from '../../../assets/img/nav icons/resident.png';
import BrgyInventory from '../../../assets/img/nav icons/inventory.png';
import BrgyFeedback from '../../../assets/img/nav icons/feedback.png';
import BrgyAnalytics from '../../../assets/img/nav icons/analytics.png';
import BrgySettings from '../../../assets/img/nav icons/permission.png';
import BrgySupport from '../../../assets/img/nav icons/support.png';

function AdminSideNav() {
  return (
    <div className="admin-sidenav">
      <Link to="/brgy-information" className="admin-sidenav-item">
        <img src={BrgyInfo} alt="Barangay Information" className="admin-sidenav-icon" />
        <span className="admin-sidenav-label">Barangay Information</span>
      </Link>
      <Link to="/brgy-news" className="admin-sidenav-item">
        <img src={BrgyNews} alt="Barangay News" className="admin-sidenav-icon" />
        <span className="admin-sidenav-label">Barangay News</span>
      </Link>
      <Link to="/brgy-residents" className="admin-sidenav-item">
        <img src={BrgyResident} alt="Residents" className="admin-sidenav-icon" />
        <span className="admin-sidenav-label">Residents</span>
      </Link>
      <Link to="/brgy-inventory" className="admin-sidenav-item">
        <img src={BrgyInventory} alt="Inventory" className="admin-sidenav-icon" />
        <span className="admin-sidenav-label">Inventory</span>
      </Link>
      <Link to="/brgy-feedback" className="admin-sidenav-item">
        <img src={BrgyFeedback} alt="Feedback" className="admin-sidenav-icon" />
        <span className="admin-sidenav-label">Feedback</span>
      </Link>
      <Link to="/brgy-analytics" className="admin-sidenav-item">
        <img src={BrgyAnalytics} alt="Analytics" className="admin-sidenav-icon" />
        <span className="admin-sidenav-label">Analytics</span>
      </Link>
      <Link to="/brgy-settings" className="admin-sidenav-item">
        <img src={BrgySettings} alt="Settings" className="admin-sidenav-icon" />
        <span className="admin-sidenav-label">Settings</span>
      </Link>
      <Link to="/brgy-support" className="admin-sidenav-item">
        <img src={BrgySupport} alt="Support" className="admin-sidenav-icon" />
        <span className="admin-sidenav-label">Support</span>
      </Link>
    </div>
  );
}

export default AdminSideNav;
