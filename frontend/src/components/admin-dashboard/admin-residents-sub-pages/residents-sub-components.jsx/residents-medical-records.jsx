import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InfoButton from "../../../../assets/img/info.png";
import MaleLogo from "../../../../assets/img/male.png";
import FemaleLogo from "../../../../assets/img/female.png";
import OtherLogo from "../../../../assets/img/other.png";
import LeftBTN from "../../../../assets/img/left.png";
import RightBTN from "../../../../assets/img/right.png";
import "../../../../assets/css/dashboard/brgy-resident-css/resident-medical-records.css";

function ResidentsMedicalRecords() {
  const [residents, setResidents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const residentsPerPage = 15;

  useEffect(() => {
    const fetchResidents = () => {
      fetch("http://127.0.0.1:8000/api/brgyresidents/residents")
        .then((res) => res.json())
        .then((data) => {
          const filtered = data
            .filter(
              (r) =>
                r.medical_conditions !== null &&
                r.medical_conditions.trim() !== "" &&
                !r.medical_conditions.toLowerCase().includes("none")
            )
            .sort((a, b) => a.lname.localeCompare(b.lname));
          setResidents(filtered);
          if (currentPage > Math.ceil(filtered.length / residentsPerPage)) {
            setCurrentPage(1);
          }
        });
    };

    fetchResidents();
    const interval = setInterval(fetchResidents, 1000);
    return () => clearInterval(interval);
  }, [currentPage]);

  const indexOfLastResident = currentPage * residentsPerPage;
  const indexOfFirstResident = indexOfLastResident - residentsPerPage;
  const currentResidents = residents.slice(
    indexOfFirstResident,
    indexOfLastResident
  );
  const totalPages = Math.ceil(residents.length / residentsPerPage);

  const getProfileImage = (resident) => {
    const pic = resident.profile_picture;
    if (pic && pic.trim() !== "" && pic !== "null") return pic;
    if (resident.gender === "Male") return MaleLogo;
    if (resident.gender === "Female") return FemaleLogo;
    return OtherLogo;
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="rmr-container">
      <table className="rmr-table">
        <thead>
          <tr>
            <th>Profile Picture</th>
            <th>Full Name</th>
            <th>Medical Conditions</th>
            <th>Emergency Contact</th>
            <th>Phone Number</th>
            <th className="rmr-action-col">More Info</th>
          </tr>
        </thead>
        <tbody>
          {currentResidents.map((resident) => (
            <tr key={resident.id}>
              <td>
                <img
                  src={getProfileImage(resident)}
                  alt="Profile"
                  className="rmr-profile-picture"
                />
              </td>
              <td>
                {resident.lname}, {resident.fname}
              </td>
              <td>{resident.medical_conditions}</td>
              <td>{resident.emergency_contact || "N/A"}</td>
              <td>{resident.phone_number || "N/A"}</td>
              <td>
                <Link to={`/brgy-information/medical-record/${resident.id}`}>
                  <img src={InfoButton} alt="Info" className="rmr-info-btn" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="rmr-pagination">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="rmr-page-btn"
          aria-label="Previous Page"
        >
          <img src={LeftBTN} alt="Previous" />
        </button>
        <span className="rmr-page-info">
          {currentPage} / {totalPages || 1}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          className="rmr-page-btn"
          aria-label="Next Page"
        >
          <img src={RightBTN} alt="Next" />
        </button>
      </div>
    </div>
  );
}

export default ResidentsMedicalRecords;
