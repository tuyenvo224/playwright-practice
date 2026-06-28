// //  npx tsx <ten_file>
// // npx ts-node <ten_file>
// // npx tsc <ten_file>

// interface Item {
//     name: string;
//     price: number;
//     amount: number;
//     discount: number;
// }

// class Order {
//     orderID: number;
//     customerName: string;
//     items: Item[];
//     totalAmount: number;

//     constructor (orderID:number, customerName: string){
//         this.orderID=orderID;
//         this.customerName=customerName;
//         this.items=[];
//         this.totalAmount=0;
//     }

//     addItems (item: Item): void{
//         this.items.push(item);
//     }
   
//     calculateTotal(){
//         let total=0;
//          this.items.forEach(function(item){
//              let tt = item.price*item.amount-item.discount;
//              total=total+tt;
             
//             });
//             this.totalAmount=total;
//     }
// }
// const orderID1 = new Order (1,"Tuyen");
// const item1:Item={name:"sản phẩm 1", price: 10_000, amount: 2, discount: 5000};
// orderID1.addItems(item1);
// const item2:Item={name:"sản phẩm 2", price: 30_000, amount: 5, discount: 15000};
// orderID1.addItems(item2);
// console.log(orderID1.items);

// console.log(orderID1.totalAmount);

// orderID1.calculateTotal();
// console.log(orderID1.totalAmount); // add tất cả sản phẩm vào mảng, sau đó mới call hàm calculateTotal để tính tổng tiền đơn hàng và in ra

// ///////////////////////////////////////////////////////////////////////////////

// Option 2:

interface Item {
    name: string;
    price: number;
    amount: number;
    discount: number;
}

class Order {
    orderID: number;
    customerName: string;
    items: Item[];
    totalAmount: number;

    constructor (orderID:number, customerName: string){
        this.orderID=orderID;
        this.customerName=customerName;
        this.items=[];
        this.totalAmount=0;
    }

    addItems (item: Item): void{
        this.items.push(item);
        this.calculateTotal(); // tự cập nhật tổng tiền mỗi lần add sản phẩm vào mảng
    }
   
    calculateTotal(){
        let total=0;
         this.items.forEach((item)=>{
             let tt = item.price*item.amount-item.discount;
             total+=tt;
             
            });
            this.totalAmount=total; 
    }
}
const orderID1 = new Order (1,"Tuyen");
const item1:Item={name:"sản phẩm 1", price: 10_000, amount: 2, discount: 5000};
orderID1.addItems(item1);
console.log("Đơn hàng gồm các sản phẩm: \n", orderID1.items);
console.log(`Tổng tiền đơn hàng là ${orderID1.totalAmount} \n`);

const item2:Item={name:"sản phẩm 2", price: 30_000, amount: 5, discount: 15000};
orderID1.addItems(item2);
console.log("Đơn hàng gồm các sản phẩm: \n", orderID1.items);
console.log(`Tổng tiền đơn hàng là ${orderID1.totalAmount} \n`);

const item3:Item={name:"sản phẩm 3", price: 50_000, amount: 10, discount: 20000};
orderID1.addItems(item3);
console.log("Đơn hàng gồm các sản phẩm: \n", orderID1.items);
console.log(`Tổng tiền đơn hàng là ${orderID1.totalAmount} \n`);
