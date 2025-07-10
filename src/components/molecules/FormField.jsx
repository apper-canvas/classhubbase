import { cn } from "@/utils/cn";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";

const FormField = ({
  label,
  error,
  required,
  className,
  type = "input",
  children,
  ...props
}) => {
  const renderField = () => {
    if (type === "select") {
      return (
        <Select
          className={cn(error && "border-red-500 focus:border-red-500 focus:ring-red-500")}
          {...props}
        >
          {children}
        </Select>
      );
    }
    
    return (
      <Input
        className={cn(error && "border-red-500 focus:border-red-500 focus:ring-red-500")}
        {...props}
      />
    );
  };
  
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      {renderField()}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default FormField;