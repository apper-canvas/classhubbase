import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      primary: "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus-visible:ring-primary-500 transform hover:scale-105",
      secondary: "bg-secondary-600 text-white hover:bg-secondary-700 active:bg-secondary-800 focus-visible:ring-secondary-500 transform hover:scale-105",
      outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100 hover:border-gray-400 focus-visible:ring-gray-500 transform hover:scale-105",
      success: "bg-success text-white hover:bg-green-600 active:bg-green-700 focus-visible:ring-green-500 transform hover:scale-105",
      warning: "bg-warning text-white hover:bg-yellow-600 active:bg-yellow-700 focus-visible:ring-yellow-500 transform hover:scale-105",
      danger: "bg-error text-white hover:bg-red-600 active:bg-red-700 focus-visible:ring-red-500 transform hover:scale-105",
      ghost: "text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus-visible:ring-gray-500",
    };
    
    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    };
    
    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;