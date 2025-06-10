import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingPageNavbar from "../sub-components/landing-page-navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../assets/css/login-page.css";
import { Link } from "react-router-dom";
import WrongComponent from "../sub-components/wrong-div";
import CheckComponent from "../sub-components/check-div";
import LoadingGif from "../assets/gif/loading.gif";

function LoginPage() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showWrong, setShowWrong] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailOrPhoneChange = (e) => setEmailOrPhone(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    setLoading(true);
    const isEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
      emailOrPhone
    );
    const payload = {
      email: isEmail ? emailOrPhone : undefined,
      phone_number: !isEmail ? emailOrPhone : undefined,
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
        setLoading(false);
        setTimeout(() => {
          localStorage.setItem("jwt_token", data.token);
          localStorage.setItem("user_data", JSON.stringify(data.user));
          navigate("/dashboard");
        }, 4500);
      } else {
        setShowWrong(true);
        setLoading(false);
        setTimeout(() => {
          setShowWrong(false);
        }, 4500);
      }
    } catch {
      setLoading(false);
      alert("An error occurred while logging in.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
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
            placeholder="Phone number or Email"
            value={emailOrPhone}
            onChange={handleEmailOrPhoneChange}
            onKeyDown={handleKeyPress}
            className="login-page-input"
          />
          <div className="login-page-password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              onKeyDown={handleKeyPress}
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
          {loading && (
            <div className="loading-wait-animation">
              <img src={LoadingGif} alt="Loading..." />
            </div>
          )}
          <div className="login-page-forgot-password">
            <a href="/forgot-password">Forgot password?</a>
          </div>
          <div className="login-page-sign-up">
            <span>Don't have an account? </span>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
      {!loading && showWrong && <WrongComponent />}
      {!loading && showCheck && <CheckComponent />}
    </>
  );
}

export default LoginPage;
