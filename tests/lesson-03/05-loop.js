// Bài 1
let sum =0;
for (let i=1; i<=100; i++){
    sum+=i; // sum =sum+i
}
console.log(sum);

// Bài 2 - hỏi AI gợi ý cách làm bài, bản thân tự code lời giải
for (let y=2; y<=9; y++){
    console.log(`Bảng ${y}`);

   for (let i=1; i<=10; i++){
    let nhan=y*i;
console.log(`${y} x ${i} = ${nhan}`)
}
console.log('---');
}


// Bảng 2
// 2 x 1 = 2
// 2 x 2 = 4
// 2 x 3 = 6
// ...

// Bảng 3
// 3 x 1 = 3
// 3 x 2 = 6
// 3 x 3 = 9
// ...


// Bài 3
let array=[];
for (let i=1; i<=99; i++){
    if (i%2===1){ 
        array.push(i)   
    }
};
console.log(array);

 // Bài 4
for (let i=1; i<=10; i++){
    console.log(`user${i}@example.com`);
}


// Bài 5 - search google cách lấy thuộc tính trong mảng chứa object
const doanhThu=[
    {month: 1, total: 200},
    {month: 2, total: 200},
    {month: 3, total: 200},
    {month: 4, total: 200},
    {month: 5, total: 200},
    {month: 6, total: 500},
    {month: 7, total: 500},
    {month: 8, total: 800},
    {month: 9, total: 900},
    {month: 10, total: 900},
    {month: 11, total: 900},
    {month: 12, total: 900}

];
let total =0;
for (let i=0; i<12; i++){
    total= total + doanhThu[i].total;
}
console.log(`Tổng doanh thu 12 tháng là ${total}`);