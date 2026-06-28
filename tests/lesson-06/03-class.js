// // Tạo user thủ công - lặp lại code nhiều
// let user1 = {
//   name: "Nam",
//   age: 25,
//   sayHello: function() {
//     console.log(`Xin chào, tôi là ${this.name}`);
//   }
// };

// let user2 = {
//   name: "Lan",
//   age: 23,
//   sayHello: function() {
//     console.log("Xin chào, tôi là " + this.name);
//   }
// };

// user1.sayHello();
// user2.sayHello();

//////////////////////////////

class User {
  constructor(name, age) {
    this.name1 = name;
    this.age1 = age;
  }

  sayHello() {
    console.log("Xin chào, tôi là " + this.name1);
  }
}

// Tạo nhiều user dễ dàng, code gọn
let user1 = new User("Nam", 25);
let user2 = new User("Lan", 23);

user1.sayHello(); // "Xin chào, tôi là Nam"
user2.sayHello(); // "Xin chào, tôi là Lan"