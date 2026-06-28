let numbers=[55,22,60,12,75,24,100,15]

// Sắp xếp tăng dần
numbers.sort((a,b)=>a-b);
console.log(numbers);


// Sắp xếp giảm dần
let desc = numbers.sort((a,b)=>b-a);
console.log(desc);