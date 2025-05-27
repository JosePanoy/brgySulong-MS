import React from 'react'
import "../../../assets/css/dashboard/sub-dashboard/brgy-info-filter.css"

function BrgyInfoFilter({ searchTerm, filters, onFilterChange }) {
  const positionOrder = [
    { full: 'Barangay Captain', short: 'captain' },
    { full: 'Barangay Councilor', short: 'councilor' },
    { full: 'Barangay Secretary', short: 'secretary' },
    { full: 'Barangay Treasurer', short: 'treasurer' },
    { full: 'Barangay Tanod', short: 'tanod' },
    { full: 'Barangay Health Worker (BHW)', short: 'healthworker' },
    { full: 'Barangay Nutrition Scholar (BNS)', short: 'nutritionscholar' },
    { full: 'Barangay Day Care Worker', short: 'daycareworker' },
    { full: 'Barangay Information Officer', short: 'infoofficer' },
    { full: 'Barangay Chairman', short: 'chairman' }
  ]

  const handleSearchChange = (event) => {
    onFilterChange(event.target.value, filters)
  }

  const handleDropdownChange = (event) => {
    const value = event.target.value
    let updatedFilters = {}
    positionOrder.forEach(pos => {
      updatedFilters[pos.short] = false
    })
    if (value) {
      updatedFilters[value] = true
    }
    onFilterChange(searchTerm, updatedFilters)
  }

  return (
    <div className="brgy-info-filter-navbar">
      <div className="filter-left">
        <span className="filter-label">Filter By:</span>
        <select
          className="filter-dropdown"
          onChange={handleDropdownChange}
          value={Object.keys(filters).find(key => filters[key]) || ""}
        >
          <option value="">All Positions</option>
          {positionOrder.map((pos, i) => (
            <option key={i} value={pos.short}>
              {pos.full}
            </option>
          ))}
        </select>
      </div>

      <input
        className="brgy-info-filter-search"
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search"
      />
    </div>
  )
}

export default BrgyInfoFilter
