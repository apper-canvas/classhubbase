import { useState } from "react";
import { cn } from "@/utils/cn";
import { Card, CardHeader, CardBody } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";
import GradePill from "@/components/molecules/GradePill";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const GradesGrid = ({ 
  students, 
  assignments, 
  grades, 
  loading, 
  error, 
  onGradeChange,
  onRetry,
  className 
}) => {
  const [editingGrade, setEditingGrade] = useState(null);
  const [gradeValue, setGradeValue] = useState("");
  
  const getGrade = (studentId, assignmentId) => {
    return grades.find(g => g.studentId === studentId && g.assignmentId === assignmentId);
  };
  
  const handleGradeEdit = (studentId, assignmentId, currentGrade) => {
    setEditingGrade(`${studentId}-${assignmentId}`);
    setGradeValue(currentGrade?.score?.toString() || "");
  };
  
  const handleGradeSave = async (studentId, assignmentId) => {
    const score = parseFloat(gradeValue);
    if (!isNaN(score) && score >= 0 && score <= 100) {
      await onGradeChange(studentId, assignmentId, score);
    }
    setEditingGrade(null);
    setGradeValue("");
  };
  
  const handleGradeCancel = () => {
    setEditingGrade(null);
    setGradeValue("");
  };
  
  const calculateStudentAverage = (studentId) => {
    const studentGrades = grades.filter(g => g.studentId === studentId);
    if (studentGrades.length === 0) return null;
    
    const sum = studentGrades.reduce((acc, grade) => acc + grade.score, 0);
    return sum / studentGrades.length;
  };
  
  const calculateAssignmentAverage = (assignmentId) => {
    const assignmentGrades = grades.filter(g => g.assignmentId === assignmentId);
    if (assignmentGrades.length === 0) return null;
    
    const sum = assignmentGrades.reduce((acc, grade) => acc + grade.score, 0);
    return sum / assignmentGrades.length;
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
        title="Failed to load grades"
        message="We couldn't load the grades data. Please try again."
        onRetry={onRetry}
        className={className}
      />
    );
  }
  
  if (students.length === 0 || assignments.length === 0) {
    return (
      <Empty
        title="No grades to display"
        message="Create assignments and enroll students to start tracking grades."
        icon="FileText"
        className={className}
      />
    );
  }
  
  return (
    <Card className={className}>
      <CardHeader>
        <h2 className="text-lg font-semibold text-gray-900">Grades</h2>
      </CardHeader>
      
      <CardBody className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                  Student
                </th>
                {assignments.map((assignment) => (
                  <th key={assignment.Id} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                    <div className="flex flex-col items-center">
                      <span>{assignment.title}</span>
                      <span className="text-xs text-gray-400">
                        {assignment.totalPoints} pts
                      </span>
                      <div className="mt-1">
                        <GradePill grade={calculateAssignmentAverage(assignment.Id)} />
                      </div>
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px] sticky right-0 bg-gray-50 z-10">
                  Average
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.Id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white z-10">
                    {student.firstName} {student.lastName}
                  </td>
                  {assignments.map((assignment) => {
                    const grade = getGrade(student.Id, assignment.Id);
                    const isEditing = editingGrade === `${student.Id}-${assignment.Id}`;
                    
                    return (
                      <td key={assignment.Id} className="px-4 py-4 text-center">
                        {isEditing ? (
                          <div className="flex items-center justify-center space-x-2">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={gradeValue}
                              onChange={(e) => setGradeValue(e.target.value)}
                              className="w-16 text-center"
                              autoFocus
                            />
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() => handleGradeSave(student.Id, assignment.Id)}
                            >
                              <ApperIcon name="Check" className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={handleGradeCancel}
                            >
                              <ApperIcon name="X" className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleGradeEdit(student.Id, assignment.Id, grade)}
                            className="flex items-center justify-center space-x-2 px-3 py-1 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            {grade ? (
                              <>
                                <span className="text-sm font-medium">{grade.score}</span>
                                <GradePill grade={grade.score} />
                              </>
                            ) : (
                              <span className="text-gray-400 text-sm">--</span>
                            )}
                          </button>
                        )}
                      </td>
                    );
                  })}
                  <td className="px-4 py-4 text-center sticky right-0 bg-white z-10">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-sm font-medium">
                        {calculateStudentAverage(student.Id)?.toFixed(1) || "--"}
                      </span>
                      <GradePill grade={calculateStudentAverage(student.Id)} />
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

export default GradesGrid;