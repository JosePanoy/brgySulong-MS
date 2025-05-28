import React, { useState, useEffect } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";
import "../../../assets/css/dashboard/sub-dashboard/admin-personal-edit.css";
import AdminEditConfirmModal from "./admin-personal-edit-confirm";
import EditBTN from "../../../assets/img/edit.png";
import SaveBTN from "../../../assets/img/save.png";
import NoticeGIF from "../../../assets/gif/notice.gif"
import AdminPersonalUpdateMessage from "./admin-personal-update-message";

function AdminPersonalEdit({ officer, onClose, onUpdate }) {
  const [formData, setFormData] = useState({ ...officer });
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [savingField, setSavingField] = useState(null);

  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [fieldToSave, setFieldToSave] = useState(null);
  const [valueToSave, setValueToSave] = useState("");

  const [updateMessageVisible, setUpdateMessageVisible] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("success");

  const token = localStorage.getItem("token");

  const fieldLabels = {
    fname: "First Name",
    lname: "Last Name",
    age: "Age",
    brgy_position: "Barangay Position",
    position_status: "Position Status",
    phone_number: "Phone Number",
    email: "Email",
    address: "Address",
    appointed_by: "Appointed By",
    term_start_date: "Term Start Date",
    term_end_date: "Term End Date",
    profile_picture: "Profile Picture",
  };

useEffect(() => {
  const userDataString = localStorage.getItem("user_data");
  if (userDataString) {
    try {
      JSON.parse(userDataString);
    } catch (error) {
      console.error("Failed to parse user_data from localStorage:", error);
    }
  }
}, []);


  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setProfilePic(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (formData.profile_picture) {
      if (formData.profile_picture.startsWith("http")) {
        setProfilePic(formData.profile_picture);
      } else {
        setProfilePic(
          `http://127.0.0.1:8000/storage/${formData.profile_picture}`
        );
      }
    } else {
      setProfilePic(null);
    }
  }, [selectedFile, formData.profile_picture]);

  const startEditing = (field) => {
    setEditingField(field);
    if (field === "term_start_date" || field === "term_end_date") {
      setTempValue(formData[field] ? formData[field].split("T")[0] : "");
    } else {
      setTempValue(formData[field] || "");
    }
  };

  const cancelEditing = () => {
    setEditingField(null);
    setTempValue("");
  };

  const handleInputChange = (e) => {
    setTempValue(e.target.value);
  };

const performSaveField = async (field, valToSend) => {
  setSavingField(field);

  try {
    const userDataString = localStorage.getItem("user_data");
    let lastEditedBy = null;

    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const now = new Date();

      const formattedDateTime = now.toLocaleString("en-PH", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      lastEditedBy = {
        fname: userData.fname,
        lname: userData.lname,
        phone_number: userData.phone_number,
        email: userData.email,
        edited_at: formattedDateTime,
      };
    }

    const jsonData = {
      [field]: valToSend,
      last_edited_by: lastEditedBy ? JSON.stringify(lastEditedBy) : null,
    };

    const response = await axios.put(
      `http://127.0.0.1:8000/api/brgysuper/admins/${officer.id}`,
      jsonData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const updatedOfficer = response.data;
    setFormData((prev) => ({
      ...prev,
      [field]: valToSend === "-" ? "" : valToSend,
    }));
    onUpdate(updatedOfficer);
    cancelEditing();
    setUpdateStatus("success");
    setUpdateMessageVisible(true);
  } catch (error) {
    console.error("Update error:", error.response ? error.response.data : error.message);
    setUpdateStatus("error");
    setUpdateMessageVisible(true);
  } finally {
    setSavingField(null);
  }
};


  const saveField = (field) => {
    let valToSend = tempValue.trim();
    if (field === "term_start_date" || field === "term_end_date") {
      if (valToSend === "") valToSend = null;
    } else {
      if (valToSend === "") valToSend = "";
    }

    const originalValue = officer[field] || "";
    if (
      (valToSend === null &&
        (originalValue === null || originalValue === "")) ||
      valToSend === String(originalValue || "").trim()
    ) {
      cancelEditing();
      return;
    }

    setFieldToSave(field);
    setValueToSave(valToSend);
    setConfirmModalVisible(true);
  };

const handleConfirmSave = () => {
  if (fieldToSave === "profile_picture") {
    saveProfilePicture();
  } else if (fieldToSave) {
    performSaveField(fieldToSave, valueToSave);
  }

  setConfirmModalVisible(false);
  setFieldToSave(null);
  setValueToSave("");
};


  const handleCancelSave = () => {
    setConfirmModalVisible(false);
    setFieldToSave(null);
    setValueToSave("");
  };

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      let file = e.target.files[0];
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        setUpdateStatus("error");
        setUpdateMessageVisible(true);
        return;
      }
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        setSelectedFile(compressedFile);
      } catch {
        setSelectedFile(file);
      }
    }
  };

  const saveProfilePicture = async () => {
    if (!selectedFile) return;
    const data = new FormData();
    data.append("profile_picture", selectedFile);
    data.append("_method", "PUT");

    const userDataString = localStorage.getItem("user_data");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      data.append(
        "last_edited_by",
        JSON.stringify({
          id: userData.id,
          fname: userData.fname,
          lname: userData.lname,
          phone_number: userData.phone_number,
          email: userData.email,
        })
      );
    }

    setSavingField("profile_picture");
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/brgysuper/admins/${officer.id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedOfficer = response.data;
      setFormData((prev) => ({
        ...prev,
        profile_picture: updatedOfficer.profile_picture,
      }));
      setSelectedFile(null);
      onUpdate(updatedOfficer);
      setUpdateStatus("success");
      setUpdateMessageVisible(true);
    } catch {
      setUpdateStatus("error");
      setUpdateMessageVisible(true);
    } finally {
      setSavingField(null);
    }
  };

  const renderField = (
    label,
    fieldName,
    isTextarea = false,
    inputType = "text"
  ) => {
    const isEditing = editingField === fieldName;
    const positionStatusOptions = ["Active", "Resigned", "Deceased"];
    return (
      <div className="admin-personal-edit-row" key={fieldName}>
        <label>{label}</label>
        {!isEditing && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span>
              {fieldName === "term_start_date" || fieldName === "term_end_date"
                ? formData[fieldName]
                  ? formData[fieldName].split("T")[0]
                  : "-"
                : formData[fieldName] || "-"}
            </span>
            <button
              className="admin-personal-edit-btn"
              type="button"
              onClick={() => startEditing(fieldName)}
              disabled={savingField === fieldName}
            >
              <img src={EditBTN} alt="Edit" style={{ width: 25, height: 25 }} />
            </button>
          </div>
        )}
        {isEditing && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {fieldName === "position_status" ? (
              <select
                value={tempValue}
                onChange={handleInputChange}
                disabled={savingField === fieldName}
              >
                <option value="">-</option>
                {positionStatusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : isTextarea ? (
              <textarea
                value={tempValue}
                onChange={handleInputChange}
                disabled={savingField === fieldName}
                rows={3}
              />
            ) : (
              <input
                type={inputType}
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
        <button className="admin-personal-edit-close" onClick={onClose}>
          ×
        </button>
        <div className="admin-personal-edit-header">
          {profilePic ? (
            <img
              src={profilePic}
              alt={`${officer.fname} ${officer.lname}`}
              className="admin-personal-edit-profile-pic"
            />
          ) : (
            <div
              style={{
                width: 100,
                height: 100,
                backgroundColor: "#ddd",
                borderRadius: "50%",
              }}
            />
          )}
          <h2>
            {formData.fname} {formData.lname}
          </h2>
        </div>
        <form
          className="admin-personal-edit-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="admin-personal-edit-columns">
            <div className="admin-personal-edit-column">
              {renderField("First Name", "fname")}
              {renderField("Last Name", "lname")}
              {renderField("Age", "age")}
              {renderField("Barangay Position", "brgy_position")}
              {renderField("Position Status", "position_status")}
              {renderField("Phone Number", "phone_number")}
              {renderField("Email", "email", false, "email")}
            </div>
            <div className="admin-personal-edit-column">
              {renderField("Address", "address", true)}
              {renderField("Appointed By", "appointed_by")}
              {renderField("Term Start Date", "term_start_date", false, "date")}
              {renderField("Term End Date", "term_end_date", false, "date")}
              <div className="admin-personal-edit-row">
                <label>Change Profile Picture</label>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="admin-personal-edit-profile-pic"
                      style={{ width: 80, height: 80 }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        backgroundColor: "#eee",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                  <input
                    type="file"
                    accept=".jpeg, .jpg, .png"
                    onChange={handleFileChange}
                    disabled={savingField === "profile_picture"}
                  />
                  {selectedFile && (
                    <button
                      type="button"
                      onClick={() => {
  setFieldToSave("profile_picture");
  setValueToSave(selectedFile);
  setConfirmModalVisible(true);
}}

                      disabled={savingField === "profile_picture"}
                    >
                      <img src={SaveBTN} alt="Save" className="save-btn-icon" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>

        {confirmModalVisible && (
          <AdminEditConfirmModal
            fieldLabel={
              fieldToSave ? fieldLabels[fieldToSave] || fieldToSave : ""
            }
            onConfirm={handleConfirmSave}
            onCancel={handleCancelSave}
          />
        )}

        {updateMessageVisible && (
          <AdminPersonalUpdateMessage
            status={updateStatus}
            onHide={() => setUpdateMessageVisible(false)}
          />
        )}
      </div>
    </div>
  );
}

export default AdminPersonalEdit;
