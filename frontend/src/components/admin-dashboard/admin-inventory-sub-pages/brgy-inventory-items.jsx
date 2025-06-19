import React, { useEffect, useState } from "react";
import AdminMainNav from "../admin-sub-components/admin-main-nav";
import AdminSideNav from "../admin-sub-components/admin-side-nav";
import AdminSlideNav from "../admin-sub-components/admin-slide-nav";
import "../../../assets/css/dashboard/brgy-inventory-css/brgy-inventory-items.css";
import BTNtoTop from "../../../sub-components/button-top-top";
import FilterIcon from "../../../assets/img/filter.png";
import LeftButton from "../../../assets/img/left.png";
import RightButton from "../../../assets/img/right.png";

function BrgyInventoryItems() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const residentsPerPage = 15;

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/inventory");
        const data = await response.json();
        setInventoryItems(data);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      }
    };

    fetchInventory();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSort = (field) => {
    const isSameField = field === sortField;
    const newDirection = isSameField && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(newDirection);
  };

  const sortedItems = [...inventoryItems].sort((a, b) => {
    if (!sortField) return 0;
    const valueA = a[sortField] || "";
    const valueB = b[sortField] || "";
    if (typeof valueA === "number" && typeof valueB === "number") {
      return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
    }
    return sortDirection === "asc"
      ? String(valueA).localeCompare(String(valueB))
      : String(valueB).localeCompare(String(valueA));
  });

  const totalPages = Math.ceil(sortedItems.length / residentsPerPage);
  const startIndex = (currentPage - 1) * residentsPerPage;
  const currentItems = sortedItems.slice(startIndex, startIndex + residentsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <AdminMainNav />
      <AdminSideNav />
      <AdminSlideNav />
      <BTNtoTop />

      <div className="brgy-inventory-items__container">
        <h2 className="brgy-inventory-items__title">Brgy Inventory Items</h2>
        <div className="brgy-inventory-items__table-wrapper">
          <table className="brgy-inventory-items__table">
            <thead>
              <tr>
                <th onClick={() => handleSort("item_name")}>
                  <div className="sortable-header">
                    Name
                    <img src={FilterIcon} alt="Sort" />
                  </div>
                </th>
                <th onClick={() => handleSort("description")}>
                  <div className="sortable-header">
                    Description
                    <img src={FilterIcon} alt="Sort" />
                  </div>
                </th>
                <th onClick={() => handleSort("quantity_total")}>
                  <div className="sortable-header">
                    Total
                    <img src={FilterIcon} alt="Sort" />
                  </div>
                </th>
                <th onClick={() => handleSort("quantity_available")}>
                  <div className="sortable-header">
                    Available
                    <img src={FilterIcon} alt="Sort" />
                  </div>
                </th>
                <th onClick={() => handleSort("unit")}>
                  <div className="sortable-header">
                    Unit
                    <img src={FilterIcon} alt="Sort" />
                  </div>
                </th>
                <th onClick={() => handleSort("condition_status")}>
                  <div className="sortable-header">
                    Condition
                    <img src={FilterIcon} alt="Sort" />
                  </div>
                </th>
                <th onClick={() => handleSort("last_maintenance_date")}>
                  <div className="sortable-header">
                    Maintenance Date
                    <img src={FilterIcon} alt="Sort" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.inventory_id}>
                  <td>{item.item_name}</td>
                  <td>{item.description || "—"}</td>
                  <td>{item.quantity_total}</td>
                  <td>{item.quantity_available}</td>
                  <td>{item.unit}</td>
                  <td>{item.condition_status}</td>
                  <td>{formatDate(item.last_maintenance_date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-controls">
          <button onClick={handlePrevious}>
            <img src={LeftButton} alt="Previous" />
          </button>
          <span className="pagination-page">
            {currentPage}/{totalPages}
          </span>
          <button onClick={handleNext}>
            <img src={RightButton} alt="Next" />
          </button>
        </div>
      </div>
    </>
  );
}

export default BrgyInventoryItems;
