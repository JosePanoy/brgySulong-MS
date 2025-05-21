import React from 'react'
import ConfirmGIF from "../assets/gif/exit.gif"
import "../assets/css/logout-div.css"

function LogoutDiv() {
  return (
       <div className="confirm-component">
         <div className="confirm-box">
           <img src={ConfirmGIF} alt="Success" className="confirm-gif" />
           <p className="confirm-text">Logging Out</p>
         </div>
       </div>
  )
}

export default LogoutDiv