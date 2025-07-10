import { cn } from "@/utils/cn";
import { Card, CardBody } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  title = "Something went wrong",
  message = "We encountered an error while loading the data. Please try again.",
  onRetry,
  className 
}) => {
  return (
    <Card className={cn("border-red-200 bg-gradient-to-br from-red-50 to-red-100", className)}>
      <CardBody className="text-center py-12">
        <ApperIcon 
          name="AlertCircle" 
          className="h-12 w-12 text-red-500 mx-auto mb-4" 
        />
        <h3 className="text-lg font-semibold text-red-900 mb-2">{title}</h3>
        <p className="text-red-700 mb-6 max-w-sm mx-auto">{message}</p>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            className="border-red-300 text-red-700 hover:bg-red-50"
          >
            <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default Error;