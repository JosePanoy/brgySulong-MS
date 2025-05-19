import React, { useState } from 'react';
import "../assets/css/filter-event.css";

function FilteringEvents({ setSearchQuery, setFilterType }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleButtonClick = (type) => {
    setFilterType(type);
  };

  return (
    <div className="filtering-events-container">
      <div className="filtering-events-buttons">
        <button
          className="filtering-events-btn latest-news"
          onClick={() => handleButtonClick('latest')}
        >
          Latest
        </button>
        <button
          className="filtering-events-btn most-priority"
          onClick={() => handleButtonClick('priority')}
        >
          Priority
        </button>
      </div>
      <div className="filtering-events-search">
        <input
          type="text"
          className="filtering-events-search-input"
          placeholder="Search events..."
          value={searchInput}
          onChange={handleSearchChange}
        />
        <button className="filtering-events-search-icon">
          <i className="fas fa-search"></i>
        </button>
      </div>
    </div>
  );
}

export default FilteringEvents;
