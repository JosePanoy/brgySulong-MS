import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../../assets/css/dashboard/brgy-resident-css/resident-new-registered.css";

import MaleIcon from "../../../../assets/img/male.png";
import FemaleIcon from "../../../../assets/img/female.png";
import OtherIcon from "../../../../assets/img/other.png";

import LeftButtonIcon from "../../../../assets/img/left.png";
import RightButtonIcon from "../../../../assets/img/right.png";

function BrgyNewResidents() {
  const [residents, setResidents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const residentsPerPage = 15;

  const fetchResidents = () => {
    axios
      .get("http://127.0.0.1:8000/api/brgyresidents/residents/")
      .then((response) => {
        const filtered = response.data
          .filter((resident) => resident.created_at !== null)
          .sort((a, b) => a.lname.localeCompare(b.lname));
        setResidents(filtered);
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchResidents();
    const interval = setInterval(fetchResidents, 1000);
    return () => clearInterval(interval);
  }, []);

  const getProfileImage = (resident) => {
    if (resident.profile_picture) return resident.profile_picture;
    if (resident.gender === "Male") return MaleIcon;
    if (resident.gender === "Female") return FemaleIcon;
    return OtherIcon;
  };

  const displayField = (field) => {
    if (field === null || field === undefined || field === "") return "N/A";
    return field;
  };

  const totalPages = Math.ceil(residents.length / residentsPerPage);
  const startIndex = (currentPage - 1) * residentsPerPage;
  const currentResidents = residents.slice(
    startIndex,
    startIndex + residentsPerPage
  );

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  return (
    <div className="brgy-new-residents-container">
      <div className="brgy-new-residents-table-wrapper">
        <table className="brgy-new-residents-table">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Date Registered</th>
              <th>Gender</th>
              <th>Household No.</th>
            </tr>
          </thead>
          <tbody>
            {currentResidents.map((resident) => (
              <tr key={resident.id}>
                <td>
                  <img
                    src={getProfileImage(resident)}
                    alt="Profile"
                    className="resident-profile-image"
                  />
                </td>
                <td>
                  {displayField(
                    `${resident.lname || ""}, ${resident.fname || ""} `.trim()
                  )}
                </td>
                <td>{displayField(resident.address)}</td>
                <td>{displayField(resident.phone_number)}</td>
                <td>
                  {new Date(resident.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td>{displayField(resident.gender)}</td>
                <td>{displayField(resident.household_no)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-controls">
        <button
          className="pagination-btn"
          onClick={goToPrevPage}
          disabled={currentPage === 1}
        >
          <img
            src={LeftButtonIcon}
            alt="Previous"
            className="pagination-icon"
          />
        </button>
        <span className="pagination-info">
          {currentPage} / {totalPages || 1}
        </span>
        <button
          className="pagination-btn"
          onClick={goToNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          <img src={RightButtonIcon} alt="Next" className="pagination-icon" />
        </button>
      </div>

      <div className="total-residents-count">
        Total Count of Newly Registered Residents: {residents.length}
      </div>
    </div>
  );
}

export default BrgyNewResidents;
