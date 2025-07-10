import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "@/components/organisms/Header";
import GradesGrid from "@/components/organisms/GradesGrid";
import { Card, CardHeader, CardBody } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import studentService from "@/services/api/studentService";
import assignmentService from "@/services/api/assignmentService";
import gradeService from "@/services/api/gradeService";

const Grades = () => {
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [assignmentFormData, setAssignmentFormData] = useState({
    title: "",
    type: "",
    totalPoints: "",
    dueDate: "",
    description: ""
  });
  
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [studentsData, assignmentsData, gradesData] = await Promise.all([
        studentService.getAll(),
        assignmentService.getAll(),
        gradeService.getAll()
      ]);
      
      setStudents(studentsData);
      setAssignments(assignmentsData);
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
  
  const handleGradeChange = async (studentId, assignmentId, score) => {
    try {
      const existingGrade = grades.find(g => g.studentId === studentId && g.assignmentId === assignmentId);
      
      if (existingGrade) {
        await gradeService.update(existingGrade.Id, {
          ...existingGrade,
          score,
          submittedDate: new Date().toISOString().split("T")[0]
        });
      } else {
        await gradeService.create({
          studentId,
          assignmentId,
          score,
          submittedDate: new Date().toISOString().split("T")[0],
          comments: ""
        });
      }
      
      await loadData();
      toast.success("Grade updated successfully!");
    } catch (err) {
      toast.error("Failed to update grade. Please try again.");
    }
  };
  
  const handleAddAssignment = () => {
    setAssignmentFormData({
      title: "",
      type: "",
      totalPoints: "",
      dueDate: "",
      description: ""
    });
    setShowAssignmentForm(true);
  };
  
  const handleAssignmentSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await assignmentService.create({
        ...assignmentFormData,
        classId: "1", // Default class for now
        totalPoints: parseFloat(assignmentFormData.totalPoints)
      });
      
      await loadData();
      setShowAssignmentForm(false);
      toast.success("Assignment created successfully!");
    } catch (err) {
      toast.error("Failed to create assignment. Please try again.");
    }
  };
  
  const handleAssignmentCancel = () => {
    setShowAssignmentForm(false);
  };
  
  const handleAssignmentChange = (field, value) => {
    setAssignmentFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          title="Grades" 
          subtitle="Manage assignments and track student performance."
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
          title="Grades" 
          subtitle="Manage assignments and track student performance."
        />
        <div className="p-6">
          <Error
            title="Failed to load grades"
            message="We couldn't load your grades data. Please try again."
            onRetry={loadData}
          />
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title="Grades" 
        subtitle="Manage assignments and track student performance."
      />
      
      <div className="p-6 space-y-6">
        {showAssignmentForm ? (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">
                Create New Assignment
              </h2>
            </CardHeader>
            
            <CardBody>
              <form onSubmit={handleAssignmentSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Assignment Title"
                    required
                    value={assignmentFormData.title}
                    onChange={(e) => handleAssignmentChange("title", e.target.value)}
                    placeholder="e.g., Chapter 5 Quiz"
                  />
                  
                  <FormField
                    label="Type"
                    type="select"
                    required
                    value={assignmentFormData.type}
                    onChange={(e) => handleAssignmentChange("type", e.target.value)}
                  >
                    <option value="">Select Type</option>
                    <option value="quiz">Quiz</option>
                    <option value="exam">Exam</option>
                    <option value="homework">Homework</option>
                    <option value="project">Project</option>
                    <option value="participation">Participation</option>
                  </FormField>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    label="Total Points"
                    type="number"
                    required
                    value={assignmentFormData.totalPoints}
                    onChange={(e) => handleAssignmentChange("totalPoints", e.target.value)}
                    placeholder="100"
                  />
                  
                  <FormField
                    label="Due Date"
                    type="date"
                    value={assignmentFormData.dueDate}
                    onChange={(e) => handleAssignmentChange("dueDate", e.target.value)}
                  />
                </div>
                
                <FormField
                  label="Description"
                  value={assignmentFormData.description}
                  onChange={(e) => handleAssignmentChange("description", e.target.value)}
                  placeholder="Assignment description or instructions"
                />
                
                <div className="flex justify-end space-x-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAssignmentCancel}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    <ApperIcon name="Save" className="h-4 w-4 mr-2" />
                    Create Assignment
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
                  Grade Book
                </h2>
                <p className="text-gray-600">
                  Enter and manage student grades for assignments
                </p>
              </div>
              <Button onClick={handleAddAssignment}>
                <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
                Add Assignment
              </Button>
            </div>
            
            <GradesGrid
              students={students}
              assignments={assignments}
              grades={grades}
              loading={false}
              error={null}
              onGradeChange={handleGradeChange}
              onRetry={loadData}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Grades;