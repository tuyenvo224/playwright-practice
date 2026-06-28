let array=[1,2,3];

// Thêm vào cuối - push()
array.push(4);
console.log(array);

// Thêm vào đầu - unshift()
array.unshift(0);
console.log(array);

// Thêm vào giữa - splice(vị trí, 0, phần tử)
array.splice(2,0,1.7,1.8,1.9);
console.log(array);