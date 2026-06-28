let array=[1,2,3,4,5,6,7,8,9,10];

// Xóa phần tử cuối - pop()
array.pop();
console.log(array);

// Xóa phần tử đầu - shift()
array.shift();
console.log(array);

// Xóa phần tử ở vị trí bất kỳ - splice(vị trí, số lượng);
array.splice(1,1); // xóa 1 phần tử ở vị trí index 1
console.log(array);

array.splice(2,3,4.2,4.5);
console.log(array);