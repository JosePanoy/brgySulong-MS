import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MaleLogo from "../../../../assets/img/male.png";
import FemaleLogo from "../../../../assets/img/female.png";
import OtherLogo from "../../../../assets/img/other.png";
import "../../../../assets/css/dashboard/brgy-resident-css/residents-view-all-info.css";
import AdminMainNav from '../../admin-sub-components/admin-main-nav';
import AdminSideNav from '../../admin-sub-components/admin-side-nav';
import AdminSlideNav from '../../admin-sub-components/admin-slide-nav';

function ResidentsViewAllInfo() {
  const { id } = useParams();
  const [resident, setResident] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/brgyresidents/residents/${id}`)
      .then(response => response.json())
      .then(data => setResident(data));
  }, [id]);

  const getProfileImage = () => {
    if (!resident) return null;
    const pic = resident.profile_picture;
    if (pic && pic.trim() !== '' && pic !== 'null') {
      return pic;
    }
    if (resident.gender === 'Male') {
      return MaleLogo;
    }
    if (resident.gender === 'Female') {
      return FemaleLogo;
    }
    return OtherLogo;
  };

  const calculateAge = (birthdate) => {
    if (!birthdate) return 'N/A';
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  if (!resident) {
    return <div className="resident-info__loading">Loading...</div>;
  }

  return (
    <>
      <AdminMainNav />
      <AdminSideNav />
      <AdminSlideNav />

      <div className="resident-info__container">
        <header className="resident-info__header">
          <img
            src={getProfileImage()}
            alt="Profile"
            className="resident-info__profile-picture"
          />
          <div>
            <h1 className="resident-info__name">{resident.fname} {resident.lname}</h1>
            <div className="resident-info__subinfo">
              {resident.birthdate ? new Date(resident.birthdate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'N/A'} | {calculateAge(resident.birthdate)} | {resident.gender || 'N/A'}
            </div>
          </div>
        </header>

        <div className="resident-info__grid">
          <section className="resident-info__section-box">
            <h2 className="resident-info__section-title">Contact Information</h2>
            <div className="resident-info__row">
              <span className="resident-info__label">Phone Number: {resident.phone_number || 'N/A'}</span>
            </div>
            <div className="resident-info__row">
              <span className="resident-info__label">Email: {resident.email || 'N/A'}</span>
            </div>
            <div className="resident-info__row">
              <span className="resident-info__label">Address: {resident.address || 'N/A'}</span>
            </div>
            <div className="resident-info__row">
              <span className="resident-info__label">Emergency Contact: {resident.emergency_contact || 'N/A'}</span>
            </div>
          </section>

          <section className="resident-info__section-box">
            <h2 className="resident-info__section-title">Personal Information</h2>
            <div className="resident-info__row">
              <span className="resident-info__label">Gender: {resident.gender || 'N/A'}</span>
            </div>
            <div className="resident-info__row">
              <span className="resident-info__label">Civil Status: {resident.civil_status || 'N/A'}</span>
            </div>
            <div className="resident-info__row">
              <span className="resident-info__label">Household No: {resident.household_no || 'N/A'}</span>
            </div>
            <div className="resident-info__row">
              <span className="resident-info__label">Is Household Head: {resident.is_household_head ? 'Yes' : 'No'}</span>
            </div>
          </section>

          <section className="resident-info__section-box">
            <h2 className="resident-info__section-title">Status</h2>
            <div className="resident-info__row">
              <span className="resident-info__label">Voter Status: {resident.voter_status || 'N/A'}</span>
            </div>
            <div className="resident-info__row">
              <span className="resident-info__label">Precinct No: {resident.precinct_no || 'N/A'}</span>
            </div>
            <div className="resident-info__row">
              <span className="resident-info__label">PWD Status: {resident.pwd_status ? 'Yes' : 'No'}</span>
            </div>
            <div className="resident-info__row">
              <span className="resident-info__label">Solo Parent: {resident.solo_parent ? 'Yes' : 'No'}</span>
            </div>
            <div className="resident-info__row">
              <span className="resident-info__label">Senior Citizen: {resident.senior_citizen ? 'Yes' : 'No'}</span>
            </div>
          </section>

          <section className="resident-info__section-box">
            <h2 className="resident-info__section-title">Additional Information</h2>
            <div className="resident-info__row">
              <span className="resident-info__label">Employment Status: {resident.employment_status || 'N/A'}</span>
            </div>
            <div className="resident-info__row">
              <span className="resident-info__label">Education Level: {resident.education_level || 'N/A'}</span>
            </div>
            <div className="resident-info__row">
              <span className="resident-info__label">Religion: {resident.religion || 'N/A'}</span>
            </div>
            <div className="resident-info__row">
              <span className="resident-info__label">Medical Conditions: {resident.medical_conditions || 'N/A'}</span>

            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default ResidentsViewAllInfo;
