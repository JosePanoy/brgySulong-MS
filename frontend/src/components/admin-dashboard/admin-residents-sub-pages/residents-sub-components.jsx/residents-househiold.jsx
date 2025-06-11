import React, { useEffect, useState } from 'react';
import "../../../../assets/css/dashboard/brgy-resident-css/brgy-special-group.css";

import MaleIcon from "../../../../assets/img/male.png";
import FemaleIcon from "../../../../assets/img/female.png";
import OtherIcon from "../../../../assets/img/other.png";
import LeftButton from "../../../../assets/img/left.png";
import RightButton from "../../../../assets/img/right.png";

function ResidentSpecialGroup() {
  const [residents, setResidents] = useState([]);
  const [filteredResidents, setFilteredResidents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const residentsPerPage = 15;

  useEffect(() => {
    const fetchData = () => {
      fetch('http://127.0.0.1:8000/api/brgyresidents/residents')
        .then(res => res.json())
        .then(data => {
          setResidents(data);
        });
    };
    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

useEffect(() => {
  const filtered = residents
    .filter(r => r.pwd_status === true || r.solo_parent === true || r.senior_citizen === true)
    .sort((a, b) => a.lname.localeCompare(b.lname));
  setFilteredResidents(filtered);
}, [residents]);


  const totalPages = Math.ceil(filteredResidents.length / residentsPerPage);
  const startIndex = (currentPage - 1) * residentsPerPage;
  const currentResidents = filteredResidents.slice(startIndex, startIndex + residentsPerPage);

  const getProfileImage = (resident) => {
    const pic = resident.profile_picture;
    if (pic && pic.trim() !== '' && pic !== 'null') {
      return pic;
    }
    if (resident.gender === 'Male') {
      return MaleIcon;
    }
    if (resident.gender === 'Female') {
      return FemaleIcon;
    }
    return OtherIcon;
  };

  return (
    <div className="resident-special-group">
      <table>
        <thead>
          <tr>
            <th>Profile</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>PWD Status</th>
            <th>Medical Conditions</th>
            <th>Senior Citizen</th>
            <th>Solo Parent</th>
          </tr>
        </thead>
        <tbody>
          {currentResidents.map(resident => (
            <tr key={resident.id}>
              <td className="profile-cell">
                <img
                  src={getProfileImage(resident)}
                  alt="Profile"
                  className="gender-icon"
                  draggable={false}
                />
              </td>
              <td>{resident.lname}, {resident.fname} </td>
              <td>{resident.phone_number}</td>
              <td>{resident.address}</td>
              <td>{resident.pwd_status ? 'Yes' : 'No'}</td>
              <td>{resident.medical_conditions || 'None'}</td>
              <td>{resident.senior_citizen ? 'Yes' : 'No'}</td>
              <td>{resident.solo_parent ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <img src={LeftButton} alt="Previous" width={20} height={20} draggable={false} />
        </button>
        <span>{currentPage}/{totalPages || 1}</span>
        <button
          className="pagination-btn"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          <img src={RightButton} alt="Next" width={20} height={20} draggable={false} />
        </button>
      </div>
    </div>
  );
}

export default ResidentSpecialGroup;
