import PropTypes from "prop-types";
import classNames from "classnames";

const Button = ({
  label,
  type = "button",
  handleBtn,
  size = "normal",
  color = "primary",
  animation,
  isLoading,
  loadingLabel,
  className,
}) => {
  // Define classes for different sizes
  const sizeClasses = {
    small: "h-8 px-4 text-sm",
    normal: "h-10 px-5",
    large: "h-12 px-6 text-lg",
    extraLarge: "h-16 px-6 text-lg",
  };

  // Define classes for different colors
  const colorClasses = {
    primary: "bg-purple-500 hover:bg-purple-700 text-white",
    secondary: "bg-purple-50 hover:bg-purple-100 border",
  };

  // Combine base classes with size-specific and animation classes
  const buttonClasses = classNames(
    "flex items-center rounded-full w-fit cursor-pointer justify-center",
    sizeClasses[size],
    colorClasses[color],
    {
      blink: animation === "blink",
      shake: animation === "shake",
      move: animation === "move",
    },
    className
  );

  return (
    <button type={type} onClick={handleBtn} className={buttonClasses} disabled={isLoading}>
      {isLoading ? loadingLabel ? loadingLabel : "Loading..." : label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  handleBtn: PropTypes.func,
  size: PropTypes.oneOf(["small", "normal", "large", "extraLarge"]),
  color: PropTypes.oneOf(["primary", "secondary"]),
  animation: PropTypes.oneOf(["blink", "shake", "move"]),
  className: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default Button;
