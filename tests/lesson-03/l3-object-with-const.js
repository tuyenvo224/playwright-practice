const student ={
    name: 'Tuyen',
    age: 18
}

// Thay đổi thuộc tính của object, chỉ thay đổi từng thuộc tính của object, chứ không thay cả object bằng 1 object mới
student.name='Clover';
console.log(student);

// Thêm thuộc tính vào object
student.role='QC';
student["level"]='senior';
console.log(student);

// Xóa thuộc tính của object
delete student.level;
console.log(student);
