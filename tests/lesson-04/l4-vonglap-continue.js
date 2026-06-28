for (let i=0; i<10; i++){
    if (i%2===0) {continue;} // bỏ qua số chẵn
    console.log(i);
}

// ///////////////////////////////

const scores = [78,82,56,76,90,86,100,98];
console.log('Điểm>=80');

for (let i=0; i<scores.length; i++){
    let score= scores[i];
    if (score <80){continue;}
    console.log(score);
}

// const scores = [78,82,56,76,90,86,100,98];
// console.log('Điểm>=80');

// for (let i=0; i<scores.length; i++){
//     let score= scores[i];
//     if (score >=80){console.log(score);}
    
// }