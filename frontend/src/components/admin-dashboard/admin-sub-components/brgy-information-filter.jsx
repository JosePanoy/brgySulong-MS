import React from 'react';
import "../../../assets/css/dashboard/sub-dashboard/brgy-info-filter.css";

function BrgyInfoFilter({ searchTerm, filters, onFilterChange }) {
  const positionOrder = [
    { full: 'Barangay Captain', short: 'Captain' },
    { full: 'Barangay Councilor', short: 'Councilor' },
    { full: 'Barangay Secretary', short: 'Secretary' },
    { full: 'Barangay Treasurer', short: 'Treasurer' },
    { full: 'Barangay Tanod', short: 'Tanod' },
    { full: 'Barangay Health Worker (BHW)', short: 'Health Worker' },
    { full: 'Barangay Nutrition Scholar (BNS)', short: 'Nutrition Scholar' },
    { full: 'Barangay Day Care Worker', short: 'Day Care Worker' },
    { full: 'Barangay Information Officer', short: 'Info Officer' },
    { full: 'Barangay Chairman', short: 'Chairman' } // added Chairman to filter
  ];

  const handleSearchChange = (event) => {
    onFilterChange(event.target.value, filters);
  };

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    const updatedFilters = { ...filters, [name]: checked };
    onFilterChange(searchTerm, updatedFilters);
  };

  return (
    <div className="brgy-info-filter-navbar">
      <div className="brgy-info-filter-positions">
        {positionOrder.map((position, index) => (
          <div className="brgy-info-filter-position" key={index}>
            <input
              type="checkbox"
              id={`filter-${position.short.toLowerCase()}`}
              name={position.short.toLowerCase()}
              checked={filters[position.short.toLowerCase()]}
              onChange={handleFilterChange}
            />
            <label htmlFor={`filter-${position.short.toLowerCase()}`}>
              {position.short}
            </label>
          </div>
        ))}
      </div>
      <input
        className="brgy-info-filter-search"
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search"
      />
    </div>
  );
}

export default BrgyInfoFilter;
