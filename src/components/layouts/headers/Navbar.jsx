import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart } from "feather-icons-react";
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
} from "../../../constants/routes";
import Cta from "../../shared/buttons/Cta";
import Logo from "../../../assets/images/logo.png";
import { USER_ROLES } from "../../../constants/base";
import { useSelector } from "react-redux";
import { calculateTotalAmount } from "../../../utils/general";
import config from "../../../config/aws";

const navLinks = [
  // { href: HOME_PATH, label: "Home" },
  // { href: MCQS_BY_LESSON_PATH, label: "MCQs by Lesson" },
  { href: ABOUT_PATH, label: "About" },
  { href: PRICING_PATH, label: "Pricing" },
  { href: CONTACT_PATH, label: "Contact" },
];

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user_data") || "{}");

  // Get cart items from localStorage or state management
  // const cartItems = JSON.parse(localStorage.getItem("cart_items") || "[]");
  const cartCount = cartItems.length;
  const cartTotal = calculateTotalAmount(cartCount);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    navigate(HOME_PATH);
  };

  return (
    <nav className="sticky top-0 z-10 px-4 py-3 bg-purple-50 border-b border-purple-100">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Logo */}
        <div className="flex items-center justify-center gap-7">
          <Link to={HOME_PATH}>
            <img
              src={Logo}
              alt="Online ICT Logo"
              className="w-[120px] rounded-md"
            />
          </Link>

          <ul className="flex flex-col md:flex-row md:gap-10">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  to={href}
                  className={`hover:text-purple-500 ${
                    location.pathname === href ? "text-purple-500" : ""
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Link to={CART_PATH} className="relative group">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-purple-600 transition-colors" />
              </div>
              <div className="hidden md:flex flex-col">
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
                className="text-sm text-gray-900 cursor-pointer hover:text-purple-500"
              >
                Logout
              </button>
              <Link
                to={
                  user.role === USER_ROLES.ADMIN
                    ? ADMIN_DASHBOARD_PATH
                    : MY_RESULTS_PATH
                }
              >
                <div className="flex items-center gap-3">
                  {user?.avatar ? (
                    <img
                      className="w-10 h-10 object-cover rounded-full"
                      src={`${config.S3_PUBLIC_URL}/${user.avatar}`}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-10 h-10 bg-purple-200 rounded-full cursor-pointer hover:bg-purple-400">
                      {user.name[0]}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <p className="text-xs">{user?.name}</p>
                    <p className="text-sm font-medium">
                      Role:{" "}
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
                className="font-medium hover:text-purple-500"
              >
                Login
              </Link>
              <Cta label="Get Started" url={REGISTER_PATH} />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
