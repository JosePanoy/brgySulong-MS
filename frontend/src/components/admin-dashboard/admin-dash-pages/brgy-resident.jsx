import React, { useState } from 'react';
import AdminMainNav from '../admin-sub-components/admin-main-nav';
import AdminSideNav from '../admin-sub-components/admin-side-nav';
import AdminSlideNav from '../admin-sub-components/admin-slide-nav';
import "../../../assets/css/dashboard/brgy-resident-css/brgy-resident.css";
import DownLogo from "../../../assets/img/down.png";
import UpLogo from "../../../assets/img/up.png";
import DisplayAllResident from '../admin-residents-sub-pages/display-all-resident';
import ResidentByHousehold from '../admin-residents-sub-pages/residents-sub-components.jsx/residents-by-household';
import ResidentSpecialGroup from '../admin-residents-sub-pages/residents-sub-components.jsx/residents-househiold';
import ResidentByVoters from '../admin-residents-sub-pages/residents-sub-components.jsx/resident-by-voters';
import BrgyNewResidents from '../admin-residents-sub-pages/residents-sub-components.jsx/residents-new-registered';
import ResidentByEmployment from '../admin-residents-sub-pages/residents-sub-components.jsx/residents-by-employment';
import ResidentsMedicalRecords from '../admin-residents-sub-pages/residents-sub-components.jsx/residents-medical-records';
import BTNtoTop from '../../../sub-components/button-top-top';

function BrgyResidents() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleMenu = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); 
    } else {
      setActiveIndex(index); 
    }
  };

  return (
    <>
      <AdminMainNav />
      <AdminSideNav />
      <AdminSlideNav />
      <BTNtoTop />

      <div className="brgy-residents-container">
      <h2>Brgy Resident Information</h2>
        <div className="brgy-residents-menu" onClick={() => toggleMenu(0)}>
          <span className="brgy-residents-label">All Residents</span>
          <img 
            src={activeIndex === 0 ? UpLogo : DownLogo} 
            alt="Toggle Icon" 
            className="brgy-residents-icon" 
          />
        </div>
        {activeIndex === 0 && (
          <div className="brgy-residents-hidden-div">
            <DisplayAllResident />
          </div>
        )}

        <div className="brgy-residents-menu" onClick={() => toggleMenu(1)}>
          <span className="brgy-residents-label">By Household</span>
          <img 
            src={activeIndex === 1 ? UpLogo : DownLogo} 
            alt="Toggle Icon" 
            className="brgy-residents-icon" 
          />
        </div>
        {activeIndex === 1 && (
          <div className="brgy-residents-hidden-div">
           <ResidentByHousehold />
          </div>
        )}

        <div className="brgy-residents-menu" onClick={() => toggleMenu(2)}>
          <span className="brgy-residents-label">Special Groups</span>
          <img 
            src={activeIndex === 2 ? UpLogo : DownLogo} 
            alt="Toggle Icon" 
            className="brgy-residents-icon" 
          />
        </div>
        {activeIndex === 2 && (
          <div className="brgy-residents-hidden-div">
            <ResidentSpecialGroup />
          </div>
        )}

        <div className="brgy-residents-menu" onClick={() => toggleMenu(3)}>
          <span className="brgy-residents-label">Voter Status</span>
          <img 
            src={activeIndex === 3 ? UpLogo : DownLogo} 
            alt="Toggle Icon" 
            className="brgy-residents-icon" 
          />
        </div>
        {activeIndex === 3 && (
          <div className="brgy-residents-hidden-div">
            <ResidentByVoters />
          </div>
        )}

        <div className="brgy-residents-menu" onClick={() => toggleMenu(4)}>
          <span className="brgy-residents-label">New Residents</span>
          <img 
            src={activeIndex === 4 ? UpLogo : DownLogo} 
            alt="Toggle Icon" 
            className="brgy-residents-icon" 
          />
        </div>
        {activeIndex === 4 && (
          <div className="brgy-residents-hidden-div">
           <BrgyNewResidents />
          </div>
        )}

        <div className="brgy-residents-menu" onClick={() => toggleMenu(5)}>
          <span className="brgy-residents-label">By Employment</span>
          <img 
            src={activeIndex === 5 ? UpLogo : DownLogo} 
            alt="Toggle Icon" 
            className="brgy-residents-icon" 
          />
        </div>
        {activeIndex === 5 && (
          <div className="brgy-residents-hidden-div">
            <ResidentByEmployment />
          </div>
        )}

        <div className="brgy-residents-menu" onClick={() => toggleMenu(6)}>
          <span className="brgy-residents-label">Health & Emergency</span>
          <img 
            src={activeIndex === 6 ? UpLogo : DownLogo} 
            alt="Toggle Icon" 
            className="brgy-residents-icon" 
          />
        </div>
        {activeIndex === 6 && (
          <div className="brgy-residents-hidden-div">
            <ResidentsMedicalRecords />
          </div>
        )}
      </div>
    </>
  );
}

export default BrgyResidents;
