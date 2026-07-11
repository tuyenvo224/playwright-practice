const myName: string = "Tuyen";

// build-in type: kiểu dữ liệu có sẵn: string, number, boolean,...
// cutom type : kiểu dữ liệu mình tự định nghĩa

// khai báo tên kiểu dữ liệu/ class sẽ viết theo convention PascalCase
type E101User = {
    name: string;
    age: number;
    yearOfExperience: number
};

interface E101User2 {
    name: string;
    address: string;
    email: string
};

const student11: E101User = {
    name: 'Tuyen',
    age: 20,
    yearOfExperience: 2
};

const student2: E101User2 = {
    name: 'Luna',
    address: 'HCM',
    email: 'luna@gmail.com'
};

interface Gold {
    loaiVang: string;
    giaMua: number;
    giaBan: number;
    'so luong': number
};

const gold1: Gold = {
    loaiVang: '9999',
    giaMua: 15,
    giaBan: 16,
    'so luong': 1
};

const gold2: Gold = {
    loaiVang: '610',
    giaMua: 9,
    giaBan: 10,
    'so luong': 2
};


