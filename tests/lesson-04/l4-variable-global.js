var globalVar = "Tôi là biến toàn cục";
let globalLet = "Tôi cũng là biến toàn cục";

function testFunction() {
    console.log(globalVar); // Truy cập được
    console.log(globalLet); // Truy cập được
}

testFunction();