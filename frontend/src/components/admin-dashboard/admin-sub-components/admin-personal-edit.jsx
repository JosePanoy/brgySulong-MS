import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../assets/css/dashboard/sub-dashboard/admin-personal-edit.css";
import SaveBTN from "../../../assets/img/save.png";

function AdminPersonalEdit({ officer, onClose }) {
  const [formData, setFormData] = useState({ ...officer });
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePic, setProfilePic] = useState(officer.profile_picture || "profile-pic.jpg");
  const [savingField, setSavingField] = useState(null);

  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setProfilePic(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setProfilePic(officer.profile_picture || "profile-pic.jpg");
    }
  }, [selectedFile, officer.profile_picture]);

  const startEditing = (field) => {
    setEditingField(field);
    setTempValue(formData[field] || "");
  };

  const cancelEditing = () => {
    setEditingField(null);
    setTempValue("");
  };

  const handleInputChange = (e) => {
    setTempValue(e.target.value);
  };

  const saveField = async (field) => {
    const originalValue = officer[field] || "";
    if ((tempValue || "").trim() === (originalValue || "").trim()) {
      cancelEditing();
      return;
    }

    setSavingField(field);

    try {
      // Prepare data as JSON
      let valToSend = tempValue.trim();
      if (valToSend === "") valToSend = "-";

      const jsonData = { [field]: valToSend };

      await axios.put(`http://127.0.0.1:8000/api/brgysuper/admins/${officer.id}`, jsonData, {
        headers: { "Content-Type": "application/json" },
      });

      setFormData(prev => ({ ...prev, [field]: valToSend === "-" ? "" : valToSend }));
      cancelEditing();
      alert("Update successful!");
    } catch (err) {
      alert(`Update failed: ${err.response?.data?.message || err.message}`);
    } finally {
      setSavingField(null);
    }
  };

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const data = new FormData();
      data.append("profile_picture", file);

      setSavingField("profile_picture");

      try {
        await axios.put(`http://127.0.0.1:8000/api/brgysuper/admins/${officer.id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        // We update formData profile_picture to new object URL for instant preview
        setFormData(prev => ({ ...prev, profile_picture: URL.createObjectURL(file) }));
        alert("Profile picture updated!");
      } catch (err) {
        alert(`Update failed: ${err.response?.data?.message || err.message}`);
      } finally {
        setSavingField(null);
      }
    }
  };

  const renderField = (label, fieldName, isTextarea = false) => {
    const isEditing = editingField === fieldName;
    return (
      <div className="admin-personal-edit-row" key={fieldName}>
        <label>{label}</label>
        {!isEditing && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span>{formData[fieldName] || "-"}</span>
            <button
              className="admin-personal-edit-btn"
              type="button"
              onClick={() => startEditing(fieldName)}
              disabled={savingField === fieldName}
            >
              Edit
            </button>
          </div>
        )}
        {isEditing && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {isTextarea ? (
              <textarea
                value={tempValue}
                onChange={handleInputChange}
                disabled={savingField === fieldName}
                rows={3}
              />
            ) : (
              <input
                type={fieldName === "email" ? "email" : "text"}
                value={tempValue}
                onChange={handleInputChange}
                disabled={savingField === fieldName}
              />
            )}
            <button
              className="admin-personal-edit-btn save-btn"
              type="button"
              onClick={() => saveField(fieldName)}
              disabled={savingField === fieldName}
            >
              <img src={SaveBTN} alt="Save" className="save-btn-icon" />
            </button>
            <button
              className="admin-personal-edit-btn"
              type="button"
              onClick={cancelEditing}
              disabled={savingField === fieldName}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    );
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
          <h2>{formData.fname} {formData.lname}</h2>
        </div>

        <form className="admin-personal-edit-form" onSubmit={e => e.preventDefault()}>
          {renderField("First Name", "fname")}
          {renderField("Last Name", "lname")}
          {renderField("Barangay Position", "brgy_position")}
          {renderField("Position Status", "position_status")}
          {renderField("Phone Number", "phone_number")}
          {renderField("Email", "email")}
          {renderField("Address", "address", true)}
          <div className="admin-personal-edit-row">
            <label>Change Profile Picture</label>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <img
                src={profilePic}
                alt="Profile"
                className="admin-personal-edit-profile-pic"
                style={{ width: 80, height: 80 }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={savingField === "profile_picture"}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminPersonalEdit;
