// Bài 1
function multiply(a,b){
return a*b
}

console.log(multiply(12,50));
console.log(multiply(35,10));

// Bài 2
// Cách 1: - sử dụng array.sort của buổi 4
function finMin(a,b,c){
    let number =[a,b,c];
    number.sort(((a,b)=>a-b));
    return(number[0]);
}
console.log(finMin(25,2,50));
console.log(finMin(90,120,30));

// Cách 2: - search google để biết hàm Math.min
function finMin2 (a,b,c){
    let min=Math.min(a,b,c);
    return min
}
console.log(finMin2(47,40,22));
console.log(finMin2(7,90,50));

// Bài 3 - hỏi AI gợi ý cách làm bài, bản thân tự code lời giải
let students = [
    {name: 'Đào', score: 8},
    {name: 'Mai', score: 9.5},
    {name: 'Trúc', score:7},
    {name: 'Hoa', score: 9},
    {name: 'Ly', score:10}  
];

function getTopStudents(students, threshold)
{  
    let arr=[];
    for (let i=0; i<students.length; i++){
        
         if (students[i].score>= threshold){
           arr.push(students[i].name)
         }
    }
    return arr;
}
console.log(getTopStudents(students,9));

// Bài 4
function calculateInterest(principal, rate, year){
    let total = principal + principal*rate*year/100
    return total
}
console.log(calculateInterest(200000000,6.5,2));