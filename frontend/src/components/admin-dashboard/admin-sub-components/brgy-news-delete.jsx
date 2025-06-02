import React, { useState } from "react";
import "../../../assets/css/dashboard/sub-dashboard/admin-edit-confirm-modal.css";

function BrgyNewsDeleteConfirm({ onConfirm, onCancel }) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="admin-edit-confirm-modal-overlay">
      <div
        className="admin-edit-confirm-modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          className="admin-edit-confirm-modal-close-btn"
          onClick={onCancel}
          aria-label="Close confirmation modal"
        >
          ×
        </button>
        <h2 id="modal-title" className="admin-edit-confirm-modal-title">
          Confirmation Required
        </h2>
        <p className="admin-edit-confirm-modal-message">
          According to barangay protocol, all data modifications must have the explicit
          consent of a higher-ranking barangay official before being finalized. Please
          confirm your agreement to proceed.
        </p>
        <label className="admin-edit-confirm-modal-agreement">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          I acknowledge and agree that these changes require higher barangay official
          consent before saving.
        </label>
        <div className="admin-edit-confirm-modal-actions">
          <button
            className="admin-edit-confirm-modal-btn admin-edit-confirm-modal-confirm"
            disabled={!agreed}
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="admin-edit-confirm-modal-btn admin-edit-confirm-modal-cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default BrgyNewsDeleteConfirm;
