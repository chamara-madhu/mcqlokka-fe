import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import {
  Plus,
  Edit2,
  File,
  Grid,
  BookOpen,
  User,
  CreditCard,
  HelpCircle,
  PieChart,
  Code,
} from "feather-icons-react";
import {
  ADMIN_ALL_PAYMENTS_PATH,
  ADMIN_ALL_USERS_PATH,
  ADMIN_DASHBOARD_PATH,
  ADMIN_LESSON_CREATE_PATH,
  ADMIN_LESSON_MANAGE_PATH,
  ADMIN_PAPER_CREATE_PATH,
  ADMIN_PAPER_MANAGE_PATH,
  ADMIN_QUESTION_CREATE_PATH,
  ADMIN_QUESTION_MANAGE_PATH,
  ADMIN_EXTRACT_QUESTION_PATH,
  ADMIN_GENERATE_MODEL_QUESTION_PATH,
  ADMIN_SUBJECT_CREATE_PATH,
  ADMIN_SUBJECT_MANAGE_PATH,
  ADMIN_BULK_LESSON_CREATE_PATH,
} from "../../../constants/routes";

// Define menu items dynamically
const menuItems = [
  {
    path: ADMIN_DASHBOARD_PATH,
    label: "Dashboard",
    icon: Grid,
    isParent: true,
  },
  {
    label: "Subjects",
    icon: File,
    isParent: true,
  },
  {
    path: ADMIN_SUBJECT_CREATE_PATH,
    label: "Create subject",
    icon: Plus,
    isParent: false,
  },
  {
    path: ADMIN_SUBJECT_MANAGE_PATH,
    label: "Manage subject",
    icon: Edit2,
    isParent: false,
  },
  {
    label: "Papers",
    icon: File,
    isParent: true,
  },
  {
    path: ADMIN_PAPER_CREATE_PATH,
    label: "Create paper",
    icon: Plus,
    isParent: false,
  },
  {
    path: ADMIN_PAPER_MANAGE_PATH,
    label: "Manage paper",
    icon: Edit2,
    isParent: false,
  },
  {
    label: "Lessons",
    icon: BookOpen,
    isParent: true,
  },
  {
    path: ADMIN_LESSON_CREATE_PATH,
    label: "Create lesson",
    icon: Plus,
    isParent: false,
  },
  {
    path: ADMIN_BULK_LESSON_CREATE_PATH,
    label: "Create bulk lesson",
    icon: Plus,
    isParent: false,
  },
  {
    path: ADMIN_LESSON_MANAGE_PATH,
    label: "Manage lesson",
    icon: Edit2,
    isParent: false,
  },
  {
    label: "Questions",
    icon: HelpCircle,
    isParent: true,
  },
  {
    path: ADMIN_QUESTION_CREATE_PATH,
    label: "Create question",
    icon: Plus,
    isParent: false,
  },
  {
    path: ADMIN_QUESTION_MANAGE_PATH,
    label: "Manage question",
    icon: Edit2,
    isParent: false,
  },
  {
    label: "AI Automation",
    icon: Code,
    isParent: true,
  },
  {
    path: ADMIN_EXTRACT_QUESTION_PATH,
    label: "Extract questions",
    icon: Plus,
    isParent: false,
  },
  {
    path: ADMIN_GENERATE_MODEL_QUESTION_PATH,
    label: "Model paper generation",
    icon: Plus,
    isParent: false,
  },
  {
    label: "Reports",
    icon: PieChart,
    isParent: true,
  },
  {
    path: ADMIN_ALL_USERS_PATH,
    label: "All users",
    icon: User,
    isParent: false,
  },
  {
    path: ADMIN_ALL_PAYMENTS_PATH,
    label: "All payments",
    icon: CreditCard,
    isParent: false,
  },
];

const AdminSidebar = () => {
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
                !item.path ? "bg-purple-300" : "",
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

export default AdminSidebar;
