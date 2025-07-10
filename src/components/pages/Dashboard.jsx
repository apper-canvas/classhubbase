import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/organisms/Header";
import StatCard from "@/components/molecules/StatCard";
import { Card, CardHeader, CardBody } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import studentService from "@/services/api/studentService";
import classService from "@/services/api/classService";
import attendanceService from "@/services/api/attendanceService";
import gradeService from "@/services/api/gradeService";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [studentsData, classesData, attendanceData, gradesData] = await Promise.all([
        studentService.getAll(),
        classService.getAll(),
        attendanceService.getAll(),
        gradeService.getAll()
      ]);
      
      setStudents(studentsData);
      setClasses(classesData);
      setAttendance(attendanceData);
      setGrades(gradesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadData();
  }, []);
  
  const calculateStats = () => {
    const totalStudents = students.length;
    const totalClasses = classes.length;
    
    // Calculate average grade
    const totalGrades = grades.reduce((sum, grade) => sum + grade.score, 0);
    const averageGrade = grades.length > 0 ? totalGrades / grades.length : 0;
    
    // Calculate attendance rate
    const totalAttendance = attendance.length;
    const presentCount = attendance.filter(a => a.status === "present").length;
    const attendanceRate = totalAttendance > 0 ? (presentCount / totalAttendance) * 100 : 0;
    
    return {
      totalStudents,
      totalClasses,
      averageGrade: Math.round(averageGrade),
      attendanceRate: Math.round(attendanceRate)
    };
  };
  
  const getRecentActivity = () => {
    const today = new Date().toISOString().split("T")[0];
    
    const todayAttendance = attendance.filter(a => a.date === today);
    const recentGrades = grades.slice(-5);
    
    return {
      todayAttendance,
      recentGrades
    };
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          title="Dashboard" 
          subtitle="Welcome back! Here's what's happening in your classes."
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
          title="Dashboard" 
          subtitle="Welcome back! Here's what's happening in your classes."
        />
        <div className="p-6">
          <Error
            title="Failed to load dashboard"
            message="We couldn't load your dashboard data. Please try again."
            onRetry={loadData}
          />
        </div>
      </div>
    );
  }
  
  const stats = calculateStats();
  const activity = getRecentActivity();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Dashboard" 
        subtitle="Welcome back! Here's what's happening in your classes."
      />
      
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            icon="Users"
            variant="primary"
          />
          <StatCard
            title="Active Classes"
            value={stats.totalClasses}
            icon="BookOpen"
            variant="secondary"
          />
          <StatCard
            title="Average Grade"
            value={`${stats.averageGrade}%`}
            icon="FileText"
            variant="success"
          />
          <StatCard
            title="Attendance Rate"
            value={`${stats.attendanceRate}%`}
            icon="Calendar"
            variant="warning"
          />
        </div>
        
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="h-auto p-6 flex-col space-y-2"
                asChild
              >
                <Link to="/students">
                  <ApperIcon name="UserPlus" className="h-8 w-8" />
                  <span>Add Student</span>
                </Link>
              </Button>
              
              <Button
                variant="outline"
                className="h-auto p-6 flex-col space-y-2"
                asChild
              >
                <Link to="/classes">
                  <ApperIcon name="Plus" className="h-8 w-8" />
                  <span>Create Class</span>
                </Link>
              </Button>
              
              <Button
                variant="outline"
                className="h-auto p-6 flex-col space-y-2"
                asChild
              >
                <Link to="/attendance">
                  <ApperIcon name="Calendar" className="h-8 w-8" />
                  <span>Take Attendance</span>
                </Link>
              </Button>
              
              <Button
                variant="outline"
                className="h-auto p-6 flex-col space-y-2"
                asChild
              >
                <Link to="/grades">
                  <ApperIcon name="FileText" className="h-8 w-8" />
                  <span>Enter Grades</span>
                </Link>
              </Button>
            </div>
          </CardBody>
        </Card>
        
        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Today's Attendance</h2>
            </CardHeader>
            <CardBody>
              {activity.todayAttendance.length > 0 ? (
                <div className="space-y-3">
                  {activity.todayAttendance.slice(0, 5).map((record) => {
                    const student = students.find(s => s.Id === record.studentId);
                    return (
                      <div key={record.Id} className="flex items-center justify-between">
                        <span className="text-sm text-gray-900">
                          {student?.firstName} {student?.lastName}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          record.status === "present" ? "bg-green-100 text-green-800" :
                          record.status === "absent" ? "bg-red-100 text-red-800" :
                          record.status === "tardy" ? "bg-yellow-100 text-yellow-800" :
                          "bg-blue-100 text-blue-800"
                        }`}>
                          {record.status}
                        </span>
                      </div>
                    );
                  })}
                  {activity.todayAttendance.length > 5 && (
                    <div className="text-center">
                      <Link 
                        to="/attendance" 
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        View all attendance records
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <ApperIcon name="Calendar" className="h-8 w-8 mx-auto mb-2" />
                  <p>No attendance recorded for today</p>
                </div>
              )}
            </CardBody>
          </Card>
          
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-900">Recent Grades</h2>
            </CardHeader>
            <CardBody>
              {activity.recentGrades.length > 0 ? (
                <div className="space-y-3">
                  {activity.recentGrades.map((grade) => {
                    const student = students.find(s => s.Id === grade.studentId);
                    return (
                      <div key={grade.Id} className="flex items-center justify-between">
                        <span className="text-sm text-gray-900">
                          {student?.firstName} {student?.lastName}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          grade.score >= 90 ? "bg-green-100 text-green-800" :
                          grade.score >= 80 ? "bg-blue-100 text-blue-800" :
                          grade.score >= 70 ? "bg-yellow-100 text-yellow-800" :
                          grade.score >= 60 ? "bg-orange-100 text-orange-800" :
                          "bg-red-100 text-red-800"
                        }`}>
                          {grade.score}%
                        </span>
                      </div>
                    );
                  })}
                  <div className="text-center">
                    <Link 
                      to="/grades" 
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      View all grades
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <ApperIcon name="FileText" className="h-8 w-8 mx-auto mb-2" />
                  <p>No grades recorded yet</p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;