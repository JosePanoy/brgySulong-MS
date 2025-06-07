import React, { useState, useEffect } from 'react';
import "../../../../assets/css/dashboard/brgy-resident-css/brgy-resident-voters.css";
import LeftButton from "../../../../assets/img/left.png";
import RightButton from "../../../../assets/img/right.png";

import MaleIcon from "../../../../assets/img/male.png";
import FemaleIcon from "../../../../assets/img/female.png";
import OtherIcon from "../../../../assets/img/other.png";

function ResidentByVoters() {
  const [isRegistered, setIsRegistered] = useState(true);
  const [residents, setResidents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const residentsPerPage = 15;

  const fetchData = () => {
    fetch('http://127.0.0.1:8000/api/brgyresidents/residents')
      .then(response => response.json())
      .then(data => setResidents(data));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleStatus = (status) => {
    setIsRegistered(status);
    setCurrentPage(1);
  };

  const filteredResidents = isRegistered
    ? residents.filter(resident => resident.voter_status === "Registered")
    : residents.filter(resident => !resident.voter_status || resident.voter_status === "Not Registered");

  const indexOfLast = currentPage * residentsPerPage;
  const indexOfFirst = indexOfLast - residentsPerPage;
  const currentResidents = filteredResidents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredResidents.length / residentsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const getProfileImage = (resident) => {
    if (resident.profile_picture) {
      return <img src={resident.profile_picture} alt="Profile" className="profile-img" />;
    }
    if (resident.gender === "Male") {
      return <img src={MaleIcon} alt="Male" className="gender-icon" />;
    }
    if (resident.gender === "Female") {
      return <img src={FemaleIcon} alt="Female" className="gender-icon" />;
    }
    return <img src={OtherIcon} alt="Other" className="gender-icon" />;
  };

  const renderTable = () => (
    <>
      <table className="resident-by-voters-table">
        <thead>
          <tr>
            <th>Profile Picture</th>
            <th>Full Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Phone Number</th>
            {isRegistered && <th>Precinct No</th>}
          </tr>
        </thead>
        <tbody>
          {currentResidents.map(resident => (
            <tr key={resident.id}>
              <td>{getProfileImage(resident)}</td>
              <td>{resident.lname}, {resident.fname}</td>
              <td>{resident.age}</td>
              <td>{resident.address}</td>
              <td>{resident.phone_number}</td>
              {isRegistered && <td>{resident.precinct_no}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="resident-by-voters-total">
        {isRegistered
          ? `Total Registered Voters: ${residents.filter(r => r.voter_status === "Registered").length}`
          : `Total Not Registered: ${residents.filter(r => !r.voter_status || r.voter_status === "Not Registered").length}`}
      </div>
    </>
  );

  return (
    <div className="resident-by-voters-container">
      <div className="resident-by-voters-buttons">
        <button onClick={() => toggleStatus(true)} className={`button ${isRegistered ? 'active' : ''}`}>Registered</button>
        <button onClick={() => toggleStatus(false)} className={`button ${!isRegistered ? 'active' : ''}`}>Not Registered</button>
      </div>
      <div className="resident-by-voters-table-container">
        {renderTable()}
        <div className="resident-by-voters-pagination">
          <img src={LeftButton} alt="Previous" onClick={prevPage} className={`nav-icon ${currentPage === 1 ? 'disabled' : ''}`} />
          <span>{currentPage}/{totalPages || 1}</span>
          <img src={RightButton} alt="Next" onClick={nextPage} className={`nav-icon ${currentPage === totalPages ? 'disabled' : ''}`} />
        </div>
      </div>
    </div>
  );
}

export default ResidentByVoters;
