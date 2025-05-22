import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingPageNavbar from "../sub-components/landing-page-navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../assets/css/login-page.css";
import { Link } from "react-router-dom";
import WrongComponent from "../sub-components/wrong-div";
import CheckComponent from "../sub-components/check-div";

function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const navigate = useNavigate();

  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    const payload = {
      phone_number: phone,
      password: password,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setShowCheck(true);
        setTimeout(() => {
          localStorage.setItem("jwt_token", data.token);
          localStorage.setItem("user_data", JSON.stringify(data.user)); // Storing full user data
          navigate("/dashboard");
        }, 4500);
      } else {
        setShowWrong(true);
        setTimeout(() => {
          setShowWrong(false);
        }, 4500);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred while logging in.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(); // Trigger login when Enter key is pressed
    }
  };

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
            onKeyDown={handleKeyPress} // Trigger login on Enter key
            className="login-page-input"
          />
          <div className="login-page-password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              onKeyDown={handleKeyPress} // Trigger login on Enter key
              className="login-page-input"
            />
            <div
              className="login-page-eye-icon"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <button className="login-page-btn" onClick={handleLogin}>
            Log In
          </button>
          <div className="login-page-forgot-password">
            <a href="/forgot-password">Forgot password?</a>
          </div>
          <div className="login-page-sign-up">
            <span>Don't have an account? </span>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
      {showWrong && <WrongComponent />}
      {showCheck && <CheckComponent />}
    </>
  );
}

export default LoginPage;
