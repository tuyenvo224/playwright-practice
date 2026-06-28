 // Thuộc tính là các biến lưu trữ dữ liệu của object. Mỗi object có giá trị riêng.
 class TestCase {
  constructor(id, title, priority) {
    // Thuộc tính instance (mỗi object có giá trị riêng)
    this.id = id;
    this.title = title;
    this.priority = priority;
    this.status = "Not Run"; // Giá trị mặc định
  }
}

let tc1 = new TestCase(1, "Login test", "High");
let tc2 = new TestCase(2, "Logout test", "Medium");

console.log(tc1.title);  // "Login test"
console.log(tc2.title);  // "Logout test"
console.log(tc1.status); // "Not Run"