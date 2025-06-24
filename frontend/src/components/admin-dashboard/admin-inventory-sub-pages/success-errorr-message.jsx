import React, { useState } from "react";
import "../../../assets/css/dashboard/brgy-inventory-css/success-errorr-message.css";

function SuccessErrorMessage({ type }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className={`sem-container ${type === "success" ? "sem-success" : "sem-error"}`}>
      <span className="sem-close" onClick={() => setVisible(false)}>×</span>
      <p className="sem-message">
        {type === "success" ? "Successfully Created!" : "Sorry something went wrong :("}
      </p>
    </div>
  );
}

export default SuccessErrorMessage;
