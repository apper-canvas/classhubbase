import { cn } from "@/utils/cn";

const AttendanceDot = ({ status, className }) => {
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "present":
        return "bg-green-500";
      case "absent":
        return "bg-red-500";
      case "tardy":
        return "bg-yellow-500";
      case "excused":
        return "bg-blue-500";
      default:
        return "bg-gray-300";
    }
  };
  
  return (
    <div
      className={cn(
        "w-3 h-3 rounded-full",
        getStatusStyle(status),
        className
      )}
      title={status}
    />
  );
};

export default AttendanceDot;