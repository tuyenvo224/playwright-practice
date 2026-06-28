// Biến đổi mảng

let numbers=[1,2,3,4,5];

// Nhân mỗi phần tử với 2
let double=numbers.map(num=>num*2);
console.log(double);


const students = ['An', 'Bình', 'Cường'];
const studentList = students.map((name1, index1) =>
({
  id: index1 + 1,
  name: name1,
  code: `SV00${index1 + 1}`
}));

console.log(studentList);

const studentList2 = students.map((name) => name.toUpperCase());
console.log(studentList2);

const studentList3 = students.map((name, index) => `${index + 1}. ${name}`)
console.log(studentList3);

const studentList4 = students.map((name, index, arr) => `${name} / tổng: ${arr.length}`)
console.log(studentList4);

// [
//   { id: 1, name: 'An', code: 'SV001' },
//   { id: 2, name: 'Bình', code: 'SV002' },
//   { id: 3, name: 'Cường', code: 'SV003' }
// ]

/*
https://www.youtube.com/watch?v=gH1SZK98ipM

Vì JavaScript không quan tâm đến tên biến, chỉ quan tâm đến thứ tự vị trí.

Trong code của bạn:


students.map((name1, index1) => ({...}))
//            ↑ vị trí 1    ↑ vị trí 2
//          = currentValue  = index
Dù bạn đặt tên là name1, index1, hay abc, xyz — JavaScript vẫn hiểu:

Tham số thứ nhất → phần tử hiện tại ('An', 'Bình', 'Cường')
Tham số thứ hai → index của phần tử đó (0, 1, 2)

Hàm map có 3 tham số trong callback, theo thứ tự:
array.map((currentValue, index, array) => { ... })

Trong thực tế thường chỉ dùng 1 hoặc 2 tham số:


// Chỉ dùng giá trị
students.map((name) => name.toUpperCase())

// Dùng giá trị + index
students.map((name, index) => `${index + 1}. ${name}`)

// Ít khi dùng tham số thứ 3
students.map((name, index, arr) => `${name} / tổng: ${arr.length}`)
Bạn không bắt buộc phải khai báo đủ 3, chỉ khai báo những tham số bạn cần dùng.
*/