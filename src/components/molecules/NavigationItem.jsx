import { NavLink } from "react-router-dom";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const NavigationItem = ({ to, icon, children, className }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group",
          isActive
            ? "bg-primary-600 text-white shadow-lg"
            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
          className
        )
      }
    >
      {icon && (
        <ApperIcon
          name={icon}
          className="h-5 w-5 mr-3 flex-shrink-0"
        />
      )}
      {children}
    </NavLink>
  );
};

export default NavigationItem;