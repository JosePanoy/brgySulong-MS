import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LandingPageNavbar from "../sub-components/landing-page-navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../assets/css/login-page.css";

function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const togglePasswordVisibility = () => {
    setPasswordVisible(true);
  };

  useEffect(() => {
    if (passwordVisible) {
      const timer = setTimeout(() => {
        setPasswordVisible(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [passwordVisible]);

  return (
    <>
      <LandingPageNavbar />
      <div className="login-page-container">
        <div className="login-page-form">
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Phone number"
            value={phone}
            onChange={handlePhoneChange}
            className="login-page-input"
          />
          <div className="login-page-password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="login-page-input"
            />
            <div
              className="login-page-eye-icon"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <button className="login-page-btn">Log In</button>
          <div className="login-page-forgot-password">
            <a href="/forgot-password">Forgot password?</a>
          </div>
          <div className="login-page-sign-up">
            <span>Don't have an account? </span>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
