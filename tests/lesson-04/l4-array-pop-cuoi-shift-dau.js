// pop xóa cuối

const fruits = ['apple', 'banana', 'orange', 'grape'];
const lastFruit = fruits.pop();

console.log(lastFruit); // 'grape' - phần tử bị xóa
console.log(fruits);    // ['apple', 'banana', 'orange'] - mảng đã thay đổi

// Pop từ mảng rỗng
const empty = [];
const result = empty.pop();
console.log(result); // undefined
console.log(empty);  // []

console.log('-----------------------------------------------------------');

// shift xóa đầu

const fruits2 = ['apple', 'banana', 'orange', 'grape'];
const firstFruit = fruits.shift();

console.log(firstFruit); // 'apple' - phần tử bị xóa
console.log(fruits2);     // ['banana', 'orange', 'grape'] - mảng đã thay đổi

// Shift từ mảng rỗng
const empty2 = [];
const result2 = empty.shift();
console.log(result2); // undefined
console.log(empty2);  // []