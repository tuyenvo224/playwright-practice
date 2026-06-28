// push thêm cuối 
const fruits = ['apple', 'banana'];
const newLength = fruits.push('orange');

console.log(fruits);    // ['apple', 'banana', 'orange']
console.log(newLength); // 3 (độ dài mới)

// Push nhiều phần tử cùng lúc
fruits.push('grape', 'mango');
console.log(fruits); // ['apple', 'banana', 'orange', 'grape', 'mango']

console.log('-----------------------------------------------------------');

// unshift thêm đầu
const fruits2 = ['banana', 'orange'];
const newLength2 = fruits.unshift('apple');

console.log(fruits2);    // ['apple', 'banana', 'orange']
console.log(newLength2); // 3 (độ dài mới)

// Unshift nhiều phần tử cùng lúc
fruits2.unshift('grape', 'mango');
console.log(fruits2); // ['grape', 'mango', 'apple', 'banana', 'orange']