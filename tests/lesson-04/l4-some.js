const numbers = [1, 3, 5, 7, 8, 9];

// Kiểm tra có số chẵn không?
const hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven); // true (vì có số 8)

// Kiểm tra có số > 10 không?
const hasGreaterThan10 = numbers.some(num => num > 10);
console.log(hasGreaterThan10); // false

// Dừng ngay khi tìm thấy
const hasEvenWithLog = numbers.some(num => {
  console.log(`Checking: ${num}`);
  return num % 2 === 0;
});
// Checking: 1
// Checking: 3
// Checking: 5
// Checking: 7
// Checking: 8
// => Dừng, không kiểm tra 9

console.log('-----------------------------------------------------------');

const user = {
  name: 'Nguyễn Văn A',
  roles: ['user', 'editor']
};

const adminRoles = ['admin', 'superadmin'];
const editorRoles = ['editor', 'admin'];

// Kiểm tra user có quyền editor không?
const canEdit = user.roles.some(role => editorRoles.includes(role));
console.log(canEdit); // true (có role 'editor')

// Kiểm tra user có phải admin không?
const isAdmin = user.roles.some(role => adminRoles.includes(role));
console.log(isAdmin); // false

// Hàm kiểm tra quyền tổng quát
function hasPermission(userRoles, requiredRoles) {
  return userRoles.some(role => requiredRoles.includes(role));
}
console.log(hasPermission(user.roles, ['viewer', 'editor'])); // true