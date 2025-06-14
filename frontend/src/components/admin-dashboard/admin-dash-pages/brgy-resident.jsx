import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
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
import ResidentsOverallSearch from '../admin-residents-sub-pages/residents-overall-search';

function AnimatedMenu({ index, activeIndex, toggleMenu, label, iconUp, iconDown }) {
    const AnimatedDiv = animated.div;
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const animation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(30px)',
    config: { duration: 700 },
    reset: true,
  });

  return (
    <animated.div ref={ref} style={animation} className="brgy-residents-menu" onClick={() => toggleMenu(index)}>
      <span className="brgy-residents-label">{label}</span>
      <img
        src={activeIndex === index ? iconUp : iconDown}
        alt="Toggle Icon"
        className="brgy-residents-icon"
      />
    </animated.div>
  );
}

function BrgyResidents() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleMenu = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <AdminMainNav />
      <AdminSideNav />
      <AdminSlideNav />
      <BTNtoTop />

      <div className="brgy-residents-container">
        <h2>Brgy Resident Information</h2>
        <ResidentsOverallSearch />

        <AnimatedMenu
          index={0}
          activeIndex={activeIndex}
          toggleMenu={toggleMenu}
          label="All Residents"
          iconUp={UpLogo}
          iconDown={DownLogo}
        />
        {activeIndex === 0 && (
          <div className="brgy-residents-hidden-div">
            <DisplayAllResident />
          </div>
        )}

        <AnimatedMenu
          index={1}
          activeIndex={activeIndex}
          toggleMenu={toggleMenu}
          label="By Household"
          iconUp={UpLogo}
          iconDown={DownLogo}
        />
        {activeIndex === 1 && (
          <div className="brgy-residents-hidden-div">
            <ResidentByHousehold />
          </div>
        )}

        <AnimatedMenu
          index={2}
          activeIndex={activeIndex}
          toggleMenu={toggleMenu}
          label="Special Groups"
          iconUp={UpLogo}
          iconDown={DownLogo}
        />
        {activeIndex === 2 && (
          <div className="brgy-residents-hidden-div">
            <ResidentSpecialGroup />
          </div>
        )}

        <AnimatedMenu
          index={3}
          activeIndex={activeIndex}
          toggleMenu={toggleMenu}
          label="Voter Status"
          iconUp={UpLogo}
          iconDown={DownLogo}
        />
        {activeIndex === 3 && (
          <div className="brgy-residents-hidden-div">
            <ResidentByVoters />
          </div>
        )}

        <AnimatedMenu
          index={4}
          activeIndex={activeIndex}
          toggleMenu={toggleMenu}
          label="New Residents"
          iconUp={UpLogo}
          iconDown={DownLogo}
        />
        {activeIndex === 4 && (
          <div className="brgy-residents-hidden-div">
            <BrgyNewResidents />
          </div>
        )}

        <AnimatedMenu
          index={5}
          activeIndex={activeIndex}
          toggleMenu={toggleMenu}
          label="By Employment"
          iconUp={UpLogo}
          iconDown={DownLogo}
        />
        {activeIndex === 5 && (
          <div className="brgy-residents-hidden-div">
            <ResidentByEmployment />
          </div>
        )}

        <AnimatedMenu
          index={6}
          activeIndex={activeIndex}
          toggleMenu={toggleMenu}
          label="Health & Emergency"
          iconUp={UpLogo}
          iconDown={DownLogo}
        />
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
