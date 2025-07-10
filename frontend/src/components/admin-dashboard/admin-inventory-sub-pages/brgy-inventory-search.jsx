// Parent: BrgyInventorySearch.jsx
import React, { useState, useEffect, useRef } from "react";
import "../../../assets/css/dashboard/brgy-inventory-css/brgy-inventory-search.css";
import SearchIcon from "../../../assets/img/search-icon.png";
import MagnifyingGlass from "../../../assets/img/magnifying.png";
import BrgyInventorySearchDisplay from "./brgy-inventory-search-display";

function BrgyInventorySearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      fetch(
        `http://127.0.0.1:8000/api/inventory/search?query=${encodeURIComponent(
          query
        )}&per_page=5`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.length) {
            setSuggestions(data);
            setShowSuggestions(true);
          } else {
            setSuggestions([]);
            setShowSuggestions(false);
          }
        })
        .catch(() => {
          setSuggestions([]);
          setShowSuggestions(false);
        });
    }, 300);
    return () => clearTimeout(debounceTimeout.current);
  }, [query]);

  return (
    <div className="brgyinventorysearch-wrapper">
      <div className="brgyinventorysearch-box">
        <img src={MagnifyingGlass} className="brgyinventorysearch-icon-left" alt="search" />
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Type name of item or search"
            className="brgyinventorysearch-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => suggestions.length && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            autoComplete="off"
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="brgyinventorysearch-suggestions">
              {suggestions.map((item) => (
                <li
                  key={item.inventory_id}
                  onClick={() => {
                    setSelectedItem(item);
                    setShowSuggestions(false);
                  }}
                >
                  {item.item_name}
                </li>
              ))}
              {suggestions.length === 5 && (
                <li style={{ textAlign: "center", fontSize: "0.6rem", fontWeight: "600" }}>
                  Be precise in item name for more precise search
                </li>
              )}
            </ul>
          )}
        </div>
        <img src={SearchIcon} className="brgyinventorysearch-icon-right" alt="search" />
      </div>
      {selectedItem && (
        <BrgyInventorySearchDisplay item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}

export default BrgyInventorySearch;
