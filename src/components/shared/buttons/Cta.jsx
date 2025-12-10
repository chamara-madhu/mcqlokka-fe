import classNames from "classnames";
import { Link } from "react-router-dom";
import { REGISTER_PATH } from "../../../constants/routes";

const Cta = ({
  label,
  url = REGISTER_PATH,
  size = "normal",
  animation,
  className,
}) => {
  // Define classes for different sizes
  const sizeClasses = {
    small: "h-8 px-4 text-sm",
    normal: "h-10 px-5",
    large: "h-12 px-6 text-lg",
    extraLarge: "h-16 px-6 text-lg",
  };

  // Combine base classes with size-specific and animation classes
  const buttonClasses = classNames(
    "flex items-center font-medium text-white bg-purple-500 rounded-full w-fit hover:bg-purple-700 cursor-pointer justify-center",
    sizeClasses[size],
    {
      blink: animation === "blink",
      shake: animation === "shake",
      move: animation === "move",
    },
    className
  );

  return (
    <Link
      to={url}
      // target="_blank"
      rel="noopener noreferrer"
      className={buttonClasses}
    >
      {label}
    </Link>
  );
};

export default Cta;
