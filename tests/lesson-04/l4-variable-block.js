if (true) {
    var varVariable = "var không có block scope";
    let letVariable = "let có block scope";
    const constVariable = "const cũng có block scope";
}

console.log(varVariable);   // OK - var không bị giới hạn bởi block
console.log(letVariable);   // Error: letVariable is not defined
console.log(constVariable); // Error: constVariable is not defined