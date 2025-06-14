import React from 'react';
import RealTimeCountIcon from "../../../assets/img/count.png";
import OverdueReturnIcon from "../../../assets/img/overdue.png";
import ConditionItemIcon from "../../../assets/img/items.png";
import CalculatedIcon from "../../../assets/img/count.png";
import "../../../assets/css/dashboard/brgy-inventory-css/overall-preview.css";

function OverallPreview() {
  return (
    <div className="overall-preview__container">
      <div className="overall-preview__box-wrapper">
        <div className="overall-preview__box">
          <span className="overall-preview__label">Real Time Stock Count</span>
          <div className="overall-preview__icon-wrapper">
            <img src={RealTimeCountIcon} alt="Real Time" className="overall-preview__icon" />
          </div>
        </div>
        <div className="overall-preview__box">
          <span className="overall-preview__label">Overdue Returns</span>
          <div className="overall-preview__icon-wrapper">
            <img src={OverdueReturnIcon} alt="Overdue" className="overall-preview__icon" />
          </div>
        </div>
        <div className="overall-preview__box">
          <span className="overall-preview__label">Condition Items</span>
          <div className="overall-preview__icon-wrapper">
            <img src={ConditionItemIcon} alt="Condition" className="overall-preview__icon" />
          </div>
        </div>
        <div className="overall-preview__box">
          <span className="overall-preview__label">Calculated Total Counts</span>
          <div className="overall-preview__icon-wrapper">
            <img src={CalculatedIcon} alt="Calculated" className="overall-preview__icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverallPreview;
