const numbers = [1, 5, 3, 8, 2, 10, 7];

// Tìm số chẵn đầu tiên
const firstEven = numbers.find(num => num % 2 === 0);
console.log(firstEven); // 8 (không phải 2 hay 10)

// Tìm số lớn hơn 6
const greaterThanSix = numbers.find(num => num > 6);
console.log(greaterThanSix); // 8 (dừng ngay khi tìm thấy)

// Không tìm thấy
const negative = numbers.find(num => num < 0);
console.log(negative); // undefined

// /////////////////////////////
console.log('---------------------------------------------');

const users = [
  { id: 101, name: 'An', role: 'admin', active: true },
  { id: 102, name: 'Bình', role: 'user', active: false },
  { id: 103, name: 'Cường', role: 'user', active: true },
  { id: 104, name: 'Dũng', role: 'admin', active: true }
];

// Tìm user theo ID
const userId = 103;
const user = users.find(user => user.id === userId);
console.log(user); // { id: 103, name: 'Cường', role: 'user', active: true }


console.log('---------------------------------------------');

// Tìm admin đầu tiên
const firstAdmin = users.find(u => u.role === 'admin');
console.log(firstAdmin); // { id: 101, name: 'An', ... }


console.log('---------------------------------------------'); 

// Tìm user không active
const inactiveUser = users.find(u => !u.active);
console.log(inactiveUser); // { id: 102, name: 'Bình', ... }
