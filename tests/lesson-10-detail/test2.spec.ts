import { expect, test } from '@playwright/test';
import { ProductPage } from './pom/01-pom';

test('Add products', async ({ page }) => {
    const productPage = new ProductPage(page);

    const expectedQuantities: Record<string, number> = {
        'Product 1': 2,
        'Product 2': 3,
        'Product 3': 1,
    }

    await test.step('Navigate Material website', async () => {
        await productPage.openMaterialPage();
    });

    await test.step('Click Bai hoc 2', async () => {
        await productPage.gotoPage('Bài 2');
    });

    await test.step('Add 2 product1', async () => {
        await productPage.addProduct1(2);
    });

    await test.step('Add 3 product2', async () => {
        await productPage.addProduct2(3);
    });

    await test.step('', async () => {
        await productPage.addProduct3(1);
    });

    await test.step('Verify cart quantities', async () => {
        const cartItems = await productPage.getCartItems();

        expect(cartItems.length).toBe(3);

        for (const item of cartItems) {
            expect(item.quantity).toBe(expectedQuantities[item.name]);
        }
    });

    await test.step('Verify total price', async () => {
        const cartItems = await productPage.getCartItems();
        // console.log(cartItems);

        // Kiểm tra chéo: Total của từng dòng phải bằng Price x Quantity
        for (const item of cartItems) {
            expect(item.total).toBeCloseTo(item.price * item.quantity, 2);
        }

        // Tính tổng tất cả các dòng rồi so sánh với Total Price hiển thị cuối bảng
        const expectedTotal = cartItems.reduce((sum, item) => sum + item.total, 0);
        const actualTotal = await productPage.getCartTotalPrice();

        expect(actualTotal).toBeCloseTo(expectedTotal, 2);
    });

    /* Giải thích chi tiết từng phần của dòng khai báo này: expectedQuantities: Record<string, number>

const expectedQuantities: Record<string, number> = {
const — khai báo 1 hằng số (biến không thể gán lại giá trị mới sau khi khởi tạo). Lưu ý: const chỉ ngăn gán lại toàn bộ biến (expectedQuantities = {...} khác sẽ báo lỗi), nhưng vẫn cho phép sửa đổi nội dung bên trong object (ví dụ expectedQuantities['Product 4'] = 5 vẫn hợp lệ) — vì const chỉ khóa tham chiếu (reference), không khóa nội dung object.

expectedQuantities — tên biến, đặt theo nghĩa "số lượng mong đợi (kỳ vọng)" cho từng sản phẩm — đây là dữ liệu "chuẩn" dùng để đối chiếu với dữ liệu thực tế đọc được từ giỏ hàng.

: Record<string, number> — đây là phần khai báo kiểu dữ liệu bằng TypeScript utility type tên là Record. Cú pháp tổng quát: Record<K, V> tạo ra 1 kiểu object mà:

Tất cả các key (khóa) đều có kiểu K (ở đây là string).
Tất cả các value (giá trị) đều có kiểu V (ở đây là number).
Nói cách khác, Record<string, number> mô tả 1 object dạng "từ điển" (dictionary/map), key là chuỗi bất kỳ, value luôn là số. Ví dụ hợp lệ: { a: 1, b: 2 }, { "Product 1": 2 }... nhưng { a: "text" } sẽ báo lỗi vì value phải là number.
Đây là cách viết gọn hơn so với việc tự định nghĩa 1 interface riêng, ví dụ:

interface ExpectedQuantities {
    [key: string]: number;
}
Record<string, number> tương đương hoàn toàn với cách viết interface có "index signature" ở trên, nhưng ngắn gọn hơn nhiều — TypeScript cung cấp sẵn Record chính là để thay thế cho các trường hợp object dạng key-value đơn giản như thế này.

        'Product 1': 2,
        'Product 2': 3,
        'Product 3': 1,
    };
Đây là phần giá trị thực tế được gán cho biến — 1 object literal với 3 cặp key-value:
Key 'Product 1' (chuỗi, đặt trong dấu nháy đơn vì tên có khoảng trắng nên không thể viết dạng Product 1: 2 — JavaScript/TypeScript yêu cầu key có khoảng trắng hoặc ký tự đặc biệt phải được bao trong dấu nháy).
Value tương ứng là số lượng bạn mong đợi sản phẩm đó sẽ có trong giỏ hàng, khớp đúng với số lần bạn gọi addProduct1(2), addProduct2(3), addProduct3(1) ở phần câu a.
Dấu phẩy sau 1 (dòng cuối, 'Product 3': 1,) là trailing comma — dấu phẩy thừa sau phần tử cuối cùng. Đây hoàn toàn hợp lệ trong JavaScript/TypeScript hiện đại (không gây lỗi), và là 1 thói quen tốt vì giúp khi thêm/xóa dòng sau này (ví dụ thêm 'Product 4': 5) chỉ cần thêm 1 dòng mới mà không phải sửa dấu phẩy ở dòng phía trên.
Tại sao chọn cách này thay vì cách khác:

Có thể bạn thắc mắc tại sao không dùng 1 mảng số đơn giản như const expectedQuantities = [2, 3, 1] rồi so sánh theo index. Lý do object dạng Record<string, number> với key là tên sản phẩm được ưu tiên hơn:

Ở bước dùng sau đó (expect(item.quantity).toBe(expectedQuantities[item.name])), bạn tra cứu số lượng mong đợi bằng chính tên sản phẩm đọc được từ giỏ hàng (item.name), chứ không phụ thuộc vào thứ tự dòng xuất hiện trong bảng giỏ hàng.
Điều này quan trọng vì như đã lưu ý ở phần gợi ý trước: thứ tự dòng trong giỏ hàng phụ thuộc vào thứ tự sản phẩm được thêm lần đầu tiên, không hẳn lúc nào cũng đúng thứ tự bạn viết code test. Dùng object tra cứu theo tên giúp so sánh đúng sản phẩm với đúng số lượng mong đợi, bất kể dòng đó nằm ở vị trí nào trong bảng — an toàn và rõ ràng hơn nhiều so với so sánh cứng theo index của mảng.
Cách sử dụng ở bước sau (để bạn hình dung rõ hơn mục đích của biến này):


expectedQuantities[item.name]
Đây là cú pháp truy cập giá trị của object bằng key động (bracket notation) — item.name là 1 biến chuỗi (ví dụ "Product 1"), và expectedQuantities["Product 1"] sẽ trả về 2. Nhờ khai báo kiểu Record<string, number>, TypeScript biết chắc chắn kết quả truy cập này luôn có kiểu number, không bị báo lỗi kiểu dữ liệu (khác với object thông thường không khai báo kiểu, TypeScript có thể không chắc chắn key đó có tồn tại hay không).

    */

    /* Giải thích chi tiết từng phần của đoạn code này: test.step('Verify cart quantities' 
    
    await test.step('Verify cart quantities', async () => {
    test.step(...) nhóm các bước kiểm tra bên trong lại thành 1 mục có tên riêng ('Verify cart quantities'), giúp khi xem report/UI mode của Playwright dễ nhận biết bước này đang làm gì, và nếu có lỗi thì biết ngay lỗi rơi vào bước "kiểm tra số lượng giỏ hàng" chứ không lẫn với các bước khác.
    Tham số thứ 2 là callback async () => {...} chứa toàn bộ logic của bước, await phía trước đảm bảo chờ toàn bộ nội dung bên trong (kể cả các await lồng bên trong) chạy xong mới coi bước này hoàn tất.
    
        const cartItems = await productPage.getCartItems();
    Gọi method đã giải thích ở câu trước, lấy về 1 mảng object — mỗi object đại diện cho 1 dòng sản phẩm đang có trong giỏ hàng, gồm name, price, quantity, total (đã được parse đúng kiểu dữ liệu, không còn ký hiệu $ hay khoảng trắng thừa).
    await vì getCartItems() là hàm async, trả về Promise — cần chờ nó đọc xong dữ liệu thật từ trang rồi mới lấy được mảng cartItems để dùng tiếp.
    
        expect(cartItems.length).toBe(3);
    Đây là bước kiểm tra số lượng dòng trong giỏ hàng — .length là property có sẵn của mảng trong JavaScript, cho biết mảng đó có bao nhiêu phần tử.
    .toBe(3) là matcher kiểm tra bằng chính xác (strict equality) — khẳng định cartItems.length phải đúng bằng 3.
    Lý do cần bước này: nhớ lại cơ chế giỏ hàng — mỗi sản phẩm chỉ tạo 1 dòng duy nhất dù bạn click "Add to Cart" nhiều lần (chỉ tăng quantity, không tạo dòng mới). Vì bạn add 3 sản phẩm khác nhau (Product 1, 2, 3), giỏ hàng phải có đúng 3 dòng. Đây cũng chính là cách xử lý "edge case" đã lưu ý ở phần gợi ý trước đó (bài Personal Notes) — đảm bảo vòng lặp bên dưới thực sự chạy qua đủ dữ liệu cần kiểm tra, tránh trường hợp giỏ hàng trống hoặc thiếu dòng mà vòng lặp for vẫn "chạy qua" và test vẫn "pass giả" dù không kiểm tra được gì đầy đủ.
    
        for (const item of cartItems) {
    Vòng lặp for...of duyệt qua từng phần tử trong mảng cartItems. Biến item mỗi lần lặp là 1 object đại diện cho đúng 1 dòng sản phẩm (ví dụ lần đầu item có thể là { name: "Product 1", price: 10, quantity: 2, total: 20 }).
    
            expect(item.quantity).toBe(expectedQuantities[item.name]);
    Đây là dòng thực hiện phép so sánh chính, gồm 2 vế:
    
    Vế trái: item.quantity — số lượng thực tế đọc được từ giỏ hàng cho sản phẩm này (ví dụ 2 cho Product 1).
    Vế phải: expectedQuantities[item.name] — tra cứu số lượng mong đợi trong object đã khai báo ở câu hỏi trước, bằng cách dùng chính item.name (tên sản phẩm đọc được từ giỏ hàng, ví dụ "Product 1") làm key để tìm giá trị tương ứng trong expectedQuantities. Ví dụ nếu item.name là "Product 1", thì expectedQuantities["Product 1"] trả về 2.
    .toBe(...) so sánh 2 giá trị này phải bằng chính xác nhau. Nếu số lượng thực tế khác với số lượng mong đợi (ví dụ do bug ở tính năng thêm giỏ hàng, hoặc bạn add sai số lần trong test), dòng này sẽ fail, và Playwright sẽ báo lỗi rõ ràng ngay tại đúng sản phẩm bị sai (vì đang lặp qua từng item riêng lẻ, không gộp chung), giúp bạn dễ debug hơn nhiều so với so sánh gộp cả mảng 1 lần.
    Điểm quan trọng cần hiểu — vì sao cách so sánh này "khớp đúng sản phẩm" dù thứ tự dòng trong bảng có thể không cố định:
    
    Thay vì so sánh theo vị trí cố định (ví dụ giả định dòng đầu tiên luôn là Product 1), đoạn code này tra cứu động theo tên sản phẩm (item.name) mỗi lần lặp. Nghĩa là bất kể cartItems có thứ tự dòng như thế nào (dòng nào đứng trước, dòng nào đứng sau), miễn là tên sản phẩm đọc được đúng, thì số lượng mong đợi tương ứng cũng sẽ được tra cứu đúng theo tên đó — không bị sai lệch do thứ tự bảng.
    
    
            }
        });
    Đóng vòng lặp for, rồi đóng callback của test.step, kết thúc bước "Verify cart quantities".
    Tóm lại luồng chạy: đọc toàn bộ dữ liệu giỏ hàng hiện tại → kiểm tra tổng số dòng phải đúng bằng 3 (đảm bảo đủ dữ liệu để kiểm tra, không bị rỗng) → sau đó lặp qua từng dòng sản phẩm, với mỗi dòng tra cứu số lượng mong đợi tương ứng theo đúng tên sản phẩm đó, rồi so sánh với số lượng thực tế đọc được từ UI — nếu có bất kỳ sản phẩm nào sai số lượng, test sẽ báo lỗi ngay tại đúng sản phẩm đó.
    
    */

    /* Giải thích chi tiết từng phần của đoạn code này: test.step('Verify total price'

await test.step('Verify total price', async () => {
Giống các bước trước, test.step nhóm toàn bộ logic kiểm tra tổng tiền lại thành 1 mục riêng tên 'Verify total price', dễ theo dõi trong report và dễ biết lỗi rơi vào bước nào nếu test fail.

    const cartItems = await productPage.getCartItems();
Gọi lại getCartItems() để lấy dữ liệu giỏ hàng — gọi lại lần nữa dù bước trước (Verify cart quantities) đã gọi 1 lần rồi. Lý do gọi lại thay vì tái sử dụng biến cũ: mỗi test.step nên độc lập, tự lấy dữ liệu cần thiết, không phụ thuộc vào biến được tạo ở step khác — giúp code rõ ràng, dễ đọc riêng từng step mà không cần lo về phạm vi (scope) biến giữa các step, và nếu sau này bạn xóa/đổi thứ tự step thì mỗi step vẫn chạy đúng độc lập.

    // Kiểm tra chéo: Total của từng dòng phải bằng Price x Quantity
    for (const item of cartItems) {
        expect(item.total).toBeCloseTo(item.price * item.quantity, 2);
    }
Đây là bước kiểm tra chéo (cross-check) ở cấp độ từng dòng, trước khi kiểm tra tổng toàn giỏ hàng. Ý tưởng: với mỗi sản phẩm, cột "Total" hiển thị trên UI (item.total) phải luôn khớp đúng với phép tính đơn giá nhân số lượng (item.price * item.quantity) — đây là cách xác nhận công thức tính tiền của trang web đang hoạt động đúng ở mức chi tiết nhất (từng dòng), trước khi tin tưởng dùng item.total để cộng dồn ra tổng tiền ở bước sau.
item.price * item.quantity: phép nhân thông thường trong JavaScript, ví dụ Product 1 có price = 10, quantity = 2 → kết quả 20.
.toBeCloseTo(giá_trị_mong_đợi, 2): đây là 1 matcher đặc biệt của Playwright/Jest dùng để so sánh số thực (floating point) một cách an toàn, thay vì dùng .toBe().
Lý do không dùng .toBe(): số thực trong máy tính (kiểu number/float) có thể gặp sai số làm tròn cực nhỏ do cách máy tính lưu trữ số thập phân nhị phân (ví dụ phép tính 0.1 + 0.2 trong JavaScript thực tế cho ra 0.30000000000000004, không đúng tuyệt đối bằng 0.3). Nếu dùng .toBe(0.3) để so sánh, test có thể fail dù về mặt logic 2 số là "bằng nhau".
.toBeCloseTo(value, precision): kiểm tra giá trị thực tế có gần bằng value trong phạm vi sai số cho phép hay không, dựa vào tham số precision (số chữ số thập phân cần chính xác). Ở đây precision = 2 nghĩa là 2 giá trị chỉ cần khớp nhau tới 2 chữ số thập phân là đạt (phù hợp với đơn vị tiền tệ USD, luôn có 2 số lẻ như $20.00).
Với bài này, các con số đều tròn (không có sai số thực tế phát sinh), nên .toBeCloseTo và .toBe cho kết quả như nhau — nhưng dùng .toBeCloseTo là thói quen đúng đắn khi làm việc với số tiền/số thực, phòng trường hợp sau này có phép tính phức tạp hơn phát sinh sai số nhỏ.

    // Tính tổng tất cả các dòng rồi so sánh với Total Price hiển thị cuối bảng
    const expectedTotal = cartItems.reduce((sum, item) => sum + item.total, 0);
Đây là dòng dùng .reduce() — 1 method rất quan trọng của mảng trong JavaScript, cần hiểu kỹ:

.reduce(callback, giá_trị_khởi_tạo): dùng để "gộp" (reduce) toàn bộ 1 mảng thành 1 giá trị duy nhất, bằng cách chạy qua từng phần tử và tích lũy dần kết quả.
Cú pháp callback: (sum, item) => sum + item.total
sum: là giá trị tích lũy (accumulator) — kết quả cộng dồn được từ các lần lặp trước đó.
item: là phần tử hiện tại trong mảng đang được xét (giống biến item trong vòng lặp for...of ở trên, nhưng đây là cách viết dùng function thay vì viết vòng lặp thủ công).
sum + item.total: mỗi lần lặp, lấy giá trị tích lũy hiện tại cộng thêm total của dòng đang xét, kết quả này sẽ trở thành sum cho lần lặp tiếp theo.
0 (tham số thứ 2 của .reduce()): là giá trị khởi tạo ban đầu của sum, tức là trước khi xét dòng đầu tiên, tổng bắt đầu từ 0.
Diễn giải bằng ví dụ cụ thể với dữ liệu bài này (Product 1: total=20, Product 2: total=60, Product 3: total=30):

Bắt đầu: sum = 0 (giá trị khởi tạo).
Lặp qua Product 1: sum = 0 + 20 = 20.
Lặp qua Product 2: sum = 20 + 60 = 80.
Lặp qua Product 3: sum = 80 + 30 = 110.
Không còn phần tử nào nữa → .reduce() trả về kết quả cuối cùng: 110.
Vậy expectedTotal sẽ là 110 — tổng tiền tự tính toán được từ dữ liệu các dòng trong giỏ hàng, hoàn toàn không phụ thuộc vào con số mà trang web hiển thị ở "Total Price" cuối bảng.

Đây là cách viết hàm thuần (functional style), thay thế cho việc viết vòng lặp thủ công dài dòng hơn như:

let expectedTotal = 0;
for (const item of cartItems) {
    expectedTotal += item.total;
}
Cả 2 cách cho ra kết quả giống hệt nhau — .reduce() chỉ là cách viết gọn hơn, thường gặp khi cần "gộp mảng thành 1 giá trị" (tổng, tích, nối chuỗi...).

    const actualTotal = await productPage.getCartTotalPrice();
Gọi method đã giải thích ở câu hỏi trước, lấy về con số tổng tiền thực tế đang hiển thị trên UI (đọc trực tiếp từ ô <td class="total-price">, không phải tự tính toán).
Đặt tên biến actualTotal (số liệu "thực tế" quan sát được) đối lập rõ ràng với expectedTotal (số liệu "mong đợi" tự tính toán được) — quy ước đặt tên rất thường gặp trong testing, giúp code tự giải thích ý nghĩa mà không cần đọc thêm.

    expect(actualTotal).toBeCloseTo(expectedTotal, 2);
});
Đây là phép so sánh cuối cùng: khẳng định tổng tiền hiển thị thực tế trên UI (actualTotal) phải khớp (trong phạm vi sai số 2 chữ số thập phân) với tổng tiền tự tính toán được từ dữ liệu chi tiết từng dòng (expectedTotal).
Nếu 2 giá trị này khác nhau, có thể là dấu hiệu bug ở logic tính tổng tiền của trang web (ví dụ tính sai, quên cộng 1 sản phẩm nào đó, làm tròn sai...).
Tóm lại luồng chạy của cả method: đầu tiên kiểm tra ở mức chi tiết nhất — từng dòng sản phẩm có đúng công thức Total = Price × Quantity không (kiểm tra chéo cấp độ dòng); sau đó cộng dồn tất cả các dòng lại bằng .reduce() để tính ra tổng tiền "đáng lẽ phải có"; cuối cùng so sánh con số tự tính này với con số thực tế hiển thị ở cuối bảng giỏ hàng — nếu cả 2 phép kiểm tra đều đúng, có thể tin tưởng rằng tính năng tính tiền của giỏ hàng đang hoạt động chính xác từ chi tiết đến tổng thể.

    */
});