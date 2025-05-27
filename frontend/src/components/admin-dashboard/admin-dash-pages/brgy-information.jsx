import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminSideNav from "../admin-sub-components/admin-side-nav";
import AdminSlideNav from "../admin-sub-components/admin-slide-nav";
import AdminMainNav from "../admin-sub-components/admin-main-nav";
import "../../../assets/css/dashboard/sub-dashboard/brgy-information.css";
import BrgyInfoFilter from "../admin-sub-components/brgy-information-filter";

function BrgyInformation() {
  const [captain, setCaptain] = useState(null);
  const [otherOfficials, setOtherOfficials] = useState([]);
  const [filteredOfficials, setFilteredOfficials] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    captain: false,
    councilor: false,
    secretary: false,
    treasurer: false,
    tanod: false,
    healthworker: false,
    nutritionscholar: false,
    daycareworker: false,
    infoofficer: false,
    chairman: false,
  });

  const positionOrder = [
    "Barangay Captain",
    "Barangay Councilor",
    "Barangay Secretary",
    "Barangay Treasurer",
    "Barangay Tanod",
    "Barangay Health Worker",
    "Barangay Nutrition Scholar (BNS)",
    "Barangay Day Care Worker",
    "Barangay Information Officer",
    "Barangay Chairman",
  ];

  const positionMap = {
    "Barangay Captain": "captain",
    "Barangay Councilor": "councilor",
    Secretary: "secretary",
    Treasurer: "treasurer",
    "Barangay Tanod": "tanod",
    "Barangay Health Worker": "healthworker",
    "Barangay Nutrition Scholar": "nutritionscholar",
    "Barangay Day Care Worker": "daycareworker",
    "Barangay Information Officer": "infoofficer",
    Chairman: "chairman",
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/brgysuper/admins")
      .then((response) => response.json())
      .then((data) => {
        const captainData = data.filter(
          (admin) => admin.brgy_position === "Barangay Captain"
        );
        const otherData = data.filter(
          (admin) => admin.brgy_position !== "Barangay Captain"
        );
        setCaptain(captainData[0]);
        setOtherOfficials(otherData);
        setFilteredOfficials(otherData);
      });
  }, []);

  const sortedOfficials = otherOfficials.sort((a, b) => {
    const positionA = positionOrder.indexOf(a.brgy_position);
    const positionB = positionOrder.indexOf(b.brgy_position);
    return positionA - positionB;
  });

  const filterData = (newSearchTerm, newFilters) => {
    const filteredData = sortedOfficials.filter((admin) => {
      const key = positionMap[admin.brgy_position];
      const isPositionSelected = newFilters[key];
      const isMatchingSearch =
        admin.fname.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
        admin.lname.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
        admin.phone_number
          .toLowerCase()
          .includes(newSearchTerm.toLowerCase()) ||
        admin.email.toLowerCase().includes(newSearchTerm.toLowerCase()) ||
        admin.address.toLowerCase().includes(newSearchTerm.toLowerCase());

      return (
        (Object.values(newFilters).every((val) => !val) ||
          isPositionSelected) &&
        isMatchingSearch
      );
    });
    setFilteredOfficials(filteredData);
  };

  const handleFilterChange = (newSearchTerm, newFilters) => {
    setSearchTerm(newSearchTerm);
    setFilters(newFilters);
    filterData(newSearchTerm, newFilters);
  };

  const displayNoDataMessage =
    filteredOfficials.length === 0 &&
    (searchTerm || Object.values(filters).some((val) => val));
  const includeCaptainInDefaultView =
    !Object.values(filters).some((val) => val) && captain;

  return (
    <>
      <AdminMainNav />
      <AdminSideNav />
      <AdminSlideNav />

      <div className="brgy-info-container">
        <div className="title">Barangay Information Page</div>

        <BrgyInfoFilter
          searchTerm={searchTerm}
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        <div className="brgy-info-grid">
          {(includeCaptainInDefaultView || filters.captain) && captain && (
            <div className="brgy-info-box brgy-info-box1">
              <div className="box-content">
                <div className="top-row">
                  <div className="official-name">
                    {captain.fname} {captain.lname}
                  </div>
                  <div className="position">Barangay Captain</div>
                </div>
                <img
                  className="profile-pic"
                  src={captain.profile_picture || "profile-pic.jpg"}
                  alt="Captain"
                />
                <div className="sub-box">
                  <div className="status">Status:{captain.position_status || "N/A"}</div>
                  <div className="age">Age: {captain.age || "N/A"}</div>
                  <div className="view">
                    <Link to={`/brgy-information/personal/${captain.id}`}>
                      <button
                        type="button"
                        style={{
                          background: "none",
                          border: "none",
                          padding: 0,
                          color: "black",
                          cursor: "pointer",
                          textDecoration: "none",
                          fontSize: "0.8rem",
                        }}
                      >
                        View
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {displayNoDataMessage ? (
            <div
              style={{
                padding: "1rem",
                fontSize: "1rem",
                color: "#666",
                textAlign: "center",
                width: "100%",
              }}
            >
              There is no existing data in the database
            </div>
          ) : (
            filteredOfficials.map((admin, index) => (
              <div
                key={index}
                className={`brgy-info-box brgy-info-box${index + 2}`}
              >
                <div className="box-content">
                  <div className="top-row">
                    <div className="official-name">
                      {admin.fname} {admin.lname}
                    </div>
                    <div className="position">
                      {admin.brgy_position === "Barangay Captain"
                        ? admin.brgy_position
                        : admin.brgy_position.replace("Barangay", "Brgy.")}
                    </div>
                  </div>
                  <img
                    className="profile-pic"
                    src={admin.profile_picture || "profile-pic.jpg"}
                    alt="Official"
                  />
                  <div className="sub-box">
                    <div className="status">Status: {admin.position_status || "N/A"}</div>
                    <div className="age">Age: {admin.age || "N/A"}</div>
                    <div className="view">
                      <Link to={`/brgy-information/personal/${admin.id}`}>
                        <button
                          type="button"
                          style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            color: "black",
                            cursor: "pointer",
                            textDecoration: "none",
                            fontSize: "0.8rem",
                          }}
                        >
                          View
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default BrgyInformation;
