import studentsData from "@/services/mockData/students.json";

class StudentService {
  constructor() {
    this.students = [...studentsData];
  }
  
  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.students];
  }
  
  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const student = this.students.find(s => s.Id === id);
    if (!student) {
      throw new Error("Student not found");
    }
    return { ...student };
  }
  
  async create(studentData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const newStudent = {
      ...studentData,
      Id: Math.max(...this.students.map(s => s.Id)) + 1
    };
    
    this.students.push(newStudent);
    return { ...newStudent };
  }
  
  async update(id, studentData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const index = this.students.findIndex(s => s.Id === id);
    if (index === -1) {
      throw new Error("Student not found");
    }
    
    this.students[index] = { ...this.students[index], ...studentData };
    return { ...this.students[index] };
  }
  
  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.students.findIndex(s => s.Id === id);
    if (index === -1) {
      throw new Error("Student not found");
    }
    
    this.students.splice(index, 1);
    return true;
  }
}

export default new StudentService();