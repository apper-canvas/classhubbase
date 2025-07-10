import { cn } from "@/utils/cn";
import { Card, CardBody } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  className,
  variant = "default",
}) => {
  const variants = {
    default: "border-gray-200",
    primary: "border-primary-200 bg-gradient-to-br from-primary-50 to-primary-100",
    secondary: "border-secondary-200 bg-gradient-to-br from-secondary-50 to-secondary-100",
    success: "border-green-200 bg-gradient-to-br from-green-50 to-green-100",
    warning: "border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100",
    error: "border-red-200 bg-gradient-to-br from-red-50 to-red-100",
  };
  
  const iconColors = {
    default: "text-gray-500",
    primary: "text-primary-600",
    secondary: "text-secondary-600",
    success: "text-green-600",
    warning: "text-yellow-600",
    error: "text-red-600",
  };
  
  return (
    <Card className={cn(variants[variant], "transition-all duration-200 hover:shadow-xl", className)}>
      <CardBody className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
            {subtitle && (
              <p className="text-sm text-gray-500">{subtitle}</p>
            )}
            {trend && (
              <div className="flex items-center mt-2">
                <ApperIcon
                  name={trend === "up" ? "TrendingUp" : "TrendingDown"}
                  className={cn(
                    "h-4 w-4 mr-1",
                    trend === "up" ? "text-green-500" : "text-red-500"
                  )}
                />
                <span
                  className={cn(
                    "text-sm font-medium",
                    trend === "up" ? "text-green-600" : "text-red-600"
                  )}
                >
                  {trendValue}
                </span>
              </div>
            )}
          </div>
          {icon && (
            <div className="flex-shrink-0">
              <ApperIcon
                name={icon}
                className={cn("h-8 w-8", iconColors[variant])}
              />
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default StatCard;