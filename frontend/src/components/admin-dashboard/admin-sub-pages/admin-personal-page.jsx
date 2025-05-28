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
