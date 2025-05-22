import React from 'react';
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
      <div className="admin-sidenav-item">
        <img src={BrgyInfo} alt="Barangay Information" className="admin-sidenav-icon" />
        <span className="admin-sidenav-label">Barangay Information</span>
      </div>
      <div className="admin-sidenav-item">
        <img src={BrgyNews} alt="Barangay News" className="admin-sidenav-icon" />
        <span className="admin-sidenav-label">Barangay News</span>
      </div>
      <div className="admin-sidenav-item">
        <img src={BrgyResident} alt="Residents" className="admin-sidenav-icon" />
        <span className="admin-sidenav-label">Residents</span>
      </div>
      <div className="admin-sidenav-item">
        <img src={BrgyInventory} alt="Inventory" className="admin-sidenav-icon" />
        <span className="admin-sidenav-label">Inventory</span>
      </div>
      <div className="admin-sidenav-item">
        <img src={BrgyFeedback} alt="Feedback" className="admin-sidenav-icon" />
        <span className="admin-sidenav-label">Feedback</span>
      </div>
      <div className="admin-sidenav-item">
        <img src={BrgyAnalytics} alt="Analytics" className="admin-sidenav-icon" />
        <span className="admin-sidenav-label">Analytics</span>
      </div>
      <div className="admin-sidenav-item">
        <img src={BrgySettings} alt="Settings" className="admin-sidenav-icon" />
        <span className="admin-sidenav-label">Settings</span>
      </div>
      <div className="admin-sidenav-item">
        <img src={BrgySupport} alt="Support" className="admin-sidenav-icon" />
        <span className="admin-sidenav-label">Support</span>
      </div>
    </div>
  );
}

export default AdminSideNav;
