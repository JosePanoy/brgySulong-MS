import React, { useState, useEffect, useRef } from 'react';
import MaleIcon from "../../../../assets/img/male.png";
import FemaleIcon from "../../../../assets/img/female.png";
import OtherIcon from "../../../../assets/img/other.png";
import LeftBTN from "../../../../assets/img/left.png"
import RightBTN from "../../../../assets/img/right.png"
import "../../../../assets/css/dashboard/brgy-resident-css/residents-by-employment.css";

function ResidentByEmployment() {
  const residentsPerPage = 15;
  const [residents, setResidents] = useState([]);
  const [filteredResidents, setFilteredResidents] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Employed');
  const [currentPage, setCurrentPage] = useState(1);
  const prevDataRef = useRef([]);

  const filters = ['Employed', 'Unemployed', 'OFW', 'Self-Employed', 'Retired', 'Others'];

  const filterResidents = (filter, data) => {
    const filtered = data.filter(resident => {
      const empRaw = resident.employment_status;
      const emp = empRaw ? empRaw.toLowerCase() : '';

      if (filter === 'Others') {
        return !['employed', 'unemployed', 'ofw', 'self-employed', 'self employed', 'retired'].includes(emp) || !empRaw || empRaw.toLowerCase() === 'n/a';
      }
      if (filter === 'Self-Employed') {
        return emp === 'self-employed' || emp === 'self employed';
      }
      return emp === filter.toLowerCase();
    });

    filtered.sort((a, b) => a.lname.localeCompare(b.lname));
    return filtered;
  };

  useEffect(() => {
    const fetchData = () => {
      fetch('http://127.0.0.1:8000/api/brgyresidents/residents/')
        .then(response => response.json())
        .then(data => {
          if (JSON.stringify(data) !== JSON.stringify(prevDataRef.current)) {
            prevDataRef.current = data;
            setResidents(data);
            const filtered = filterResidents(activeFilter, data);
            setFilteredResidents(filtered);
            setCurrentPage(1);
          }
        });
    };

    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    return () => clearInterval(interval);
  }, [activeFilter]);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    const filtered = filterResidents(filter, residents);
    setFilteredResidents(filtered);
    setCurrentPage(1);
  };

  const getProfileImage = (resident) => {
    if (resident.profile_picture && resident.profile_picture.trim() !== '' && resident.profile_picture !== 'null') {
      return resident.profile_picture;
    }
    if (resident.gender === 'Male') return MaleIcon;
    if (resident.gender === 'Female') return FemaleIcon;
    return OtherIcon;
  };

  const indexOfLastResident = currentPage * residentsPerPage;
  const indexOfFirstResident = indexOfLastResident - residentsPerPage;
  const currentResidents = filteredResidents.slice(indexOfFirstResident, indexOfLastResident);
  const totalPages = Math.ceil(filteredResidents.length / residentsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="resident-by-employment-container">
      <div className="resident-by-employment-filters">
        {filters.map(filter => (
          <button
            key={filter}
            className={activeFilter === filter ? 'active' : ''}
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <table className="resident-by-employment-table">
        <thead>
          <tr>
            <th>Profile Picture</th>
            <th>Full Name</th>
            <th>Employment Status</th>
            <th>Phone Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {currentResidents.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', fontSize: '0.7rem', padding: '10px' }}>
                No residents found.
              </td>
            </tr>
          ) : (
            currentResidents.map(resident => (
              <tr key={resident.id}>
                <td>
                  <img
                    src={getProfileImage(resident)}
                    alt="Profile"
                    className="resident-by-employment-profile-picture"
                  />
                </td>
                <td>{resident.lname}, {resident.fname}</td>
                <td>{resident.employment_status || 'N/A'}</td>
                <td>{resident.phone_number || 'N/A'}</td>
                <td>{resident.address || 'N/A'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="resident-by-employment-pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            <img src={LeftBTN} alt="Previous" />
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            <img src={RightBTN} alt="Next" />
          </button>
        </div>
      )}
    </div>
  );
}

export default ResidentByEmployment;
