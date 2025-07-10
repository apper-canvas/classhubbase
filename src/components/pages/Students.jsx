import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import StudentTable from "@/components/organisms/StudentTable";
import StudentForm from "@/components/organisms/StudentForm";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import studentService from "@/services/api/studentService";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const loadStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await studentService.getAll();
      setStudents(data);
      setFilteredStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadStudents();
  }, []);
  
  useEffect(() => {
    if (searchTerm) {
      const filtered = students.filter(student =>
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents(students);
    }
  }, [searchTerm, students]);
  
  const handleAddStudent = () => {
    setEditingStudent(null);
    setShowForm(true);
  };
  
  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };
  
  const handleDeleteStudent = async (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await studentService.delete(studentId);
        await loadStudents();
        toast.success("Student deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete student. Please try again.");
      }
    }
  };
  
  const handleFormSubmit = async (formData) => {
    try {
      if (editingStudent) {
        await studentService.update(editingStudent.Id, formData);
      } else {
        await studentService.create(formData);
      }
      
      await loadStudents();
      setShowForm(false);
      setEditingStudent(null);
    } catch (err) {
      throw new Error("Failed to save student");
    }
  };
  
  const handleFormCancel = () => {
    setShowForm(false);
    setEditingStudent(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Students" 
        subtitle="Manage your student roster and information."
        onSearch={setSearchTerm}
      />
      
      <div className="p-6">
        {showForm ? (
          <StudentForm
            student={editingStudent}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  All Students ({filteredStudents.length})
                </h2>
                <p className="text-gray-600">
                  {searchTerm ? `Showing results for "${searchTerm}"` : "Manage your student roster"}
                </p>
              </div>
              <Button onClick={handleAddStudent}>
                <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </div>
            
            <StudentTable
              students={filteredStudents}
              loading={loading}
              error={error}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
              onRetry={loadStudents}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;