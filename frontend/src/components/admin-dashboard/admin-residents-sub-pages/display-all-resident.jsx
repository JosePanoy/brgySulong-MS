import React, { useState, useEffect } from 'react';
import InfoLogo from "../../../assets/img/info.png";
import MaleLogo from "../../../assets/img/male.png";
import FemaleLogo from "../../../assets/img/female.png";
import OtherLogo from "../../../assets/img/other.png";
import "../../../assets/css/dashboard/brgy-resident-css/display-all-resident.css";

function DisplayAllResident() {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    const fetchResidents = () => {
      fetch('http://127.0.0.1:8000/api/brgyresidents/residents')
        .then(response => response.json())
        .then(data => setResidents(data));
    };

    fetchResidents();

    const interval = setInterval(fetchResidents, 1000);

    return () => clearInterval(interval);
  }, []);

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
          {residents.map((resident) => (
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
                <img src={InfoLogo} alt="Info" className="info-logo" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayAllResident;
