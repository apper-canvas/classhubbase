import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import { Card, CardHeader, CardBody } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import classService from "@/services/api/classService";
import studentService from "@/services/api/studentService";

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    period: "",
    room: "",
    schedule: "",
    academicYear: "",
    studentIds: []
  });
  
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [classesData, studentsData] = await Promise.all([
        classService.getAll(),
        studentService.getAll()
      ]);
      
      setClasses(classesData);
      setStudents(studentsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadData();
  }, []);
  
  const handleAddClass = () => {
    setEditingClass(null);
    setFormData({
      name: "",
      subject: "",
      period: "",
      room: "",
      schedule: "",
      academicYear: "",
      studentIds: []
    });
    setShowForm(true);
  };
  
  const handleEditClass = (classItem) => {
    setEditingClass(classItem);
    setFormData({
      name: classItem.name,
      subject: classItem.subject,
      period: classItem.period,
      room: classItem.room,
      schedule: classItem.schedule,
      academicYear: classItem.academicYear,
      studentIds: classItem.studentIds || []
    });
    setShowForm(true);
  };
  
  const handleDeleteClass = async (classId) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      try {
        await classService.delete(classId);
        await loadData();
        toast.success("Class deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete class. Please try again.");
      }
    }
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingClass) {
        await classService.update(editingClass.Id, formData);
        toast.success("Class updated successfully!");
      } else {
        await classService.create(formData);
        toast.success("Class created successfully!");
      }
      
      await loadData();
      setShowForm(false);
      setEditingClass(null);
    } catch (err) {
      toast.error("Failed to save class. Please try again.");
    }
  };
  
  const handleFormCancel = () => {
    setShowForm(false);
    setEditingClass(null);
  };
  
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const getEnrolledStudents = (classItem) => {
    return students.filter(student => 
      classItem.studentIds && classItem.studentIds.includes(student.Id)
    );
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          title="Classes" 
          subtitle="Manage your classes and enrolled students."
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
          title="Classes" 
          subtitle="Manage your classes and enrolled students."
        />
        <div className="p-6">
          <Error
            title="Failed to load classes"
            message="We couldn't load your classes data. Please try again."
            onRetry={loadData}
          />
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Classes" 
        subtitle="Manage your classes and enrolled students."
      />
      
      <div className="p-6">
        {showForm ? (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">
                {editingClass ? "Edit Class" : "Create New Class"}
              </h2>
            </CardHeader>
            
            <CardBody>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Class Name"
                    required
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="e.g., Advanced Mathematics"
                  />
                  
                  <FormField
                    label="Subject"
                    required
                    value={formData.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    placeholder="e.g., Mathematics"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    label="Period"
                    value={formData.period}
                    onChange={(e) => handleChange("period", e.target.value)}
                    placeholder="e.g., 1st Period"
                  />
                  
                  <FormField
                    label="Room"
                    value={formData.room}
                    onChange={(e) => handleChange("room", e.target.value)}
                    placeholder="e.g., Room 101"
                  />
                  
                  <FormField
                    label="Academic Year"
                    value={formData.academicYear}
                    onChange={(e) => handleChange("academicYear", e.target.value)}
                    placeholder="e.g., 2024-2025"
                  />
                </div>
                
                <FormField
                  label="Schedule"
                  value={formData.schedule}
                  onChange={(e) => handleChange("schedule", e.target.value)}
                  placeholder="e.g., MWF 9:00-10:00 AM"
                />
                
                <div className="flex justify-end space-x-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleFormCancel}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    <ApperIcon name="Save" className="h-4 w-4 mr-2" />
                    {editingClass ? "Update" : "Create"} Class
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  All Classes ({classes.length})
                </h2>
                <p className="text-gray-600">
                  Manage your classes and student enrollment
                </p>
              </div>
              <Button onClick={handleAddClass}>
                <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
                Add Class
              </Button>
            </div>
            
            {classes.length === 0 ? (
              <Empty
                title="No classes found"
                message="Create your first class to start managing students and assignments."
                icon="BookOpen"
                actionLabel="Create Class"
                onAction={handleAddClass}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((classItem) => {
                  const enrolledStudents = getEnrolledStudents(classItem);
                  
                  return (
                    <Card key={classItem.Id} className="hover:shadow-xl transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {classItem.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {classItem.subject}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditClass(classItem)}
                            >
                              <ApperIcon name="Edit" className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteClass(classItem.Id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <ApperIcon name="Trash2" className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardBody>
                        <div className="space-y-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <ApperIcon name="Clock" className="h-4 w-4 mr-2" />
                            {classItem.period || "No period assigned"}
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600">
                            <ApperIcon name="MapPin" className="h-4 w-4 mr-2" />
                            {classItem.room || "No room assigned"}
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600">
                            <ApperIcon name="Calendar" className="h-4 w-4 mr-2" />
                            {classItem.schedule || "No schedule set"}
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600">
                            <ApperIcon name="Users" className="h-4 w-4 mr-2" />
                            {enrolledStudents.length} student{enrolledStudents.length !== 1 ? "s" : ""} enrolled
                          </div>
                          
                          <div className="text-sm text-gray-600">
                            <strong>Academic Year:</strong> {classItem.academicYear || "Not specified"}
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Classes;