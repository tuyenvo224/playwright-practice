const numbers = [2, 4, 6, 8, 10];

// Kiểm tra tất cả là số chẵn?
const allEven = numbers.every(num => num % 2 === 0);
console.log(allEven); // true

// Kiểm tra tất cả > 0?
const allPositive = numbers.every(num => num > 0);
console.log(allPositive); // true

// Kiểm tra tất cả > 5?
const allGreaterThan5 = numbers.every(num => num > 5);
console.log(allGreaterThan5); // false (2 và 4 không > 5)

// Dừng ngay khi gặp false
const checkWithLog = numbers.every(num => {
  console.log(`Checking: ${num}`);
  return num < 5;
});
// Checking: 2
// Checking: 4
// Checking: 6
// => Dừng tại 6, không kiểm tra 8, 10
console.log(checkWithLog); // false

console.log('-----------------------------------------------------------');

const orderItems = [
  { product: 'iPhone 15', quantity: 1, inStock: 5,  price: 25000000 },
  { product: 'AirPods',   quantity: 2, inStock: 10, price: 4000000  },
  { product: 'Case',      quantity: 1, inStock: 20, price: 500000   }
];

// Tất cả sản phẩm còn đủ hàng?
const allAvailable = orderItems.every(item => item.inStock >= item.quantity);
console.log(allAvailable); // true

// Tất cả sản phẩm có giá hợp lệ?
const allValidPrices = orderItems.every(item => item.price > 0);
console.log(allValidPrices); // true

// Kiểm tra giới hạn số lượng (max 10 mỗi sản phẩm)
const withinQuantityLimit = orderItems.every(item => item.quantity <= 10);
console.log(withinQuantityLimit); // true

// Tổng hợp validation
function canPlaceOrder(items) {
  return items.every(item =>
    item.inStock >= item.quantity &&
    item.price > 0 &&
    item.quantity > 0 &&
    item.quantity <= 10
  );
}