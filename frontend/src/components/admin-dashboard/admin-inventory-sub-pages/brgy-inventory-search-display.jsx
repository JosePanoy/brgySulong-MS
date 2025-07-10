import React from "react";
import "../../../assets/css/dashboard/brgy-inventory-css/brgy-inventory-search-display.css";
import GearItem from "../../../assets/img/gear.png";

function BrgyInventorySearchDisplay({ item, onClose }) {
  // Format last maintenance date to "MMM D, YYYY" format
  const formattedDate = item.last_maintenance_date
    ? new Date(item.last_maintenance_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <div className="brgyinventorydisplay-content">
          <div className="brgyinventorydisplay-left">
            <div className="brgyinventorydisplay-image-container">
              <img
                src={`http://127.0.0.1:8000/storage/${item.item_image}`}
                alt={item.item_name}
                className="brgyinventorydisplay-image"
              />
            </div>
          </div>
          <div className="brgyinventorydisplay-right">
            <div className="brgyinventorydisplay-header">
              <h2 className="brgyinventorydisplay-itemname">{item.item_name}</h2>
              <div className="brgyinventorydisplay-header-actions">
                <button className="brgyinventorydisplay-edit">Edit Item</button>
                <img src={GearItem} alt="gear" className="brgyinventorydisplay-gear" />
              </div>
            </div>
            <div className="brgyinventorydisplay-stats">
              <span className="available">{item.quantity_available} <span>Available</span></span>
              <span className="total">{item.quantity_total} <span>Quantity Total</span></span>
              <span className="uid">{item.unique_identifier} <span>Unique ID</span></span>
            </div>
            <div className="brgyinventorydisplay-field">{item.condition_status} <span>Condition Status</span></div>
            <div className="brgyinventorydisplay-field">Unit: {item.unit}</div>
            <div className="brgyinventorydisplay-field">{formattedDate} <span>Last Maintenance</span></div>
            <div className="brgyinventorydisplay-description-text">{item.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrgyInventorySearchDisplay;
