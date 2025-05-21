import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LandingPageNavbar from "../../sub-components/landing-page-navbar";
import AdminMainNav from "./admin-sub-components/admin-main-nav";
import "../../assets/css/dashboard/main-dashboard.css";

function MainDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("jwt_token")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <LandingPageNavbar />
      <AdminMainNav />
      <div>Main Dashboard</div>
    </>
  );
}

export default MainDashboard;
