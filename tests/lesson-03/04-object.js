// Bài 1
const car ={
    make: "Toyota",
    model: "Corolla",
    year: 2021 
};
console.log(car.year);

//Bài 2
const person ={
    name:"Tuyen",
    address: {
        street: "Quoc Lo 1A",
        city: "Ho Chi Minh",
        country: "Viet Nam"
    }
};
console.log(person.address.street);

// Bài 3
const student ={
    name: "",
    grades: {
        math: 10,
        english: 9
    }
};
student["grades"]["math"];
console.log(student["grades"]["math"]);

// Bài 4
const settings ={
    volume: 0.5,
    brightness: 80
};
settings.volume=0.75;
console.log(settings);

// Bài 5
let bike ={};
bike.color="white";
console.log(bike);

// Bài 6
const employee ={
    name: 'Tuyen',
    age: 18
};
delete employee.age;
console.log(employee);

// Bài 7
const school ={
    classA: ["An","Bình","Châu"],
    classB: ["Đào","Hương","Giang"]
}
console.log(school);