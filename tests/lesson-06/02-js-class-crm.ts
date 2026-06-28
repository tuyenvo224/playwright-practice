//  npx tsx <file_path>
// npx ts-node <file_path>
// npx tsc <file_path> -> để biên dịch file ts thành file js, sau đó chạy bằng lệnh node  <file_path>

class Customer {
    id: number;
    name: string;
    email: string;
    phone: string;

    constructor(id:number, name:string, email:string, phone:string){
        this.id=id;
        this.name=name;
        this.email=email;
        this.phone=phone;
    }

    displayInfo (){
        console.log(`Xin chào ${this.name} với các thông tin: id = ${this.id}, email = ${this.email}, phone= ${this.phone} `);
    }

    updateEmail(newEmail:string){
        this.email=newEmail;
    }
}

const customer1= new Customer (1,"Tuyền","tuyen@gmail.com","012345678");
customer1.displayInfo();
customer1.updateEmail("tuyen123@gmail.com");
console.log(`email mới là ${customer1.email}`);