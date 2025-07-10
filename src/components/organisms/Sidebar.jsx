import { useState } from "react";
import { cn } from "@/utils/cn";
import NavigationItem from "@/components/molecules/NavigationItem";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = ({ className }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigationItems = [
    { to: "/", icon: "LayoutDashboard", label: "Dashboard" },
    { to: "/students", icon: "Users", label: "Students" },
    { to: "/classes", icon: "BookOpen", label: "Classes" },
    { to: "/grades", icon: "FileText", label: "Grades" },
    { to: "/attendance", icon: "Calendar", label: "Attendance" },
  ];
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
      >
        <ApperIcon name="Menu" className="h-6 w-6" />
      </button>
      
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
        />
      )}
      
      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden lg:block w-64 bg-white border-r border-gray-200 min-h-screen",
        className
      )}>
        <div className="p-6">
          <div className="flex items-center mb-8">
            <ApperIcon name="GraduationCap" className="h-8 w-8 text-primary-600 mr-3" />
            <h1 className="text-xl font-bold text-gray-900">ClassHub</h1>
          </div>
          
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <NavigationItem
                key={item.to}
                to={item.to}
                icon={item.icon}
              >
                {item.label}
              </NavigationItem>
            ))}
          </nav>
        </div>
      </div>
      
      {/* Mobile Sidebar */}
      <div className={cn(
        "lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <ApperIcon name="GraduationCap" className="h-8 w-8 text-primary-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">ClassHub</h1>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <ApperIcon name="X" className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <NavigationItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                className="w-full"
              >
                {item.label}
              </NavigationItem>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;