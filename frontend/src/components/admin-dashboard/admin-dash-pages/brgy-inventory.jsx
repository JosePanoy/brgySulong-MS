import React from "react";
import AdminMainNav from "../admin-sub-components/admin-main-nav";
import AdminSideNav from "../admin-sub-components/admin-side-nav";
import AdminSlideNav from "../admin-sub-components/admin-slide-nav";
import "../../../assets/css/dashboard/brgy-inventory-css/brgy-inventory.css";
import ViewButton from "../../../assets/img/next.png";

import InventoryLogo from "../../../assets/img/inventory_logo/inventory.png";
import StockLogo from "../../../assets/img/inventory_logo/stock.png";
import IssuanceLogo from "../../../assets/img/inventory_logo/issuance.png";
import MaintainanceLogo from "../../../assets/img/inventory_logo/maintainance.png";
import ExpensesLogo from "../../../assets/img/inventory_logo/expenses.png";
import ReportsLogo from "../../../assets/img/inventory_logo/reports.png";
import BTNtoTop from "../../../sub-components/button-top-top";
import OverallPreview from "../admin-inventory-sub-pages/overall-preview";

function BrgyInventory() {
  return (
    <>
      <AdminMainNav />
      <AdminSideNav />
      <AdminSlideNav />
      <BTNtoTop />
      <OverallPreview />

      <div className="brgy-inventory-container">

        <div className="brgy-inventory-row">
          <div className="brgy-inventory-box wide">
            <div className="brgy-inventory-header">
              <h3 className="brgy-inventory-title">
                Inventory Items
                <img src={InventoryLogo} alt="Inventory Items" className="brgy-inventory-icon" />
              </h3>
            </div>
            <p className="brgy-inventory-phrase">View all available items with key details.</p>
            <img src={ViewButton} alt="View" className="brgy-inventory-view-button" />
          </div>
          <div className="brgy-inventory-box narrow">
            <div className="brgy-inventory-header">
              <h3 className="brgy-inventory-title">
                Stock Tracking
                <img src={StockLogo} alt="Stock Tracking" className="brgy-inventory-icon" />
              </h3>
            </div>
            <p className="brgy-inventory-phrase">Monitor item quantities and stock levels.</p>
            <img src={ViewButton} alt="View" className="brgy-inventory-view-button" />
          </div>
        </div>

        <div className="brgy-inventory-row">
          <div className="brgy-inventory-box narrow">
            <div className="brgy-inventory-header">
              <h3 className="brgy-inventory-title">
                Issuance Records
                <img src={IssuanceLogo} alt="Issuance Records" className="brgy-inventory-icon" />
              </h3>
            </div>
            <p className="brgy-inventory-phrase">Log and trace item checkouts and returns.</p>
            <img src={ViewButton} alt="View" className="brgy-inventory-view-button" />
          </div>
          <div className="brgy-inventory-box wide">
            <div className="brgy-inventory-header">
              <h3 className="brgy-inventory-title">
                Condition Status
                <img src={MaintainanceLogo} alt="Condition Status" className="brgy-inventory-icon" />
              </h3>
            </div>
            <p className="brgy-inventory-phrase">Track item health, issues, and maintenance.</p>
            <img src={ViewButton} alt="View" className="brgy-inventory-view-button" />
          </div>
        </div>

        <div className="brgy-inventory-row">
          <div className="brgy-inventory-box wide">
            <div className="brgy-inventory-header">
              <h3 className="brgy-inventory-title">
                Expenses Tracking
                <img src={ExpensesLogo} alt="Expenses Tracking" className="brgy-inventory-icon" />
              </h3>
            </div>
            <p className="brgy-inventory-phrase">Record and review inventory-related spending.</p>
            <img src={ViewButton} alt="View" className="brgy-inventory-view-button" />
          </div>
          <div className="brgy-inventory-box narrow">
            <div className="brgy-inventory-header">
              <h3 className="brgy-inventory-title">
                Reports
                <img src={ReportsLogo} alt="Reports" className="brgy-inventory-icon" />
              </h3>
            </div>
            <p className="brgy-inventory-phrase">Generate summaries of inventory activities.</p>
            <img src={ViewButton} alt="View" className="brgy-inventory-view-button" />
          </div>
        </div>

      </div>
    </>
  );
}

export default BrgyInventory;
