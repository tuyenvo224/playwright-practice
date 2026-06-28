const number=[1,5,8,2,24,11,100,28,7];
let firstEven=null;

console.log(number.length);
for (let i=0; i<number.length; i++){
    const num=number[i];
    if(num%2===0){ firstEven=num; break; }
    console.log(`So ${num} ko phai so chan`);
}
console.log(`So chan dau tien: ${firstEven}`);

// /////////////////////////////////////////////

for (let i=0; i<10; i++){
    if (i===5){break;}
    console.log(i);
}


for (let i=0; i<10; i++){
    if (i<5){console.log(i);}
    
}
