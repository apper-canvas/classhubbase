import { useState } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";

const SearchBar = ({ 
  placeholder = "Search...", 
  onSearch, 
  className,
  value: externalValue,
  onChange: externalOnChange,
  ...props 
}) => {
  const [internalValue, setInternalValue] = useState("");
  
  const isControlled = externalValue !== undefined;
  const value = isControlled ? externalValue : internalValue;
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    
    if (isControlled) {
      externalOnChange?.(newValue);
    } else {
      setInternalValue(newValue);
    }
    
    onSearch?.(newValue);
  };
  
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon name="Search" className="h-5 w-5 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="pl-10"
        {...props}
      />
    </div>
  );
};

export default SearchBar;