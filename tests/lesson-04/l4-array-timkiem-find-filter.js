let numbers=[5,15,7,19,45,120,9,2,500];

// find() - Trả về phần tử đầu tiên >10
let first = numbers.find(num=>num>10);
console.log(first);

// filter() - Trả về tất cả phần tử >10
let all= numbers.filter(num=>num>10);
console.log(all);

// /////////////////////////////
console.log('---------------------------------------------');

const numbers2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = numbers2.filter(num => num % 2 === 0);

console.log(evenNumbers); // [2, 4, 6, 8, 10]
console.log(numbers2); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] - mảng gốc không đổi

/*
https://www.youtube.com/watch?v=gH1SZK98ipM

Cú pháp filter và find
filter — trả về mảng mới chứa tất cả phần tử thỏa điều kiện

array.filter((currentValue, index, array) => điều_kiện)

const numbers = [1, 2, 3, 4, 5];
const even = numbers.filter(num => num % 2 === 0);
// Kết quả: [2, 4]  ← luôn trả về MẢNG



find — trả về phần tử đầu tiên thỏa điều kiện

array.find((currentValue, index, array) => điều_kiện)

const numbers = [1, 2, 3, 4, 5];
const firstEven = numbers.find(num => num % 2 === 0);
// Kết quả: 2  ← trả về GIÁ TRỊ (không phải mảng)

So sánh nhanh
                filter	                 find
Trả về	        Mảng mới	            Một phần tử
Số lượng	    Tất cả thỏa điều kiện	Chỉ phần tử đầu tiên
Không tìm thấy	[] (mảng rỗng)	        undefined

Cả hai đều có 3 tham số giống map
Vị trí	Ý nghĩa
1	Phần tử hiện tại
2	Index (ít dùng)
3	Mảng gốc (rất ít dùng)
Thực tế thường chỉ dùng tham số thứ nhất như trong ảnh của bạn.
*/