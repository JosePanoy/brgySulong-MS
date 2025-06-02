import React, { useEffect } from "react";
import "../../../assets/css/dashboard/sub-dashboard/admin-personal-update-message.css";
import ConfirmGIF from "../../../assets/gif/confirm.gif";
import DeniedGIF from "../../../assets/gif/denied.gif";

function BrgyNewsDeleteConfirm({ status, onHide }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onHide();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onHide]);

  return (
    <div className="admin-personal-update-message-overlay">
      <div className="admin-personal-update-message-container">
        <div className="admin-personal-update-message-gif">
          <img
            src={status === "success" ? ConfirmGIF : DeniedGIF}
            alt={status === "success" ? "Success" : "Error"}
          />
        </div>
      </div>
    </div>
  );
}

export default BrgyNewsDeleteConfirm;
