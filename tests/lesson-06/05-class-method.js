// Phương thức là các hàm định nghĩa hành vi của object.
class TestCase {
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.status = "Not Run";
  }

  // Phương thức instance
  execute() {
    this.status = "Running";
    console.log(`Đang chạy test: ${this.title}`);
  }

  pass() {
    this.status = "Passed";
    console.log(`✓ ${this.title} - PASSED`);
  }

  fail(reason) {
    this.status = "Failed";
    console.log(`✗ ${this.title} - FAILED: ${reason}`);
  }

  getInfo() {
    return `Test #${this.id}: ${this.title} [${this.status}]`;
  }
}

// Sử dụng
let test1 = new TestCase(1, "Kiểm tra đăng nhập");

test1.execute(); // "Đang chạy test: Kiểm tra đăng nhập"
test1.pass();    // "✓ Kiểm tra đăng nhập - PASSED"
console.log(test1.getInfo()); // "Test #1: Kiểm tra đăng nhập [Passed]"