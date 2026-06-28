// npx tsx <ten_file>

interface Player {
    name: string;
    position: string;
    jerseyNumber: number;
}
/* 
Interface là một "bản hợp đồng" (contract) định nghĩa hình dạng của một object. 
 Nó nói rằng: "Bất kỳ object nào muốn là kiểu Player thì phải có đúng 3 thuộc tính này với đúng kiểu dữ liệu này."
let player: Player = { name: "John", position: "Forward", jerseyNumber: 10 };
Khai báo biến player với kiểu Player
TypeScript sẽ báo lỗi ngay nếu thiếu field hoặc sai kiểu (ví dụ: jerseyNumber: "ten" → lỗi compile)
*/
class Team1 {
    name: string;        // Tên đội
    players: Player[];   // Mảng các cầu thủ (kiểu Player[])

//  Khai báo thuộc tính — khác với JS thuần, TypeScript yêu cầu khai báo kiểu cho từng property của class.
// Player[] nghĩa là mảng các object kiểu Player.

    constructor(name: string) {
        this.name = name;
        this.players = [];
    }

//Constructor chạy khi tạo object mới (new Team("Arsenal")):
// Nhận name kiểu string làm tham số
// Gán this.name = name — lưu tên đội
// Gán this.players = [] — khởi tạo mảng cầu thủ rỗng

    addPlayer(player: Player): void {
        this.players.push(player);

//Method addPlayer:
//Nhận tham số player kiểu Player (phải đúng interface)
//: void — method không trả về giá trị gì
//Dùng push() để thêm cầu thủ vào mảng players

    }
}
// Tóm tắt mối quan hệ

//Interface Player  →  định nghĩa "hình dạng" của 1 cầu thủ
//Class Team        →  quản lý một đội gồm nhiều Player
//Interface đảm bảo type safety — TypeScript kiểm tra lỗi ngay lúc viết code, không chờ đến runtime.

const teamA = new Team1("Arsenal");

const playerX: Player = { name: "John", position: "Forward", jerseyNumber: 10 };
teamA.addPlayer(playerX);
console.log(teamA.players);
