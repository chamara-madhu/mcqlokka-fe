import PropTypes from "prop-types";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PaperNavbar from "./headers/PaperNavbar";

const PaperLayout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top whenever the location changes
  }, [location.pathname]);

  return (
    <>
      <PaperNavbar />
      {children}
    </>
  );
};

PaperLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PaperLayout;
