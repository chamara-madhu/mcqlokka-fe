import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminNavbar from "./headers/AdminNavbar";
import AdminSidebar from "./sidebars/AdminSidebar";
import { Menu, X } from "lucide-react"; // You can use any icon library or SVG

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top whenever the location changes

    // Check if mobile on mount and on resize
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <AdminNavbar />

      {/* Overlay for mobile sidebar */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar with responsive classes */}
        <div
          className={`
          ${isMobile ? "fixed inset-y-0 left-0 z-40 transform" : "relative"}
          ${
            isMobile && isSidebarOpen
              ? "translate-x-0"
              : isMobile
              ? "-translate-x-full"
              : ""
          }
          transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static
          w-full lg:w-64 xl:w-72
        `}
        >
          <AdminSidebar onClose={() => isMobile && setIsSidebarOpen(false)} />
        </div>

        {/* Main Content */}
        <main
          className="
            flex-1 
            w-full 
            p-4 sm:p-6 md:p-8 
            bg-white 
            overflow-y-auto
            lg:mt-0
          "
          style={{
            height: isMobile
              ? "calc(100vh - 64px)" // Adjust based on your navbar height
              : "calc(100vh - 75px)",
          }}
        >
          {/* Mobile Menu Button */}
          {isMobile ? (
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 mb-3 rounded-md bg-purple-600 text-white shadow-lg"
              aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          ) : null}

          {children}
        </main>
      </div>
    </>
  );
};

export default AdminLayout;

