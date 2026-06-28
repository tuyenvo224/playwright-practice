const products = [
  { name: 'iPhone 15', price: 28000000, category: 'phone', inStock: true },
  { name: 'Samsung S24', price: 22000000, category: 'phone', inStock: false },
  { name: 'iPad Pro', price: 35000000, category: 'tablet', inStock: true },
  { name: 'MacBook Air', price: 32000000, category: 'laptop', inStock: true },
  { name: 'AirPods', price: 4000000, category: 'accessory', inStock: true }
];

// Lọc sản phẩm còn hàng
const availableProducts = products.filter(product => product.inStock);
console.log(availableProducts); // 4 sản phẩm còn hàng

console.log('---------------------------------------------');

// Lọc sản phẩm giá dưới 30 triệu
const affordableProducts = products.filter(product => product.price < 30000000);
console.log(affordableProducts);

console.log('---------------------------------------------');

// Lọc nhiều điều kiện: điện thoại còn hàng
const availablePhones = products.filter(product =>
  product.category === 'phone' && product.inStock
);

console.log(availablePhones); // [iPhone 15]

/*
Tại sao product.inStock hiểu là === true?
Vì filter chỉ giữ lại phần tử khi callback trả về truthy.

product.inStock đã là true hoặc false rồi, nên không cần so sánh thêm:


// Hai cách này tương đương nhau
products.filter(product => product.inStock === true)
products.filter(product => product.inStock)  // ngắn hơn, cùng kết quả


Nếu muốn lọc sản phẩm hết hàng thì dùng !

// Lọc sản phẩm HẾT hàng (inStock = false)
const outOfStock = products.filter(product => !product.inStock);
// Kết quả: [Samsung S24]

// Hoặc viết tường minh hơn
const outOfStock = products.filter(product => product.inStock === false);

Tóm lại
Điều kiện	                Ý nghĩa
product.inStock	            còn hàng (true)
!product.inStock	        hết hàng (false)
product.inStock === true	còn hàng (tường minh)
product.inStock === false	hết hàng (tường minh)

Dùng ! là cách phổ biến nhất để đảo điều kiện boolean.

*/