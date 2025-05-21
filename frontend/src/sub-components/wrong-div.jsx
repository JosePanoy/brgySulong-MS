import React from 'react';
import WrongGIF from "../assets/gif/wrong.gif";
import "../assets/css/wrong-gif.css";

function WrongComponent() {
  return (
    <div className="wrong-component">
      <div className="wrong-box">
        <img src={WrongGIF} alt="Failure" className="wrong-gif" />
        <p className="wrong-main-text">Authentication Failed</p>
        <p className="wrong-subtext">(Check Email/Phone Number and Password)</p>
      </div>
    </div>
  );
}

export default WrongComponent;
