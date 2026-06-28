let text='   Hello World  Javascript     ';
console.log(text.trim());
console.log(text.trimStart());
console.log(text.trimEnd());

console.log(text.toUpperCase());
console.log(text.toLowerCase());

console.log(text.includes('World'));
console.log(text.includes('world')); // có phân biệt hoa thường

console.log(text.split(" ")); // cắt chuỗi theo khoảng trắng

let email='tuyen@gmail.com';
console.log(email.split('@'));

let date ='2026-05-26';
console.log(date.split('-'));

console.log(text.replace('World','Playwright')); // thay thế chuỗi World = Playwright

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
