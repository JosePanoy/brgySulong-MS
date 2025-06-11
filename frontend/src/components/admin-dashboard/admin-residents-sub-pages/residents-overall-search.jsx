import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "../../../assets/img/search.png";
import MaleIcon from "../../../assets/img/male.png";
import FemaleIcon from "../../../assets/img/female.png";
import OtherIcon from "../../../assets/img/other.png";
import "../../../assets/css/dashboard/brgy-resident-css/residents-overall-css.css";

function ResidentsOverallSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [allResults, setAllResults] = useState([]);
  const [hasMoreResults, setHasMoreResults] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (query.trim().length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      setHasMoreResults(false);
      return;
    }

    const controller = new AbortController();

    fetch(
      `http://127.0.0.1:8000/api/brgyresidents/search?q=${encodeURIComponent(
        query
      )}`,
      {
        signal: controller.signal,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => a.fname.localeCompare(b.fname));
        setSuggestions(sorted.slice(0, 5));
        setShowSuggestions(true);
        setHasMoreResults(sorted.length > 5);
      })
      .catch(() => {});

    return () => controller.abort();
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleViewMore = () => {
    fetch(
      `http://127.0.0.1:8000/api/brgyresidents/search?q=${encodeURIComponent(
        query
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        const filteredResults = data.filter(
          (resident) => !suggestions.some((s) => s.id === resident.id)
        );
        setAllResults(filteredResults);
        setShowModal(true);
        setShowSuggestions(false);
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getProfilePicture = (resident) => {
    if (resident.profile_picture_url) {
      return resident.profile_picture_url;
    }
    if (resident.gender === "Male") return MaleIcon;
    if (resident.gender === "Female") return FemaleIcon;
    return OtherIcon;
  };

  return (
    <>
      <div className="residents-overall-search-container" ref={inputRef}>
        <div className="search-input-wrapper">
          <img src={SearchIcon} alt="Search Icon" className="search-icon" />
          <input
            type="search"
            placeholder="Search resident/s, households and etc..."
            className="search-input"
            value={query}
            onChange={handleInputChange}
            onFocus={() => query && setShowSuggestions(true)}
          />
        </div>
        {showSuggestions && (
          <>
            {suggestions.length > 0 ? (
              <ul className="suggestions-list">
                {suggestions.map((resident) => (
                  <li key={resident.id} className="suggestion-item">
                    <img
                      src={getProfilePicture(resident)}
                      alt={`${resident.fname} ${resident.lname}`}
                      className="suggestion-profile-pic"
                    />
                    {resident.fname} {resident.lname} - {resident.household_no}
                  </li>
                ))}
                {hasMoreResults && (
                  <li className="view-more" onClick={handleViewMore}>
                    View more related results
                  </li>
                )}
              </ul>
            ) : (
              <ul className="suggestions-list">
                <li
                  className="no-results"
                  style={{
                    color: "black",
                    fontWeight: 700,
                    cursor: 'default',
                    textAlign: "center",
                  }}
                >
                  No related data matched.
                </li>
              </ul>
            )}
          </>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Search results for "{query}"</h3>
            <ul className="all-results-list">
              {allResults.length === 0 ? (
                <li
                  className="no-results"
                  style={{
                    color: "black",
                    fontWeight: 700,
                    cursor: 'default',
                    textAlign: "center",
                  }}
                >
                  No related data matched.
                </li>
              ) : (
                allResults.map((resident) => (
                  <li key={resident.id}>
                    {resident.fname} {resident.lname} - {resident.household_no}
                  </li>
                ))
              )}
            </ul>
            <button className="close-modal-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ResidentsOverallSearch;
