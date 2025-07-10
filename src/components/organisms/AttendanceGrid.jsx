import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/utils/cn";
import { Card, CardHeader, CardBody } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";
import AttendanceDot from "@/components/molecules/AttendanceDot";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const AttendanceGrid = ({ 
  students, 
  attendance, 
  loading, 
  error, 
  onAttendanceChange,
  onRetry,
  className 
}) => {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
  
  const getAttendanceForDate = (studentId, date) => {
    return attendance.find(a => a.studentId === studentId && a.date === date);
  };
  
  const handleAttendanceChange = async (studentId, status) => {
    await onAttendanceChange(studentId, selectedDate, status);
  };
  
  const getAttendanceStats = (studentId) => {
    const studentAttendance = attendance.filter(a => a.studentId === studentId);
    const total = studentAttendance.length;
    const present = studentAttendance.filter(a => a.status === "present").length;
    const rate = total > 0 ? (present / total) * 100 : 0;
    
    return {
      total,
      present,
      rate: Math.round(rate)
    };
  };
  
  const getStatusButtonClass = (currentStatus, buttonStatus) => {
    const baseClass = "px-3 py-1 rounded-full text-xs font-medium transition-all";
    const isActive = currentStatus === buttonStatus;
    
    const styles = {
      present: isActive ? "bg-green-100 text-green-800 border-green-200" : "bg-gray-100 text-gray-600 hover:bg-green-50",
      absent: isActive ? "bg-red-100 text-red-800 border-red-200" : "bg-gray-100 text-gray-600 hover:bg-red-50",
      tardy: isActive ? "bg-yellow-100 text-yellow-800 border-yellow-200" : "bg-gray-100 text-gray-600 hover:bg-yellow-50",
      excused: isActive ? "bg-blue-100 text-blue-800 border-blue-200" : "bg-gray-100 text-gray-600 hover:bg-blue-50",
    };
    
    return cn(baseClass, styles[buttonStatus], isActive && "border");
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
        title="Failed to load attendance"
        message="We couldn't load the attendance data. Please try again."
        onRetry={onRetry}
        className={className}
      />
    );
  }
  
  if (students.length === 0) {
    return (
      <Empty
        title="No students to track"
        message="Add students to your class to start tracking attendance."
        icon="Calendar"
        className={className}
      />
    );
  }
  
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Attendance</h2>
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700">Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </CardHeader>
      
      <CardBody className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendance Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => {
                const todayAttendance = getAttendanceForDate(student.Id, selectedDate);
                const stats = getAttendanceStats(student.Id);
                
                return (
                  <tr key={student.Id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {student.firstName} {student.lastName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleAttendanceChange(student.Id, "present")}
                          className={getStatusButtonClass(todayAttendance?.status, "present")}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => handleAttendanceChange(student.Id, "absent")}
                          className={getStatusButtonClass(todayAttendance?.status, "absent")}
                        >
                          Absent
                        </button>
                        <button
                          onClick={() => handleAttendanceChange(student.Id, "tardy")}
                          className={getStatusButtonClass(todayAttendance?.status, "tardy")}
                        >
                          Tardy
                        </button>
                        <button
                          onClick={() => handleAttendanceChange(student.Id, "excused")}
                          className={getStatusButtonClass(todayAttendance?.status, "excused")}
                        >
                          Excused
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <AttendanceDot status={todayAttendance?.status} />
                        <span className="text-sm font-medium">
                          {stats.rate}% ({stats.present}/{stats.total})
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};

export default AttendanceGrid;