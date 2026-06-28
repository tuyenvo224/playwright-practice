//  npx tsx <ten_file>
// npx ts-node <ten_file>
// npx tsc <ten_file>

interface Player{
    name: string;
    position: string;
    jerseyNumber: number;
}

class Team {
    name:string;
    players:Player[];

    constructor(name:string){
        this.name=name;
        this.players=[];
    };

    addPlayer(player:Player): void {
        this.players.push(player);
    };

    listPlayers(){
        console.log('Các cầu thủ trong đội gồm:')
        this.players.forEach((player)=>{
            console.log(` ${player.name}, ở vị trí ${player.position}, mang số áo ${player.jerseyNumber}`);
        })
    }

};
const team =new Team("Arsenal");
const player1:Player={name:"Andy", position:"tiền vệ", jerseyNumber:22};
team.addPlayer(player1);

const player2:Player={name:"John", position:"hậu vệ", jerseyNumber:9};
team.addPlayer(player2);

const player3:Player={name:"Henry", position:"thủ môn", jerseyNumber:7};
team.addPlayer(player3);

console.log('Đội bóng gồm các cầu thủ: \n',team.players); 

team.listPlayers();