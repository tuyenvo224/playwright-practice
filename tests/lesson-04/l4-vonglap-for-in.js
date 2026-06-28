// Vòng lặp nâng cao

// const person ={
//     name:'Tuyen',
//     age:35,
//     city:'HCM',
//     oldAddress:{city:'Bình Dương', ward: 10}
// };

// for (const key in person){
//     console.log(key);
// }

// /////////////////////////

const person ={
    name:'Tuyen',
    age:35,
    city:'HCM',
    oldAddress:{city:'Bình Dương', ward: 10}
};

for (const key in person.oldAddress){
    console.log(key);
}


// ////////////////////////////////

// const person ={
//     name:'Tuyen',
//     age:35,
//     city:'HCM',
//     oldAddress:{city:'Bình Dương', ward: 10}
// };

// for (const key in person){
//     console.log(key+':'+person[key]);
// }

// ///////////////////////////////////

// const color =['red','orange','yellow']; // array ko khuyến khích dùng vòng lặp for in
// for (let key in color){ console.log(key+':'+color[key])};