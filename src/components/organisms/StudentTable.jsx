import { useState } from "react";
import { cn } from "@/utils/cn";
import { Card, CardHeader, CardBody } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const StudentTable = ({ 
  students, 
  loading, 
  error, 
  onEdit, 
  onDelete, 
  onRetry,
  className 
}) => {
  const [sortField, setSortField] = useState("lastName");
  const [sortDirection, setSortDirection] = useState("asc");
  
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  const sortedStudents = [...students].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
  
  const getSortIcon = (field) => {
    if (sortField !== field) return "ArrowUpDown";
    return sortDirection === "asc" ? "ArrowUp" : "ArrowDown";
  };
  
  const getStatusBadge = (status) => {
    const styles = {
      active: "bg-green-100 text-green-800 border-green-200",
      inactive: "bg-gray-100 text-gray-800 border-gray-200",
      graduated: "bg-blue-100 text-blue-800 border-blue-200",
      transferred: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };
    
    return (
      <span className={cn("px-2 py-1 rounded-full text-xs font-medium border", styles[status] || styles.inactive)}>
        {status}
      </span>
    );
  };
  
  if (loading) {
    return (
      <Card className={className}>
        <CardBody>
          <Loading />
        </CardBody>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Error
        title="Failed to load students"
        message="We couldn't load the student data. Please try again."
        onRetry={onRetry}
        className={className}
      />
    );
  }
  
  if (students.length === 0) {
    return (
      <Empty
        title="No students found"
        message="Start by adding your first student to the system."
        icon="Users"
        className={className}
      />
    );
  }
  
  return (
    <Card className={className}>
      <CardHeader>
        <h2 className="text-lg font-semibold text-gray-900">Students</h2>
      </CardHeader>
      
      <CardBody className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("studentId")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Student ID</span>
                    <ApperIcon name={getSortIcon("studentId")} className="h-4 w-4" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("lastName")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Name</span>
                    <ApperIcon name={getSortIcon("lastName")} className="h-4 w-4" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("email")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Email</span>
                    <ApperIcon name={getSortIcon("email")} className="h-4 w-4" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("gradeLevel")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Grade</span>
                    <ApperIcon name={getSortIcon("gradeLevel")} className="h-4 w-4" />
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    <ApperIcon name={getSortIcon("status")} className="h-4 w-4" />
                  </div>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedStudents.map((student) => (
                <tr key={student.Id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.studentId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.firstName} {student.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.gradeLevel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(student.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onEdit(student)}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        <ApperIcon name="Edit" className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onDelete(student.Id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <ApperIcon name="Trash2" className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};

export default StudentTable;