import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X } from "feather-icons-react";
import {
  HOME_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
  ADMIN_DASHBOARD_PATH,
  MY_RESULTS_PATH,
  PRICING_PATH,
  CART_PATH,
  ABOUT_PATH,
  CONTACT_PATH,
  MY_SUBJECTS_PATH,
} from "../../../constants/routes";
import Cta from "../../shared/buttons/Cta";
import Logo from "../../../assets/images/logo.png";
import { USER_ROLES } from "../../../constants/base";
import { useSelector } from "react-redux";
import { calculateTotalAmount } from "../../../utils/general";
import config from "../../../config/aws";

const navLinks = [
  { href: ABOUT_PATH, label: "About" },
  { href: PRICING_PATH, label: "Pricing" },
  { href: CONTACT_PATH, label: "Contact" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user_data") || "{}");

  const cartCount = cartItems.length;
  const cartTotal = calculateTotalAmount(cartCount);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    navigate(HOME_PATH);
    setIsMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 px-4 py-3 bg-purple-50 border-b border-purple-100">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link to={HOME_PATH} onClick={closeMobileMenu}>
            <img
              src={Logo}
              alt="Online ICT Logo"
              className="w-[100px] md:w-[120px] rounded-md"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex gap-10">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  to={href}
                  className={`hover:text-purple-500 transition-colors ${
                    location.pathname === href
                      ? "text-purple-500 font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Cart Icon */}
          <Link to={CART_PATH} className="relative group">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-100 transition-colors">
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-purple-600 transition-colors" />
                {cartCount > 0 && (
                  <span className="md:hidden absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 group-hover:text-purple-500">
                  {cartCount} {cartCount === 1 ? "item" : "items"}
                </span>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-purple-600">
                  Rs. {cartTotal.toLocaleString()}
                </span>
              </div>
            </div>
          </Link>

          {user.name ? (
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="text-sm text-gray-900 cursor-pointer hover:text-purple-500 transition-colors"
              >
                Logout
              </button>
              <Link
                to={
                  user.role === USER_ROLES.ADMIN
                    ? ADMIN_DASHBOARD_PATH
                    : MY_SUBJECTS_PATH
                }
              >
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-100 transition-colors">
                  {user?.avatar ? (
                    <img
                      className="w-10 h-10 object-cover rounded-full border-2 border-purple-200"
                      src={`${config.S3_PUBLIC_URL}/${user.avatar}`}
                      alt={user.name}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-10 h-10 bg-purple-200 rounded-full cursor-pointer hover:bg-purple-400 transition-colors font-semibold text-purple-700">
                      {user.name[0].toUpperCase()}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.role === USER_ROLES.ADMIN ? "Admin" : "Student"}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ) : (
            <>
              <Link
                to={LOGIN_PATH}
                className="font-medium hover:text-purple-500 transition-colors"
              >
                Login
              </Link>
              <Cta label="Get Started" url={REGISTER_PATH} />
            </>
          )}
        </div>

        {/* Mobile Right Section */}
        <div className="flex lg:hidden items-center gap-3">
          {/* Mobile Cart */}
          <Link to={CART_PATH} className="relative" onClick={closeMobileMenu}>
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-purple-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 pb-4 border-t border-purple-100">
          {/* User Section */}
          {user.name && (
            <div className="px-4 py-3 bg-purple-100 rounded-lg mb-4 mt-4">
              <Link
                to={
                  user.role === USER_ROLES.ADMIN
                    ? ADMIN_DASHBOARD_PATH
                    : MY_SUBJECTS_PATH
                }
                onClick={closeMobileMenu}
              >
                <div className="flex items-center gap-3">
                  {user?.avatar ? (
                    <img
                      className="w-12 h-12 object-cover rounded-full border-2 border-purple-300"
                      src={`${config.S3_PUBLIC_URL}/${user.avatar}`}
                      alt={user.name}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-12 h-12 bg-purple-300 rounded-full font-semibold text-purple-700">
                      {user.name[0].toUpperCase()}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <p className="text-base font-semibold text-gray-900">
                      {user?.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {user?.role === USER_ROLES.ADMIN ? "Admin" : "Student"}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Navigation Links */}
          <ul className="space-y-2 mb-4">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  to={href}
                  onClick={closeMobileMenu}
                  className={`block px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === href
                      ? "bg-purple-200 text-purple-700 font-semibold"
                      : "hover:bg-purple-100 text-gray-700"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Cart Info */}
          <Link
            to={CART_PATH}
            onClick={closeMobileMenu}
            className="block px-4 py-3 mb-4 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-gray-700">Cart</span>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  {cartCount} {cartCount === 1 ? "item" : "items"}
                </p>
                <p className="text-base font-semibold text-purple-600">
                  Rs. {cartTotal.toLocaleString()}
                </p>
              </div>
            </div>
          </Link>

          {/* Auth Buttons */}
          {user.name ? (
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 text-center bg-red-100 text-red-600 font-medium rounded-lg hover:bg-red-200 transition-colors"
            >
              Logout
            </button>
          ) : (
            <div className="space-y-2">
              <Link
                to={LOGIN_PATH}
                onClick={closeMobileMenu}
                className="block w-full px-4 py-3 text-center border-2 border-purple-500 text-purple-600 font-medium rounded-lg hover:bg-purple-50 transition-colors"
              >
                Login
              </Link>
              <Link
                to={REGISTER_PATH}
                onClick={closeMobileMenu}
                className="block w-full px-4 py-3 text-center bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
