import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../../assets/css/dashboard/brgy-resident-css/display-searched-resident.css";
import AdminMainNav from "../../admin-sub-components/admin-main-nav.jsx";
import AdminSlideNav from "../../admin-sub-components/admin-slide-nav.jsx";
import AdminSideNav from "../../admin-sub-components/admin-side-nav.jsx";
import MaleIcon from "../../../../assets/img/male.png";
import FemaleIcon from "../../../../assets/img/female.png";
import OtherIcon from "../../../../assets/img/other.png";

function formatDate(dateString) {
  if (!dateString) return "N/A";
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  if (isNaN(date)) return "N/A";
  return date.toLocaleDateString(undefined, options);
}

function DisplaySearchedResident() {
  const { id } = useParams();
  const [resident, setResident] = useState(null);

  useEffect(() => {
    let isMounted = true;

    function fetchResident() {
      fetch(`http://127.0.0.1:8000/api/brgyresidents/residents/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (isMounted) setResident(data);
        })
        .catch(() => {
          if (isMounted) setResident(null);
        });
    }

    fetchResident();

    const interval = setInterval(() => {
      fetchResident();
    }, 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [id]);

  if (!resident) {
    return (
      <>
        <AdminMainNav />
        <AdminSlideNav />
        <AdminSideNav />
        <div className="display-resident-loading">Loading resident data...</div>
      </>
    );
  }

  let profileSrc = resident.profile_picture || "";
  if (!profileSrc) {
    if (resident.gender === "Male") profileSrc = MaleIcon;
    else if (resident.gender === "Female") profileSrc = FemaleIcon;
    else profileSrc = OtherIcon;
  }

  return (
    <>
      <AdminMainNav />
      <AdminSlideNav />
      <AdminSideNav />
      <div className="display-resident-container">
        <div className="display-resident-header">
          <img
            src={profileSrc}
            alt="Profile"
            className="resident-profile-picture"
            width={100}
            height={100}
          />
          <div className="resident-name-address">
            <h2>
              {resident.fname} {resident.lname}
            </h2>
            <p>{resident.address}</p>
          </div>
        </div>

        <div className="display-resident-grid">
          <div className="display-resident-section">
            <h4>Personal Information</h4>
            <ul>
              <li>
                <strong>Age:</strong> {resident.age || "N/A"}
              </li>
              <li>
                <strong>Gender:</strong> {resident.gender || "N/A"}
              </li>
              <li>
                <strong>Birthdate:</strong> {formatDate(resident.birthdate)}
              </li>
              <li>
                <strong>Civil Status:</strong> {resident.civil_status || "N/A"}
              </li>
              <li>
                <strong>Email:</strong> {resident.email || "N/A"}
              </li>
              <li>
                <strong>Phone:</strong> {resident.phone_number || "N/A"}
              </li>
              <li>
                <strong>Religion:</strong> {resident.religion || "N/A"}
              </li>
              <li>
                <strong>Education Level:</strong> {resident.education_level || "N/A"}
              </li>
              <li>
                <strong>Employment Status:</strong> {resident.employment_status || "N/A"}
              </li>
            </ul>
          </div>

          <div className="display-resident-section">
            <h4>Household Information</h4>
            <ul>
              <li>
                <strong>Household No:</strong> {resident.household_no || "N/A"}
              </li>
              <li>
                <strong>Household Head:</strong>{" "}
                {resident.is_household_head ? "Yes" : "No"}
              </li>
              <li>
                <strong>Voter Status:</strong> {resident.voter_status || "N/A"}
              </li>
              <li>
                <strong>Precinct No:</strong> {resident.precinct_no || "N/A"}
              </li>
              <li>
                <strong>PWD:</strong> {resident.pwd_status ? "Yes" : "No"}
              </li>
              <li>
                <strong>Solo Parent:</strong> {resident.solo_parent ? "Yes" : "No"}
              </li>
              <li>
                <strong>Senior Citizen:</strong>{" "}
                {resident.senior_citizen ? "Yes" : "No"}
              </li>
              <li>
                <strong>Emergency Contact:</strong> {resident.emergency_contact || "N/A"}
              </li>
            </ul>
          </div>

          <div className="display-resident-section full-width">
            <h4>Medical Information</h4>
            <ul>
              <li>
                <strong>Medical Conditions:</strong> {resident.medical_conditions || "N/A"}
              </li>
              <li>
                <strong>Diagnosis Details:</strong> {resident.diagnosis_details || "N/A"}
              </li>
              <li>
                <strong>Diagnosis Status:</strong> {resident.diagnosis_status || "N/A"}
              </li>
              <li>
                <strong>Attending Physician:</strong> {resident.attending_physician || "N/A"}
              </li>
              <li>
                <strong>Date Diagnosed:</strong> {formatDate(resident.date_diagnosed)}
              </li>
              <li>
                <strong>Medications:</strong> {resident.medications || "N/A"}
              </li>
              <li>
                <strong>Last Checkup:</strong> {formatDate(resident.last_checkup)}
              </li>
              <li>
                <strong>Medical Remarks:</strong> {resident.medical_remarks || "N/A"}
              </li>
              <li>
                <strong>Family Medical History:</strong> {resident.family_medical_history || "N/A"}
              </li>
              <li>
                <strong>Medical Files:</strong> {resident.medical_files || "N/A"}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default DisplaySearchedResident;
