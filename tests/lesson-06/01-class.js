class Student {  // Student: PascalCase
    // thuộc tính/ property
    //name;
    //role;

    // hàm khởi tạo/ constructor
    constructor(name1, role1) {
        this.name=name1;
        this.role=role1;
    }
    // phương thức/ method
    sayMyName(){
        console.log(`My name is ${this.name}`);
    };

    saySomething(message){
        //console.log(`Say something: ${message}`);
        return `Say something: ${message}`;
    };
};

const tuyenVo = new Student ("Tuyen vo", "Quality Control");
const luNa = new Student ("Anh Ho", "Business Analytic");

console.log(tuyenVo);
console.log(tuyenVo.name, tuyenVo.role);
tuyenVo.sayMyName();
// tuyenVo.saySomething("E101 Playwright");
const msg = tuyenVo.saySomething("E101 Playwright");
console.log(msg);

