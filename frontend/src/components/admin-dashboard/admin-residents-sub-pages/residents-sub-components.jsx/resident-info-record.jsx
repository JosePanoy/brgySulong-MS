import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../../assets/css/dashboard/brgy-resident-css/resident-info-record.css";
import AdminMainNav from "../../admin-sub-components/admin-main-nav";
import AdminSideNav from "../../admin-sub-components/admin-side-nav";
import AdminSlideNav from "../../admin-sub-components/admin-slide-nav";
import MaleIcon from "../../../../assets/img/male.png";
import FemaleIcon from "../../../../assets/img/female.png";
import OtherIcon from "../../../../assets/img/other.png";
import BTNtoTop from "../../../../sub-components/button-top-top";

function ResidentInfoRecord() {
  const { id } = useParams();
  const [resident, setResident] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchResident = () => {
      fetch(`http://127.0.0.1:8000/api/brgyresidents/residents/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Resident not found");
          return res.json();
        })
        .then((data) => setResident(data))
        .catch(() => setResident(null));
    };
    fetchResident();
    const interval = setInterval(fetchResident, 1000);
    return () => clearInterval(interval);
  }, [id]);

  const calculateAge = (birthdate) => {
    if (!birthdate) return "";
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const formatDate = (birthdate) => {
    if (!birthdate) return "";
    const date = new Date(birthdate);
    const months = [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May",
      "Jun.",
      "Jul.",
      "Aug.",
      "Sep.",
      "Oct.",
      "Nov.",
      "Dec.",
    ];
    const month = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  if (!resident) return null;

  const age = calculateAge(resident.birthdate);
  const birthdateFormatted = formatDate(resident.birthdate);

  let profilePicture;
  if (resident.profile_picture) {
    profilePicture = resident.profile_picture;
  } else {
    if (resident.gender === "Male") profilePicture = MaleIcon;
    else if (resident.gender === "Female") profilePicture = FemaleIcon;
    else profilePicture = OtherIcon;
  }

  const getEncodedFileUrl = (filePath) => {
    if (!filePath) return null;
    const parts = filePath.split("/");
    const encodedParts = parts.map((part) => encodeURIComponent(part));
    return `http://127.0.0.1:8000/storage/${encodedParts.join("/")}`;
  };

  return (
    <>
      <BTNtoTop />
      <AdminMainNav />
      <AdminSideNav />
      <AdminSlideNav />
      <main className="rir-main">
        <section className="rir-profile-header">
          <img
            src={profilePicture}
            alt={`${resident.fname} ${resident.lname}`}
            className="rir-profile-picture"
          />
          <div className="rir-profile-info">
            <h2 className="rir-full-name">
              {resident.fname} {resident.lname}
            </h2>
            <p className="rir-basic-details">
              {birthdateFormatted} | {age} | {resident.phone_number}
            </p>
          </div>
        </section>
        <section className="rir-details">
          <div className="rir-detail-row">
            <span className="rir-label">Medical Condition:</span>
            <span className="rir-value">{resident.medical_conditions || "N/A"}</span>
          </div>
          <div className="rir-detail-row">
            <span className="rir-label">Diagnosis Details:</span>
            <span className="rir-value">{resident.diagnosis_details || "N/A"}</span>
          </div>
          <div className="rir-detail-row">
            <span className="rir-label">Diagnosis Status:</span>
            <span className="rir-value">{resident.diagnosis_status || "N/A"}</span>
          </div>
          <div className="rir-detail-row">
            <span className="rir-label">Physician:</span>
            <span className="rir-value">{resident.attending_physician || "N/A"}</span>
          </div>
          <div className="rir-detail-row">
            <span className="rir-label">Date Diagnosed:</span>
            <span className="rir-value">
              {resident.date_diagnosed ? formatDate(resident.date_diagnosed) : "N/A"}
            </span>
          </div>
          <div className="rir-detail-row">
            <span className="rir-label">Medications:</span>
            <span className="rir-value">{resident.medications || "N/A"}</span>
          </div>
          <div className="rir-detail-row">
            <span className="rir-label">Last Checkup:</span>
            <span className="rir-value">
              {resident.last_checkup ? formatDate(resident.last_checkup) : "N/A"}
            </span>
          </div>
          <div className="rir-detail-row">
            <span className="rir-label">Medical Remarks:</span>
            <span className="rir-value">{resident.medical_remarks || "N/A"}</span>
          </div>
          <div className="rir-detail-row">
            <span className="rir-label">Medical File:</span>
            <span className="rir-value">
              {resident.medical_files ? (
                <a
                  href={getEncodedFileUrl(resident.medical_files)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "hsl(134, 61%, 41%)", textDecoration: "underline" }}
                >
                  View Medical File
                </a>
              ) : (
                "N/A"
              )}
            </span>
          </div>
        </section>
      </main>
    </>
  );
}

export default ResidentInfoRecord;
