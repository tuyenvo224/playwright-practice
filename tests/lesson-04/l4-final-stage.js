
function findPairsDivisibleBy17 (){
        console.log('Các cặp số từ 1 tới 100 có tổng chia hết cho 17:')
        let count=0;
    for (let a=1; a<=100; a++){
    
      for (let b=a; b<=100; b++){  // cho b chạy từ a trở đi để tránh lặp lại cặp số trùng như (1,16) và (16,1) chỉ đếm 1 lần
        
        if ((a+b)%17 ===0){
            count++; // mỗi lần tìm được cặp số hợp lệ thì tăng biến đếm số cặp lên 1
            let sum =a+b;
            console.log(`(${a},${b}) = ${sum}`);
        }
      }   
    }
console.log(`\nTổng cộng: ${count} cặp`);
// \n : Có thêm một dòng trống phía trên, giúp tách biệt output cho dễ đọc hơn.
}
findPairsDivisibleBy17();