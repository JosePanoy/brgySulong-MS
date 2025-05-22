import React, { useEffect, useState } from 'react';
import AdminSideNav from '../admin-sub-components/admin-side-nav';
import AdminSlideNav from '../admin-sub-components/admin-slide-nav';
import AdminMainNav from '../admin-sub-components/admin-main-nav';
import "../../../assets/css/dashboard/sub-dashboard/brgy-information.css";
import BrgyInfoFilter from '../admin-sub-components/brgy-information-filter';

function BrgyInformation() {
  const [captain, setCaptain] = useState(null);
  const [otherOfficials, setOtherOfficials] = useState([]);
  const [filteredOfficials, setFilteredOfficials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    captain: false,
    councilor: false,
    secretary: false,
    treasurer: false,
    tanod: false,
    healthWorker: false,
    nutritionScholar: false,
    dayCareWorker: false,
    infoOfficer: false,
    chairman: false, // added Chairman filter
  });

  const positionOrder = [
    'Barangay Captain',
    'Barangay Councilor',
    'Barangay Secretary',
    'Barangay Treasurer',
    'Barangay Tanod',
    'Barangay Health Worker (BHW)',
    'Barangay Nutrition Scholar (BNS)',
    'Barangay Day Care Worker',
    'Barangay Information Officer',
    'Barangay Chairman' // added Chairman
  ];

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/brgysuper/admins')
      .then(response => response.json())
      .then(data => {
        const captainData = data.filter(admin => admin.brgy_position === 'Barangay Captain');
        const otherData = data.filter(admin => admin.brgy_position !== 'Barangay Captain');
        setCaptain(captainData[0]);
        setOtherOfficials(otherData);
        setFilteredOfficials(otherData);
      });
  }, []);

  const sortedOfficials = otherOfficials.sort((a, b) => {
    const positionA = positionOrder.indexOf(a.brgy_position);
    const positionB = positionOrder.indexOf(b.brgy_position);
    return positionA - positionB;
  });

  const filterData = (searchTerm, filters) => {
    // Filter the data based on searchTerm and the active filters
    const filteredData = sortedOfficials.filter(admin => {
      const isPositionSelected = filters[admin.brgy_position.replace(/\s+/g, '').toLowerCase()];
      const isMatchingSearch = admin.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               admin.lname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               admin.phone_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               admin.address.toLowerCase().includes(searchTerm.toLowerCase());

      return (Object.values(filters).every(val => !val) || isPositionSelected) && isMatchingSearch;
    });

    setFilteredOfficials(filteredData);
  };

  const handleFilterChange = (newSearchTerm, newFilters) => {
    setSearchTerm(newSearchTerm);
    setFilters(newFilters);
    filterData(newSearchTerm, newFilters);
  };

  const displayNoDataMessage = filteredOfficials.length === 0 && !(searchTerm || Object.values(filters).some(val => val));

  const includeCaptainInDefaultView = !Object.values(filters).some(val => val) && captain;

  return (
    <>
      <AdminMainNav />
      <AdminSideNav />
      <AdminSlideNav />

      <div className="brgy-info-container">
        <div className="title">Barangay Information Page</div>

        <BrgyInfoFilter 
          searchTerm={searchTerm}
          filters={filters}
          onFilterChange={handleFilterChange} 
        />
        <div className="brgy-info-grid">
          {/* Display Captain if no filters are applied or if checkbox is checked */}
          {(includeCaptainInDefaultView || filters.captain) && captain && (
            <div className="brgy-info-box brgy-info-box1">
              <div className="box-content">
                <div className="top-row">
                  <div className="official-name">{captain.fname} {captain.lname}</div>
                  <div className="position">Barangay Captain</div>
                </div>
                <img className="profile-pic" src={captain.profile_picture || "profile-pic.jpg"} alt="Captain" />
                <div className="sub-box">
                  <div className="status">Status: N/A</div>
                  <div className="age">Age: {captain.age || 'N/A'}</div>
                  <div className="view">View</div>
                </div>
              </div>
            </div>
          )}
          {displayNoDataMessage ? (
            <div className="no-data">There is no existing data in the database</div>
          ) : (
            filteredOfficials.map((admin, index) => (
              <div key={index} className={`brgy-info-box brgy-info-box${index + 2}`}>
                <div className="box-content">
                  <div className="top-row">
                    <div className="official-name">{admin.fname} {admin.lname}</div>
                    <div className="position">
                      {admin.brgy_position === 'Barangay Captain' ? admin.brgy_position : admin.brgy_position.replace('Barangay', 'Brgy.')}
                    </div>
                  </div>
                  <img className="profile-pic" src={admin.profile_picture || "profile-pic.jpg"} alt="Official" />
                  <div className="sub-box">
                    <div className="status">Status: N/A</div>
                    <div className="age">Age: {admin.age || 'N/A'}</div>
                    <div className="view">View</div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default BrgyInformation;
