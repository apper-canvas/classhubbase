import { useState } from "react";
import { toast } from "react-toastify";
import { cn } from "@/utils/cn";
import { Card, CardHeader, CardBody } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";

const StudentForm = ({ student, onSubmit, onCancel, className }) => {
  const [formData, setFormData] = useState({
    firstName: student?.firstName || "",
    lastName: student?.lastName || "",
    email: student?.email || "",
    phone: student?.phone || "",
    dateOfBirth: student?.dateOfBirth || "",
    enrollmentDate: student?.enrollmentDate || "",
    gradeLevel: student?.gradeLevel || "",
    studentId: student?.studentId || "",
    status: student?.status || "active",
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.studentId.trim()) {
      newErrors.studentId = "Student ID is required";
    }
    
    if (!formData.gradeLevel.trim()) {
      newErrors.gradeLevel = "Grade level is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the form errors before submitting");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      toast.success(`Student ${student ? "updated" : "created"} successfully!`);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };
  
  return (
    <Card className={cn("max-w-2xl mx-auto", className)}>
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-900">
          {student ? "Edit Student" : "Add New Student"}
        </h2>
      </CardHeader>
      
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="First Name"
              required
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              error={errors.firstName}
            />
            
            <FormField
              label="Last Name"
              required
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              error={errors.lastName}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={errors.email}
            />
            
            <FormField
              label="Phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              error={errors.phone}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Date of Birth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              error={errors.dateOfBirth}
            />
            
            <FormField
              label="Enrollment Date"
              type="date"
              value={formData.enrollmentDate}
              onChange={(e) => handleChange("enrollmentDate", e.target.value)}
              error={errors.enrollmentDate}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Student ID"
              required
              value={formData.studentId}
              onChange={(e) => handleChange("studentId", e.target.value)}
              error={errors.studentId}
            />
            
            <FormField
              label="Grade Level"
              type="select"
              required
              value={formData.gradeLevel}
              onChange={(e) => handleChange("gradeLevel", e.target.value)}
              error={errors.gradeLevel}
            >
              <option value="">Select Grade Level</option>
              <option value="K">Kindergarten</option>
              <option value="1">1st Grade</option>
              <option value="2">2nd Grade</option>
              <option value="3">3rd Grade</option>
              <option value="4">4th Grade</option>
              <option value="5">5th Grade</option>
              <option value="6">6th Grade</option>
              <option value="7">7th Grade</option>
              <option value="8">8th Grade</option>
              <option value="9">9th Grade</option>
              <option value="10">10th Grade</option>
              <option value="11">11th Grade</option>
              <option value="12">12th Grade</option>
            </FormField>
          </div>
          
          <FormField
            label="Status"
            type="select"
            value={formData.status}
            onChange={(e) => handleChange("status", e.target.value)}
            error={errors.status}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="graduated">Graduated</option>
            <option value="transferred">Transferred</option>
          </FormField>
          
          <div className="flex justify-end space-x-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <ApperIcon name="Save" className="h-4 w-4 mr-2" />
                  {student ? "Update" : "Create"} Student
                </>
              )}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};

export default StudentForm;