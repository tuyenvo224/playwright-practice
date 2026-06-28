// Sort chuỗi
const fruits = ['banana', 'apple', 'orange', 'grape'];
fruits.sort();
console.log(fruits); // ['apple', 'banana', 'grape', 'orange']

// BUG phổ biến: sort số KHÔNG đúng theo mặc định!
const numbers = [10, 5, 40, 25, 1000, 1];
numbers.sort();
console.log(numbers); // [1, 10, 1000, 25, 40, 5] - SAI!
// Vì sort mặc định chuyển thành string: "10" < "5"

// CÁCH ĐÚNG: dùng compare function
const numbers2 = [10, 5, 40, 25, 1000, 1];
numbers2.sort((a, b) => a - b); // tăng dần
console.log(numbers2); // [1, 5, 10, 25, 40, 1000] - ĐÚNG!

// Giảm dần
const numbers3 = [10, 5, 40, 25, 1000, 1];
numbers3.sort((a, b) => b - a);
console.log(numbers3); // [1000, 40, 25, 10, 5, 1]

// Compare function trả về:
// - Số âm: a đứng trước b
// - Số 0: giữ nguyên thứ tự
// - Số dương: b đứng trước a

const arr = [3, 1, 2];
arr.sort((a, b) => {
  console.log(`Compare ${a} với ${b}`);
  if (a < b) return -1;  // a trước b
  if (a > b) return 1;   // b trước a
  return 0;              // bằng nhau
});
// Compare 3 với 1
// Compare 3 với 2
// Compare 1 với 2
console.log(arr); // [1, 2, 3]

// Viết gọn với phép trừ (cho số)
arr.sort((a, b) => a - b); // tương đương code trên