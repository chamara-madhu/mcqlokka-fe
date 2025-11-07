import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AdminNavbar from "./headers/AdminNavbar";
import AdminSidebar from "./sidebars/AdminSidebar";

const AdminLayout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top whenever the location changes
  }, [location.pathname]);

  return (
    <>
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />
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

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
