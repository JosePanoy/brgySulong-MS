import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import "../../../assets/css/dashboard/sub-dashboard/admin-personal-page.css";
import AdminMainNav from "../admin-sub-components/admin-main-nav";
import AdminSideNav from "../admin-sub-components/admin-side-nav";
import AdminSlideNav from "../admin-sub-components/admin-slide-nav";
import AdminPersonalEdit from "../admin-sub-components/admin-personal-edit";

function AdminPersonalPage() {
  const { id } = useParams();
  const [officer, setOfficer] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [showLastEditedDetails, setShowLastEditedDetails] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/brgysuper/admins/${id}`)
      .then((res) => res.json())
      .then((data) => setOfficer(data))
      .catch(() => setOfficer(null));
  }, [id]);

  const refreshOfficerData = (updatedOfficer) => {
    setOfficer(updatedOfficer);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatEditedAt = (dateStr) => {
    if (!dateStr) return "N/A";

    const [datePart, timePart] = dateStr.split(", ");
    if (!datePart || !timePart) return dateStr;

    const [month, day, year] = datePart.split("/");

    const [time, meridian] = timePart.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (meridian.toUpperCase() === "PM" && hours !== 12) {
      hours += 12;
    } else if (meridian.toUpperCase() === "AM" && hours === 12) {
      hours = 0;
    }

    const hoursStr = hours.toString().padStart(2, "0");
    const minutesStr = minutes.toString().padStart(2, "0");

    const isoString = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}T${hoursStr}:${minutesStr}:00`;

    const dateObj = new Date(isoString);
    if (isNaN(dateObj)) return dateStr;

    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: true };

    return `${dateObj.toLocaleDateString(
      undefined,
      dateOptions
    )} at ${dateObj.toLocaleTimeString(undefined, timeOptions)}`;
  };

  if (!officer) {
    return (
      <>
        <AdminMainNav />
        <AdminSideNav />
        <AdminSlideNav />
        <div className="admin-personal-page loading-state">
          <p>Loading officer data...</p>
        </div>
      </>
    );
  }

  const lastEdited = officer.last_edited_by;

  return (
    <>
      <AdminMainNav />
      <AdminSideNav />
      <AdminSlideNav />

      <div className="admin-personal-page">
        <FiSettings
          className="settings-icon"
          onClick={() => setEditOpen(true)}
          size={24}
          aria-label="Edit Profile"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setEditOpen(true);
          }}
        />

        <div className="profile-header">
          <img
            src={
              officer.profile_picture
                ? `http://127.0.0.1:8000/storage/${officer.profile_picture}`
                : "profile-pic.jpg"
            }
            alt={`${officer.fname} ${officer.lname}`}
            className="profile-pic-large"
          />

          <h2 className="profile-name">
            {officer.fname} {officer.lname}
            {officer.age && officer.age !== "n/a" ? ` (${officer.age})` : ""}
          </h2>

          <p className="profile-position">{officer.brgy_position}</p>
        </div>

        <div className="profile-details">
          <div className="detail-row">
            <span className="detail-label">Phone Number:</span>
            <span className="detail-value">{officer.phone_number}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{officer.email}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Address:</span>
            <span className="detail-value">{officer.address}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Position Status:</span>
            <span className="detail-value">
              {officer.position_status || "N/A"}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Term Duration:</span>
            <span className="detail-value">
              {formatDate(officer.term_start_date)} –{" "}
              {formatDate(officer.term_end_date)}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Appointed By:</span>
            <span className="detail-value">
              {officer.appointed_by || "N/A"}
            </span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Joined At:</span>
            <span className="detail-value">
              {formatDate(officer.created_at)}
            </span>
          </div>

          <div
            className="detail-row clickable"
            onClick={() => setShowLastEditedDetails(!showLastEditedDetails)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setShowLastEditedDetails(!showLastEditedDetails);
              }
            }}
          >
            <span className="detail-label">Last Updated by:</span>
            <span className="detail-value">
              {lastEdited ? (
                <>
                  {lastEdited.fname} {lastEdited.lname}{" "}
                  <span style={{ fontSize: "0.7rem" }}>
                    (click to see full detail)
                  </span>
                </>
              ) : (
                "N/A"
              )}
            </span>
          </div>

          {showLastEditedDetails && lastEdited && (
            <div className="detail-row last-edited-details">
              <div>
                <strong>Name:</strong> {lastEdited.fname} {lastEdited.lname}
              </div>
              <div>
                <strong>Phone:</strong> {lastEdited.phone_number}
              </div>
              <div>
                <strong>Email:</strong> {lastEdited.email}
              </div>
              <div>
                <strong>Edited At:</strong>{" "}
                {formatEditedAt(lastEdited.edited_at)}
              </div>
            </div>
          )}
        </div>
      </div>

      {editOpen && (
        <AdminPersonalEdit
          officer={officer}
          onClose={() => setEditOpen(false)}
          onUpdate={refreshOfficerData}
        />
      )}
    </>
  );
}

export default AdminPersonalPage;
