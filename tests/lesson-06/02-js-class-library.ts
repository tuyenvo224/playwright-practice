//  npx tsx <ten_file>
// npx ts-node <ten_file>
// npx tsc <ten_file>

interface Book {
    title: string;
    author: string;
    year: number;
}

class Library {
    name:string;
    location:string;
    books: Book[];

    constructor(name:string, location:string){
        this.name=name;
        this.location=location;
        this.books=[];
    };

    addBook(book:Book): void {
        this.books.push(book);
    };

    findBook(title:string): void {
        const book =this.books.filter(book=> book.title===title) 
        console.log('Sách cần tìm theo tiêu đề chính xác:', book) ;
        
        const book2 =this.books.find(book=> book.title===title) // dùng .filter() trả về mảng, nhưng vì tìm theo tiêu đề (thường là duy nhất) thì dùng .find() sẽ hợp lý hơn — trả về 1 object thay vì mảng
        console.log('Sách cần tìm theo tiêu đề chính xác:', book2) ;
    }

    findSimilar(title:string): void{
        const book3 =this.books.filter(book=> book.title.toLowerCase().includes(title.toLowerCase())); // tìm kiếm các sách có tiêu đề gần giống nhau, chứ keywword nào đó
        console.log('Sách cần tìm có tiêu đề gần giống:', book3) ;
    }
};

const library1 = new Library ("Thư viện Đại học quốc gia TPHCM","Hồ Chí Minh")
const book1:Book={title:"Mắt biếc 1", author:"Nguyễn Nhật Ánh", year: 1990};
library1.addBook(book1);

const book2:Book={title:"Đất rừng Phương Nam", author:"Đoàn Giỏi", year: 1957};
library1.addBook(book2);

const book3:Book={title:"Chí Phèo", author:"Nam Cao", year: 1941};
library1.addBook(book3);

const book4:Book={title:"mắt biếc 2", author:"Nguyễn Nhật Ánh", year: 1990};
library1.addBook(book4);

console.log("Danh sách các sách của thư viện gồm: \n",library1.books);

library1.findBook("mắt biếc 2");
library1.findSimilar("Mắt");