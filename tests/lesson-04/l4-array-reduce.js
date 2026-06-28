const numbers = [1, 2, 3, 4, 5];

// Cách hoạt động từng bước
const sum = numbers.reduce((accumulator, current) => {
  console.log(`accumulator: ${accumulator}, current: ${current}`);
  return accumulator + current;
}, 0);

// accumulator: 0, current: 1 -> return 1
// accumulator: 1, current: 2 -> return 3
// accumulator: 3, current: 3 -> return 6
// accumulator: 6, current: 4 -> return 10
// accumulator: 10, current: 5 -> return 15

console.log(sum); // 15

// /////////////////////////////
console.log('---------------------------------------------');

const cart = [
  { product: 'Laptop', price: 20000000, quantity: 1 },
  { product: 'Mouse', price: 300000, quantity: 2 },
  { product: 'Keyboard', price: 800000, quantity: 1 },
  { product: 'Monitor', price: 5000000, quantity: 2 }
];

// Tính tổng tiền giỏ hàng
const totalAmount = cart.reduce((total, item) => {
  return total + (item.price * item.quantity);
}, 0);

console.log(`Tổng tiền: ${totalAmount.toLocaleString('vi-VN')}đ`);
// Tổng tiền: 31.400.000đ


const totalAmount2 = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

console.log(`Tổng tiền: ${totalAmount2.toLocaleString('vi-VN')}đ`);



// Tính tổng số lượng sản phẩm
const totalItems = cart.reduce((count, item) => count + item.quantity, 0);
console.log(`Tổng số sản phẩm: ${totalItems}`); // 6

const totalItems2 = cart.reduce((count, item) => {
    return count + item.quantity;}, 0);
console.log(`Tổng số sản phẩm: ${totalItems2}`); // 6

/*
Cú pháp reduce

array.reduce((accumulator, currentValue, index, array) => {
  return kết_quả_mới;
}, giáTrịBanĐầu);


*/
