import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { PieChart, DollarSign, User, Book } from "feather-icons-react";
import {
  MY_PROFILE_PATH,
  // MY_PROFILE_PATH,
  MY_PURCHASING_HISTORY_PATH,
  MY_RESULTS_PATH,
  MY_SUBJECTS_PATH,
} from "../../../constants/routes";

// Define menu items dynamically
const menuItems = [
  // {
  //   path: MY_PROFILE_PATH,
  //   label: "Dashboard",
  //   icon: Grid,
  //   isParent: true,
  // },
  {
    path: MY_SUBJECTS_PATH,
    label: "My Subjects",
    icon: Book,
    isParent: true,
  },
  {
    path: MY_RESULTS_PATH,
    label: "My Results",
    icon: PieChart,
    isParent: true,
  },
  {
    path: MY_PURCHASING_HISTORY_PATH,
    label: "Purchasing History",
    icon: DollarSign,
    isParent: true,
  },
  {
    path: MY_PROFILE_PATH,
    label: "Profile Details",
    icon: User,
    isParent: true,
  },
];

const ProfileSidebar = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div
      className="flex sticky top-[72px] flex-col w-[300px] h-full bg-purple-50 border-r border-purple-100 pb-4 overflow-auto"
      style={{ height: "calc(100vh - 75px)" }}
    >
      {menuItems.map((item, index) => {
        const isActive = item.path && pathname === item.path;
        const IconComponent = item.icon;

        return (
          <Link to={item.path || "#"} key={index}>
            <div
              className={classNames(
                "flex text-sm items-center gap-2",
                item.isParent ? "px-4" : "pl-10",
                "h-[40px]",
                isActive
                  ? "bg-purple-100 border-r-4 border-purple-700 font-medium"
                  : ""
              )}
            >
              <IconComponent size={16} />
              {item.label}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProfileSidebar;
