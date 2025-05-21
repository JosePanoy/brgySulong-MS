import React from 'react';
import CheckGIF from "../assets/gif/check.gif";
import "../assets/css/check-gif.css"

function CheckComponent() {
  return (
    <div className="check-component">
      <div className="check-box">
        <img src={CheckGIF} alt="Success" className="check-gif" />
        <p className="check-text">Authentication Success</p>
      </div>
    </div>
  );
}

export default CheckComponent;
