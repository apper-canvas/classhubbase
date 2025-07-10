import classesData from "@/services/mockData/classes.json";

class ClassService {
  constructor() {
    this.classes = [...classesData];
  }
  
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.classes];
  }
  
  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const classItem = this.classes.find(c => c.Id === id);
    if (!classItem) {
      throw new Error("Class not found");
    }
    return { ...classItem };
  }
  
  async create(classData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const newClass = {
      ...classData,
      Id: Math.max(...this.classes.map(c => c.Id)) + 1
    };
    
    this.classes.push(newClass);
    return { ...newClass };
  }
  
  async update(id, classData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const index = this.classes.findIndex(c => c.Id === id);
    if (index === -1) {
      throw new Error("Class not found");
    }
    
    this.classes[index] = { ...this.classes[index], ...classData };
    return { ...this.classes[index] };
  }
  
  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.classes.findIndex(c => c.Id === id);
    if (index === -1) {
      throw new Error("Class not found");
    }
    
    this.classes.splice(index, 1);
    return true;
  }
}

export default new ClassService();