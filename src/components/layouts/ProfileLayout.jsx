import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AdminNavbar from "./headers/AdminNavbar";
import ProfileSidebar from "./sidebars/ProfileSidebar";

const ProfileLayout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top whenever the location changes
  }, [location.pathname]);

  return (
    <>
      <AdminNavbar />
      <div className="flex">
        <ProfileSidebar />
        <div
          className="w-full h-full p-8 overflow-y-auto bg-white"
          style={{ height: "calc(100vh - 75px)" }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

ProfileLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProfileLayout;
