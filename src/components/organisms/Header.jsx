import { cn } from "@/utils/cn";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ title, subtitle, onSearch, className }) => {
  return (
    <header className={cn("bg-white border-b border-gray-200", className)}>
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {onSearch && (
              <SearchBar
                placeholder="Search..."
                onSearch={onSearch}
                className="w-64"
              />
            )}
            
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <ApperIcon name="Bell" className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <ApperIcon name="Settings" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;