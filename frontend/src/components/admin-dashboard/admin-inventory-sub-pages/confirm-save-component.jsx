import React, { useState } from 'react';
import "../../../assets/css/dashboard/brgy-inventory-css/confirm-save-component.css";
import LoadingGif from "../../../assets/gif/loading2.gif";

function ConfirmSaveComponent({ onClose, onConfirm }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = () => {
    setIsLoading(true);
    onConfirm(); // Call external handler (can include async logic outside)
  };

  return (
    <div className="confirm-save-component">
      <div className="confirm-save-overlay"></div>
      <div className="confirm-save-box">
        <div className="confirm-save-box-header">
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="confirm-save-box-content">
          <p className="confirm-message">
            You are about to finalize changes. As mandated by barangay governance protocols, any data modifications require approval from a higher-ranking barangay official. Kindly confirm your understanding to proceed.
          </p>
        </div>

        <div className="divider-line"></div>

        <div className="agreement-section">
          <input
            type="checkbox"
            id="agreement"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            disabled={isLoading}
          />
          <label htmlFor="agreement">
            I acknowledge that these changes require official consent before being saved.
          </label>
        </div>

        <div className="confirm-save-box-footer">
          {isLoading ? (
            <img src={LoadingGif} alt="Loading..." style={{ height: "50px", width: "50px" }} />
          ) : (
            <button
              className="confirm-btn"
              onClick={handleConfirm}
              disabled={!isChecked}
            >
              Proceed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConfirmSaveComponent;
