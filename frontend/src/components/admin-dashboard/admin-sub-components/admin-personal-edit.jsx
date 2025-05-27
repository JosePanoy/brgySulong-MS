import React, { useState, useEffect } from "react";
import "../../../assets/css/dashboard/sub-dashboard/admin-personal-edit.css";
import SaveBTN from "../../../assets/img/save.png"

function AdminPersonalEdit({ officer, onClose }) {
  const [profilePic, setProfilePic] = useState(officer.profile_picture || "profile-pic.jpg");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setProfilePic(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setProfilePic(officer.profile_picture || "profile-pic.jpg");
    }
  }, [selectedFile, officer.profile_picture]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="admin-personal-edit-overlay">
      <div className="admin-personal-edit-modal">
        <button className="admin-personal-edit-close" onClick={onClose}>×</button>

<div className="admin-personal-edit-header">
  <img
    src={profilePic}
    alt={`${officer.fname} ${officer.lname}`}
    className="admin-personal-edit-profile-pic"
  />
  <h2>{officer.fname} {officer.lname}</h2>
  <button
    className="admin-personal-edit-btn save-btn"
    aria-label="Save Changes"
    type="submit"
  >
    <img src={SaveBTN} alt="Save" className="save-btn-icon" />
  </button>
</div>


        <form className="admin-personal-edit-form">

          <div className="admin-personal-edit-row">
            <label>First Name</label>
            <input type="text" value={officer.fname} readOnly />
          </div>
          <div className="admin-personal-edit-row">
            <label>Last Name</label>
            <input type="text" value={officer.lname} readOnly />
          </div>
          <div className="admin-personal-edit-row">
            <label>Barangay Position</label>
            <input type="text" value={officer.brgy_position} readOnly />
          </div>
          <div className="admin-personal-edit-row">
            <label>Position Status</label>
            <input type="text" value={officer.position_status || "N/A"} readOnly />
          </div>
          <div className="admin-personal-edit-row">
            <label>Phone Number</label>
            <input type="text" value={officer.phone_number} readOnly />
          </div>
          <div className="admin-personal-edit-row">
            <label>Email</label>
            <input type="email" value={officer.email} readOnly />
          </div>
          <div className="admin-personal-edit-row">
            <label>Address</label>
            <textarea value={officer.address} readOnly />
          </div>
          <div className="admin-personal-edit-row">
            <label>Change Profile Picture</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          <div className="admin-personal-edit-row">
            <label>Term Duration</label>
            <input
              type="text"
              value={`${officer.term_start_date || "N/A"} – ${officer.term_end_date || "N/A"}`}
              readOnly
            />
          </div>
          <div className="admin-personal-edit-row">
            <label>Appointed By</label>
            <input type="text" value={officer.appointed_by || "N/A"} readOnly />
          </div>
          <div className="admin-personal-edit-row">
            <label>Joined At</label>
            <input type="text" value={officer.created_at || "N/A"} readOnly />
          </div>

        </form>
      </div>
    </div>
  );
}

export default AdminPersonalEdit;
