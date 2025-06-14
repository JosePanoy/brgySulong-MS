import React, { useEffect, useState } from "react";
import DownLogo from "../../../../assets/img/down.png";
import UpLogo from "../../../../assets/img/up.png";
import LeftLogo from "../../../../assets/img/left.png";
import RightLogo from "../../../../assets/img/right.png";
import "../../../../assets/css/dashboard/brgy-resident-css/residents-by-household.css";

function ResidentByHousehold() {
  const [households, setHouseholds] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const householdsPerPage = 10;

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/brgyresidents/residents")
      .then((res) => res.json())
      .then((data) => {
        const grouped = data.reduce((acc, resident) => {
          if (resident.household_no && resident.household_no.trim() !== "") {
            if (!acc[resident.household_no]) acc[resident.household_no] = [];
            acc[resident.household_no].push(resident);
          }
          return acc;
        }, {});
        const groupedArray = Object.entries(grouped).map(
          ([household_no, members]) => ({
            household_no,
            members,
          })
        );
        setHouseholds(groupedArray);
      });
  }, []);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const totalPages = Math.ceil(households.length / householdsPerPage);
  const startIndex = (currentPage - 1) * householdsPerPage;
  const currentHouseholds = households.slice(
    startIndex,
    startIndex + householdsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setExpandedIndex(null);
    }
  };

  return (
    <div className="resident-by-household-container">
      <div className="resident-by-household-scroll">
        {currentHouseholds.map(({ household_no, members }, index) => {
          const absoluteIndex = startIndex + index;
          const head = members.find((m) => m.is_household_head);
          return (
            <React.Fragment key={household_no}>
              <div
                className="resident-by-household-row"
                onClick={() => toggleExpand(absoluteIndex)}
              >
                <span className="resident-by-household-label">
                  {household_no}
                  {head ? ` - ${head.lname}'s` : ""}
                </span>
                <img
                  src={expandedIndex === absoluteIndex ? UpLogo : DownLogo}
                  alt="Toggle Icon"
                  className="resident-by-household-icon"
                />
              </div>
              {expandedIndex === absoluteIndex && (
                <>
                  {head && (
                    <div className="resident-by-household-head-row">
                      <span className="resident-by-household-head-label">
                        Head:
                      </span>
                      <span className="resident-by-household-head-name">
                        {head.fname} {head.lname}
                      </span>
                    </div>
                  )}
                  <div className="resident-by-household-members-row">
                    <span className="resident-by-household-members-title">
                      Members:
                    </span>
                    <div className="resident-by-household-members-list">
                      {members.map((member) => (
                        <div
                          key={member.id}
                          className="resident-by-household-member"
                        >
                          {member.fname} {member.lname}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="resident-by-household-pagination">
        <img
          src={LeftLogo}
          alt="Previous"
          className="resident-by-household-page-icon"
          onClick={() => goToPage(currentPage - 1)}
        />
        <span className="resident-by-household-page-text">
          {currentPage}/{totalPages}
        </span>
        <img
          src={RightLogo}
          alt="Next"
          className="resident-by-household-page-icon"
          onClick={() => goToPage(currentPage + 1)}
        />
      </div>
    </div>
  );
}

export default ResidentByHousehold;
