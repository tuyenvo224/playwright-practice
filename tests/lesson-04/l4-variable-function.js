function myFunction() {
    var functionScoped = "Chỉ có thể truy cập trong hàm này";
    let alsoFunctionScoped = "Tương tự";

    console.log(functionScoped); // OK
}
myFunction();
 console.log(functionScoped); // Error: functionScoped is not defined
