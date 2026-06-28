console.log("Toi la Tuyen");
console.log('Toi 35 tuoi');

let myName = "Tuyenkute";
let queQuan = "Ho Chi Minh";
console.log(`Ten toi la ${myName}, toi den tu ${queQuan}`);
console.log('Ten toi la '+myName+', toi den tu '+queQuan);

const myInfo ={
    "name": 'Tuyen',
    favoriteNumber: 22,
    address: "Ho Chi Minh",
    "my address 2": "Hue",
    myAdressThree: "Quan 12",
    'myAdressFour': "Trung My Tay",
    'my address 5': "khu pho 1",
    isLoveCoding: true,
    codingClass:{
        name: "Playwright",
        level: "Beginer to Junior"
    }
};

console.log(myInfo);
console.log(myInfo.name);
console.log(myInfo.codingClass.name);
console.log(myInfo["name"]);
console.log(myInfo["codingClass"]["name"]);
console.log(myInfo["codingClass"]["level"]);
console.log(myInfo["codingClass"]);
console.log(myInfo["my address 2"]);