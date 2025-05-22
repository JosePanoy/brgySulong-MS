import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminMainNav from "./admin-sub-components/admin-main-nav";
import "../../assets/css/dashboard/main-dashboard.css";
import AdminSideNav from "./admin-sub-components/admin-side-nav";
import AdminSlideNav from "./admin-sub-components/admin-slide-nav";

function MainDashboard() {
 // const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
   // const user = localStorage.getItem("user_data");

    if (!token) {
      navigate("/login");
    } else {
    //  try {
      //  if (user) {
      //    const parsedUser = JSON.parse(user); // Parse the user data correctly
       //   console.log(parsedUser); // For debugging purposes
       //   setUserData(parsedUser); // Set the parsed data into state
        }
  //    } catch (error) {
  //      console.error("Error parsing user data:", error);
 ///     }
 //   }
  }, [navigate]);

  return (
    <>
      <AdminMainNav />
      <AdminSideNav />

    </>
  );
}

export default MainDashboard;
