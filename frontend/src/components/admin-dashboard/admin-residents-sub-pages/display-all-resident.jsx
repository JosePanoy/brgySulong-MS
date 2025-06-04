import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InfoLogo from "../../../assets/img/info.png";
import MaleLogo from "../../../assets/img/male.png";
import FemaleLogo from "../../../assets/img/female.png";
import OtherLogo from "../../../assets/img/other.png";
import LeftBTN from "../../../assets/img/left.png";
import RightBTN from "../../../assets/img/right.png";
import "../../../assets/css/dashboard/brgy-resident-css/display-all-resident.css";

function DisplayAllResident() {
  const [residents, setResidents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const residentsPerPage = 15;

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/brgyresidents/residents')
      .then(response => response.json())
      .then(data => setResidents(data));
  }, []);

  const indexOfLastResident = currentPage * residentsPerPage;
  const indexOfFirstResident = indexOfLastResident - residentsPerPage;
  const currentResidents = residents.slice(indexOfFirstResident, indexOfLastResident);

  const totalPages = Math.ceil(residents.length / residentsPerPage);

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const formatBirthdateWithAge = (birthdate) => {
    const date = new Date(birthdate);
    const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
    const age = calculateAge(birthdate);
    return `${formattedDate} - ${age}`;
  };

  const getProfileImage = (resident) => {
    const pic = resident.profile_picture;
    if (pic && pic.trim() !== '' && pic !== 'null') {
      return pic;
    }
    if (resident.gender === 'Male') {
      return MaleLogo;
    }
    if (resident.gender === 'Female') {
      return FemaleLogo;
    }
    return OtherLogo;
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="resident-table">
      <table>
        <thead>
          <tr>
            <th>Profile Picture</th>
            <th>Full Name</th>
            <th>Birthdate & Age</th>
            <th>Gender</th>
            <th>Civil Status</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Emergency Contact</th>
            <th className="action-column">Others</th>
          </tr>
        </thead>
        <tbody>
          {currentResidents.map((resident) => (
            <tr key={resident.id}>
              <td>
                <img src={getProfileImage(resident)} alt="Profile" className="profile-picture" />
              </td>
              <td>{resident.fname} {resident.lname}</td>
              <td>{resident.birthdate ? formatBirthdateWithAge(resident.birthdate) : 'N/A'}</td>
              <td>{resident.gender || 'N/A'}</td>
              <td>{resident.civil_status || 'N/A'}</td>
              <td>{resident.address || 'N/A'}</td>
              <td>{resident.phone_number || 'N/A'}</td>
              <td>{resident.emergency_contact || 'N/A'}</td>
              <td style={{ textAlign: 'center' }}>
                <Link to={`/brgy-residents/personal/${resident.id}`}>
                  <img src={InfoLogo} alt="Info" className="info-logo" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-buttons">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          <img src={LeftBTN} alt="Previous" />
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          <img src={RightBTN} alt="Next" />
        </button>
      </div>
    </div>
  );
}

export default DisplayAllResident;
