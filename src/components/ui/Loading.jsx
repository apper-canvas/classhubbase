import { cn } from "@/utils/cn";

const Loading = ({ className, type = "skeleton", text = "Loading..." }) => {
  if (type === "spinner") {
    return (
      <div className={cn("flex items-center justify-center p-8", className)}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        <span className="ml-3 text-gray-600">{text}</span>
      </div>
    );
  }
  
  return (
    <div className={cn("animate-pulse", className)}>
      <div className="space-y-4">
        {/* Header skeleton */}
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        
        {/* Content skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>
        
        {/* Additional skeleton items */}
        <div className="grid grid-cols-3 gap-4">
          <div className="h-8 bg-gray-300 rounded"></div>
          <div className="h-8 bg-gray-300 rounded"></div>
          <div className="h-8 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;