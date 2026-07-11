import { expect, test } from '@playwright/test';
import { TodoPage } from './pom/01-pom';

test('Add todo list', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await test.step('Navigate Material website', async () => {
        await todoPage.openMaterialPage();
    });

    await test.step('Click Bai hoc 3', async () => {
        await todoPage.gotoPage('Bài 3')
    });

    // add 100 todo - truyền vào n=100
    await test.step('Add new tasks', async () => {
        await todoPage.fillTodo(100);
    });

    // Gọi hàm delete todo lẻ theo index - truyền vào n-1=100-1=99
    // await test.step('Delete odd tasks - index', async () => {
    //     await todoPage.deleteTask(99);
    // });

    // Gọi hàm delete todo lẻ theo tên task - truyền vào n=100
    await test.step('Delete odd tasks - task name', async () => {
        await todoPage.deleteOddTasks(100);
    });

    await test.step('Verify Todo 90 is in viewport', async () => {
        const todo90 = todoPage.getTodoItemLocator('Todo 90');
        // Cuộn trang tới phần tử này trước khi kiểm tra
        await todo90.scrollIntoViewIfNeeded();
        await expect(todo90).toBeInViewport();
    });

    await test.step('Verify Todo 21 is removed from DOM', async () => {
        const todo21 = todoPage.getTodoItemLocator('Todo 21');
        await expect(todo21).toHaveCount(0);
    });

    /* Giải thích chi tiết từng phần của đoạn code này: test.step('Verify Todo 90 is in viewport'

await test.step('Verify Todo 8 is in viewport', async () => {
test.step(...) nhóm bước kiểm tra này lại thành 1 mục riêng có tên 'Verify Todo 8 is in viewport', giúp dễ theo dõi trong report/UI mode và dễ biết ngay lỗi rơi vào đúng bước này nếu test fail.
Callback async () => {...} chứa logic của bước, await phía trước đảm bảo Playwright chờ toàn bộ nội dung bên trong (bao gồm await lồng bên trong) chạy xong mới coi bước này hoàn tất.

        const todo8 = todoPage.getTodoItemLocator('Todo 8');
Gọi method đã giải thích ở câu trước, truyền vào chuỗi 'Todo 8' — hàm này sẽ ráp ra xpath //li[span[text()='Todo 8']] và trả về 1 Locator trỏ tới đúng thẻ <li> chứa task có nội dung "Todo 8".
Không có await ở dòng này — vì như đã giải thích, getTodoItemLocator() không phải hàm async, nó chỉ tạo ra "công thức tìm kiếm" (Locator object), chưa thực sự truy vấn DOM ngay lúc này. todo8 lúc này chỉ là 1 tham chiếu tượng trưng, chưa "biết" phần tử thật có tồn tại/nằm ở đâu.

        await expect(todo8).toBeInViewport();
Đây là dòng thực hiện assertion, cần hiểu 2 phần:

expect(todo8): đây là cách gọi web-first assertion của Playwright — khác với expect() thông thường trong các thư viện test khác (như Jest cho unit test), khi bạn truyền vào 1 Locator (chứ không phải 1 giá trị đã có sẵn như string/number), Playwright hiểu đây là 1 kiểu kiểm tra đặc biệt liên quan tới trạng thái của phần tử trên trang.

.toBeInViewport(): đây là 1 matcher có sẵn của Playwright, chuyên dùng để kiểm tra xem phần tử mà locator trỏ tới có đang nằm trong vùng nhìn thấy được của trình duyệt (viewport) hay không — tức là phần đó của trang đang thực sự xuất hiện trên "khung hình" mà người dùng nhìn thấy, không bị cuộn ra ngoài màn hình (kể cả lên trên/xuống dưới hoặc sang trái/phải).

Về mặt kỹ thuật, matcher này tự động lấy boundingBox() (vị trí + kích thước) của phần tử, so sánh với kích thước viewport hiện tại của trang, và kiểm tra xem có phần giao nhau (overlap) hay không — mặc định chỉ cần phần tử giao nhau 1 phần với viewport là coi như đạt (không yêu cầu 100% phần tử phải hiện đầy đủ trên màn hình). Nếu muốn yêu cầu tỷ lệ hiển thị cao hơn, Playwright cho phép truyền thêm tùy chọn ratio (ví dụ toBeInViewport({ ratio: 0.5 }) để yêu cầu ít nhất 50% diện tích phần tử phải nằm trong viewport), nhưng ở đây bạn dùng mặc định (không truyền ratio) nên chỉ cần có giao nhau là đủ.
await phía trước expect(...): đây là điểm rất quan trọng cần hiểu — khác hẳn với expect() của Jest thông thường (không cần await), các web-first assertion của Playwright (như toBeInViewport(), toBeVisible(), toHaveText()...) đều trả về 1 Promise, và có cơ chế auto-waiting/auto-retrying bên trong: Playwright sẽ tự động kiểm tra đi kiểm tra lại điều kiện này trong một khoảng thời gian timeout nhất định (mặc định vài giây), cho tới khi điều kiện đúng (pass) hoặc hết thời gian chờ thì mới báo fail. Nhờ await, code của bạn sẽ dừng lại chờ quá trình kiểm tra tự động này hoàn tất (pass hoặc fail hẳn) rồi mới chạy tiếp — nếu quên await, assertion sẽ chạy "ngầm" không đồng bộ với phần code còn lại, dẫn tới test có thể kết thúc trước khi assertion thực sự kiểm tra xong, gây ra kết quả test sai lệch (test có thể báo pass giả dù thực chất assertion chưa kịp chạy hoặc đang fail).

Vì sao cách viết này phù hợp với ngữ cảnh của bài:

Nhớ lại: sau khi xóa các todo số lẻ, danh sách chỉ còn 5 item ("Todo 2", "Todo 4", "Todo 6", "Todo 8", "Todo 10"). "Todo 8" là item thứ 4 trong danh sách còn lại (sau khi xóa) — với viewport mặc định khá lớn của Playwright (thường 1280x720), khả năng cao item này vẫn đang hiển thị trong màn hình mà không cần cuộn trang. Assertion này giúp xác nhận chắc chắn bằng công cụ đo đạc thật sự (thay vì chỉ giả định), rằng dòng "Todo 8" đang thực sự nằm trong vùng nhìn thấy của trình duyệt tại thời điểm kiểm tra.

Tóm lại luồng chạy: lấy locator trỏ đúng tới dòng chứa "Todo 8" → dùng assertion toBeInViewport() để Playwright tự động kiểm tra (có chờ và retry nếu cần) xem phần tử đó có đang nằm trong vùng hiển thị của trình duyệt hay không → nếu đúng thì bước test pass, nếu phần tử bị cuộn ra ngoài màn hình (hoặc không tồn tại) thì bước test fail với thông báo lỗi rõ ràng.

    */

    /* Giải thích: todo90.scrollIntoViewIfNeeded()
todo90.scrollIntoViewIfNeeded() là action có sẵn của Playwright, gọi trực tiếp trên 1 Locator — nó tự động cuộn trang (nếu cần) sao cho phần tử đó nằm trong vùng nhìn thấy. Chữ "IfNeeded" nghĩa là: nếu phần tử đã nằm trong viewport rồi thì nó không làm gì cả (không cuộn thừa); chỉ cuộn khi phần tử đang nằm ngoài màn hình.
Đây cũng là 1 thao tác bất đồng bộ nên cần await — chờ trình duyệt cuộn xong hẳn rồi mới chạy tiếp.
Sau khi cuộn xong, gọi expect(todo90).toBeInViewport() như cũ — lúc này phần tử đã thực sự nằm trong khung nhìn, viewport ratio sẽ > 0 và assertion sẽ pass.

    */

    /* Giải thích chi tiết từng phần của đoạn code này: test.step('Verify Todo 5 is removed from DOM'

await test.step('Verify Todo 5 is removed from DOM', async () => {
test.step(...) nhóm bước kiểm tra này thành 1 mục riêng tên 'Verify Todo 5 is removed from DOM' — giúp dễ theo dõi trong report và biết ngay lỗi rơi vào đúng bước này nếu fail.
Callback async () => {...} chứa logic bên trong, await phía trước đảm bảo chờ toàn bộ nội dung (kể cả await lồng bên trong) chạy xong.

        const todo5 = todoPage.getTodoItemLocator('Todo 5');
Gọi lại method đã giải thích trước đó, truyền vào 'Todo 5' — hàm này ráp ra xpath //li[span[text()='Todo 5']] và trả về 1 Locator "trỏ tới" <li> chứa nội dung "Todo 5".
Điểm cần lưu ý: gọi .locator() (nằm bên trong getTodoItemLocator) không báo lỗi gì cả dù phần tử thực tế có tồn tại hay không — vì đây chỉ là bước tạo "công thức tìm kiếm", chưa thực sự đi kiểm tra DOM. Việc phần tử có tồn tại hay không chỉ được xác định khi bạn gọi 1 action/assertion cụ thể lên locator này (ở dòng tiếp theo).
Nhớ lại bối cảnh: "Todo 5" là số lẻ, đã bị xóa hẳn ở bước deleteTask(9) trước đó (hoặc deleteTask(99) nếu bạn đang test với 100 todo) — nên về mặt logic, phần tử tương ứng với "Todo 5" không còn tồn tại trong DOM nữa.

        await expect(todo5).toHaveCount(0);
Đây là dòng thực hiện assertion chính, cần hiểu kỹ:

expect(todo5): tương tự các web-first assertion khác đã giải thích — truyền vào 1 Locator để Playwright thực hiện kiểm tra đặc biệt liên quan tới trạng thái của phần tử/nhóm phần tử trên trang.

.toHaveCount(0): đây là matcher dùng để kiểm tra số lượng phần tử mà locator khớp được có đúng bằng con số cho trước hay không. Ở đây yêu cầu số lượng phải là 0 — nghĩa là locator này không khớp được với bất kỳ phần tử nào cả trong toàn bộ trang.

Đây chính là điểm khác biệt quan trọng so với các matcher khác như .toBeVisible() hay .toBeInViewport() — những matcher đó yêu cầu locator phải khớp đúng với 1 phần tử tồn tại để kiểm tra trạng thái hiển thị/vị trí của nó. Nếu bạn dùng .not.toBeVisible() cho 1 phần tử hoàn toàn không tồn tại trong DOM, kết quả vẫn có thể pass — vì "không tồn tại" cũng được coi là "không visible" theo 1 số ngữ nghĩa, dễ gây hiểu lầm rằng phần tử "bị ẩn bằng CSS" (vẫn còn trong DOM, chỉ là display:none) cũng cho cùng 1 kết quả assertion như trường hợp "bị xóa hẳn khỏi DOM" — 2 tình huống về bản chất khác nhau nhưng dễ lẫn lộn nếu dùng sai matcher.
.toHaveCount(0) giải quyết đúng vấn đề này: nó đếm số phần tử khớp được, không quan tâm tới trạng thái hiển thị. Nếu phần tử bị ẩn bằng CSS (display: none) nhưng vẫn còn tồn tại trong cây DOM, .toHaveCount(0) sẽ vẫn đếm được 1 (vì phần tử đó vẫn "có mặt" trong DOM, chỉ là không hiển thị) → assertion .toHaveCount(0) sẽ fail trong trường hợp đó, đúng như mong muốn phân biệt rõ "ẩn bằng CSS" và "xóa khỏi DOM".
Ngược lại, nếu phần tử thực sự bị xóa khỏi DOM (như trường hợp "Todo 5" bị xóa qua tasks.splice() rồi re-render lại danh sách không còn nó), locator sẽ khớp được 0 phần tử, và .toHaveCount(0) sẽ pass — chính xác phản ánh đúng yêu cầu đề bài "kiểm tra không nằm trong DOM".
await phía trước: giống các web-first assertion khác, .toHaveCount() cũng có cơ chế auto-waiting/retry — Playwright sẽ kiểm tra lại nhiều lần trong khoảng thời gian timeout (mặc định vài giây), phòng trường hợp DOM đang trong quá trình cập nhật (ví dụ do animation, hoặc do JavaScript xử lý bất đồng bộ chưa kịp render xong) — chờ tới khi số lượng đúng bằng 0 (pass) hoặc hết timeout thì mới báo fail. Nhờ có await, code sẽ dừng lại chờ toàn bộ quá trình kiểm tra này hoàn tất trước khi chạy tiếp.

Vì sao đây là cách đúng cho câu d, thay vì các cách khác như .toBeVisible():

Yêu cầu đề bài là "kiểm tra Todo 5 bị ẩn (không nằm trong DOM)" — nhấn mạnh rõ ràng "không nằm trong DOM", chứ không phải "không hiển thị trên UI". Vì vậy .toHaveCount(0) (đếm số phần tử tồn tại trong DOM) là lựa chọn chính xác nhất về mặt ngữ nghĩa, thay vì .toBeVisible()/.toBeHidden() (vốn tập trung kiểm tra trạng thái hiển thị trực quan, có thể cho kết quả giống nhau ở nhiều trường hợp nhưng bản chất kiểm tra khác điều bạn thực sự muốn xác nhận).

Tóm lại luồng chạy: lấy locator trỏ theo nội dung "Todo 5" → dùng assertion .toHaveCount(0) để Playwright tự động kiểm tra (có chờ và thử lại nếu cần) xem có bao nhiêu phần tử trong DOM hiện tại khớp với "Todo 5" hay không → nếu đúng là 0 (đã bị xóa hẳn khỏi DOM sau bước xóa các todo số lẻ), assertion pass; nếu vẫn còn tồn tại (dù ẩn hay hiện), assertion sẽ fail vì count sẽ là 1 chứ không phải 0.

    */
});