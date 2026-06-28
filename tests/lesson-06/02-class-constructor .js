// Constructor là hàm khởi tạo, tự động chạy khi tạo một object mới từ class.
class Student {
  // Constructor - hàm khởi tạo
  constructor(name, grade) {
    this.name = name;   // Thuộc tính name
    this.grade = grade; // Thuộc tính grade
  }
}

// Tạo object mới - constructor tự chạy
let student1 = new Student("Hùng", 8.5);
console.log(student1.name);  // "Hùng"
console.log(student1.grade); // 8.5