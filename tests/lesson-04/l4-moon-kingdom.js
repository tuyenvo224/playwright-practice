// Bài 1

const characters = [
    {name: 'Rian', level: 3, health: 500},
    {name: 'Clover', level: 7, health: 1200},
    {name: 'Suka', level: 6, health: 1000},
    {name: 'Lynda', level: 5, health: 900},
    {name: 'Luna', level: 9, health: 1500},
];

function createCharacters (c,h){
const charactersPowerUp = c.map(c1 =>
    ({nameUp: c1.name.toUpperCase(), 
      leveUp: c1.level * 2,
      healthUp: c1.health * 3
    }));
    console.log(charactersPowerUp);

 const posibleWinners = c.filter(c1 => c1.health>h) ;
 console.log(posibleWinners);
};

createCharacters(characters,1000);

// Bài 2 

const players =[
    {name: 'Rian', score: 500},
    {name: 'Clover', score:900},
    {name: 'Suka', score: 200},
    {name: 'Lynda', score: 700},
    {name: 'Luna', score: 2000},
    {name: 'Lucy', score: 1500}
];

function printLeaderboard (p){
  p.sort((a,b)=>b.score-a.score);
  const hcList = ["🥇", "🥈", "🥉"];
  
  const result= p.map((player,index)=>
    { 
      let hc;
        if (hcList[index]){hc=hcList[index];} 
        else {hc=' ';}
       /* Lệnh này kiểm tra xem phần tử tại vị trí index trong mảng hcList có tồn tại (và có giá trị hợp lệ) không
                Nếu hcList[index] là truthy (tồn tại, không phải undefined/null/''/0/false) → gán giá trị đó vào hc
                Nếu không (phần tử không tồn tại hoặc falsy) → gán hc = ' ' (ký tự space)
        */
    // const hc = hcList[index] || " "; // Lệnh này có ý nghĩa giống như trên, nhưng được viết rút gọn hơn
      return `${hc} ${index + 1}. ${player.name} - ${player.score.toLocaleString()} pts`;
      // toLocaleString() là method chuyển đổi số thành chuỗi có định dạng dễ đọc theo ngôn ngữ địa phương — cụ thể là thêm dấu phân cách hàng nghìn.

    })

return result;

};

console.log(printLeaderboard(players));