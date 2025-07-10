import { cn } from "@/utils/cn";
import { Card, CardBody } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No data found",
  message = "Get started by adding your first item.",
  action,
  actionLabel = "Add Item",
  icon = "Inbox",
  className,
  onAction
}) => {
  return (
    <Card className={cn("bg-gradient-to-br from-gray-50 to-gray-100", className)}>
      <CardBody className="text-center py-12">
        <ApperIcon 
          name={icon} 
          className="h-12 w-12 text-gray-400 mx-auto mb-4" 
        />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6 max-w-sm mx-auto">{message}</p>
        {(action || onAction) && (
          <Button
            onClick={onAction || action}
            variant="primary"
          >
            <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
            {actionLabel}
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default Empty;