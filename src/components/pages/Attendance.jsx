import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import AttendanceGrid from "@/components/organisms/AttendanceGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import studentService from "@/services/api/studentService";
import attendanceService from "@/services/api/attendanceService";

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [studentsData, attendanceData] = await Promise.all([
        studentService.getAll(),
        attendanceService.getAll()
      ]);
      
      setStudents(studentsData);
      setAttendance(attendanceData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadData();
  }, []);
  
  const handleAttendanceChange = async (studentId, date, status) => {
    try {
      const existingRecord = attendance.find(
        a => a.studentId === studentId && a.date === date
      );
      
      if (existingRecord) {
        await attendanceService.update(existingRecord.Id, {
          ...existingRecord,
          status
        });
      } else {
        await attendanceService.create({
          studentId,
          classId: "1", // Default class for now
          date,
          status,
          reason: ""
        });
      }
      
      await loadData();
      toast.success("Attendance updated successfully!");
    } catch (err) {
      toast.error("Failed to update attendance. Please try again.");
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          title="Attendance" 
          subtitle="Track daily attendance and monitor student participation."
        />
        <div className="p-6">
          <Loading />
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          title="Attendance" 
          subtitle="Track daily attendance and monitor student participation."
        />
        <div className="p-6">
          <Error
            title="Failed to load attendance"
            message="We couldn't load your attendance data. Please try again."
            onRetry={loadData}
          />
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Attendance" 
        subtitle="Track daily attendance and monitor student participation."
      />
      
      <div className="p-6">
        <AttendanceGrid
          students={students}
          attendance={attendance}
          loading={false}
          error={null}
          onAttendanceChange={handleAttendanceChange}
          onRetry={loadData}
        />
      </div>
    </div>
  );
};

export default Attendance;