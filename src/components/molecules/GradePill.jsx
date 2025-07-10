import { cn } from "@/utils/cn";

const GradePill = ({ grade, className }) => {
  const getGradeInfo = (grade) => {
    const numericGrade = typeof grade === "number" ? grade : parseFloat(grade);
    
    if (isNaN(numericGrade)) {
      return { letter: "N/A", style: "bg-gray-100 text-gray-800 border-gray-200" };
    }
    
    if (numericGrade >= 90) {
      return { letter: "A", style: "bg-green-100 text-green-800 border-green-200" };
    } else if (numericGrade >= 80) {
      return { letter: "B", style: "bg-blue-100 text-blue-800 border-blue-200" };
    } else if (numericGrade >= 70) {
      return { letter: "C", style: "bg-yellow-100 text-yellow-800 border-yellow-200" };
    } else if (numericGrade >= 60) {
      return { letter: "D", style: "bg-orange-100 text-orange-800 border-orange-200" };
    } else {
      return { letter: "F", style: "bg-red-100 text-red-800 border-red-200" };
    }
  };
  
  const gradeInfo = getGradeInfo(grade);
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        gradeInfo.style,
        className
      )}
    >
      {gradeInfo.letter}
    </span>
  );
};

export default GradePill;