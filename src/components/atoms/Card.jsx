import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden",
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

const CardHeader = forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("px-6 py-4 border-b border-gray-200", className)}
        {...props}
      />
    );
  }
);

CardHeader.displayName = "CardHeader";

const CardBody = forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("px-6 py-4", className)}
        {...props}
      />
    );
  }
);

CardBody.displayName = "CardBody";

const CardFooter = forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("px-6 py-4 border-t border-gray-200", className)}
        {...props}
      />
    );
  }
);

CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardBody, CardFooter };